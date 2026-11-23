#!/usr/bin/env node
/**
 * Sync Jawafdehi (api.jawafdehi.org) case data into Jhappad's politicians.json
 *
 * For every person in politicians.json (plus configured additions):
 *   1. Resolve the person in Jawafdehi's entity registry via /api/search/
 *      (name match against entity results; known slugs win when configured)
 *   2. Pull every PUBLISHED case citing that entity (reverse lookup by IRI)
 *   3. Fetch each case's detail; extract this person's role/outcome
 *   4. Merge a `jawafdehi` block into the entry; refresh `lastUpdated` +
 *      `sources`. Manual fields (position, party, estimatedWealth,
 *      corruptionAllegations, children) are NEVER overwritten.
 *   5. People with no resolved entity or no cases keep their entry unchanged
 *      (any stale jawafdehi block is left as-is and reported).
 *
 * Case facts: Jawafdehi Initiative, CC BY-NC 4.0 (attribution in each block).
 * Requests are sequential with a small delay — no bulk scraping.
 *
 * Usage: node scripts/sync-jawafdehi.mjs [--dry-run]
 */
import { readFileSync, writeFileSync } from 'node:fs';

const API = 'https://api.jawafdehi.org';
const UA = { 'User-Agent': 'jhappad-sync/1.0 (contact: jhappad.com)', Accept: 'application/json' };
const DRY = process.argv.includes('--dry-run');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Extra search phrasings per person (registry names vary). Keyed by the
// person's name as it appears in politicians.json.
const SEARCH_QUERIES = {
  "Pushpa Kamal Dahal ('Prachanda')": ['Pushpa Kamal Dahal', 'Prachanda'],
  'Madhav Kumar Nepal': ['Madhav Kumar Nepal', 'Madhav Nepal'],
  'Bam Dev Gautam': ['Bam Dev Gautam', 'Bamdev Gautam'],
  'Mohan Bahadur Basnet': ['Mohan Bahadur Basnet', 'Mohan Basnet'],
};
// People to add when missing from politicians.json (draft entries).
const ADDITIONS = [
  {
    matchName: 'Bishnu Prasad Paudel',
    queries: ['Bishnu Prasad Paudel'],
    draft: { position: 'Former Minister of Finance', party: 'CPN-UML' }, // MANUAL placeholders — verify before publishing
  },
];

async function getJSON(url) {
  const res = await fetch(url, { headers: UA });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res.json();
}

function formatBigo(npr) {
  if (!npr) return null;
  if (npr >= 1e9) return `Rs ${(npr / 1e9).toFixed(npr % 1e9 ? 2 : 0)} arba (Rs ${npr.toLocaleString('en-IN')})`;
  if (npr >= 1e7) return `Rs ${(npr / 1e7).toFixed(npr % 1e7 ? 2 : 0)} crore (Rs ${npr.toLocaleString('en-IN')})`;
  return `Rs ${npr.toLocaleString('en-IN')}`;
}

const norm = (s) => (s ?? '').toLowerCase().replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();

/**
 * Identity key for a name: merge initial runs ("k p" -> "kp"), strip the
 * trailing "a" Nepali romanization adds ("madhava" -> "madhav"), drop spaces.
 * Lets "K.P. Sharma Oli" == "KP Sharma Oli" and catches registry duplicates
 * like "Madhava Kumara Nepala" for Madhav Kumar Nepal, while excluding
 * non-person hits such as "...K P Sharma Oli Administration".
 */
function nameKey(s) {
  const tokens = norm(s).split(' ').filter(Boolean);
  const merged = [];
  for (const t of tokens) {
    if (t.length === 1 && merged.length && merged.at(-1).length <= 2) merged[merged.length - 1] += t;
    else merged.push(t);
  }
  return merged.map((t) => (t.length > 3 && t.endsWith('a') ? t.slice(0, -1) : t)).join('');
}

/** The registry holds duplicate person entities; return ALL that match. */
async function resolveEntities(name, queries) {
  const keys = new Set(queries.map(nameKey));
  const found = new Map();
  for (const q of queries) {
    await sleep(250);
    const s = await getJSON(`${API}/api/search/?q=${encodeURIComponent(q)}&page_size=10&include_facets=false`);
    for (const r of s.results ?? []) {
      if (r.type !== 'entity' || !(r.id ?? '').includes('/entity/person/')) continue;
      const titleKeys = [nameKey(r.title?.en ?? ''), nameKey(r.title?.ne ?? '')];
      // exact key match, or title carries an extra nickname token
      // (e.g. "Pushpa Kamal Dahal 'Prachanda'" for query "Pushpa Kamal Dahal")
      const hit = titleKeys.some((tk) => keys.has(tk) || [...keys].some((k) => k.length > 6 && tk.startsWith(k)));
      if (hit) {
        found.set(r.id, { iri: r.id, title: r.title });
      }
    }
  }
  return [...found.values()];
}

async function buildBlock(iris, entityTitle) {
  const iri = iris[0];
  const slugPath = iri.replace('https://jawafdehi.org/entity/', '');
  const entity = await getJSON(`${API}/api/entities/${slugPath}/`);
  const bySlug = new Map();
  for (const eIri of iris) {
    await sleep(250);
    const list = await getJSON(`${API}/api/cases/?entity=${encodeURIComponent(eIri)}&page_size=50`);
    for (const c of list.results ?? []) if (!bySlug.has(c.slug)) bySlug.set(c.slug, c);
  }
  const cases = [];
  let casePhoto = null;
  for (const c of bySlug.values()) {
    await sleep(250);
    const d = await getJSON(`${API}/api/cases/${c.slug}/`);
    const me = (d.entities ?? []).find((e) => iris.includes(e.nes_id));
    if (!casePhoto && me?.image) casePhoto = me.image;
    const timeline = [...(d.timeline ?? [])].sort((a, b) => (a.date < b.date ? 1 : -1));
    cases.push({
      slug: d.slug,
      title: d.title,
      url: d.public_iri,
      caseType: d.case_type,
      status: d.status,
      bigoNpr: d.bigo ?? null,
      bigoFormatted: formatBigo(d.bigo),
      role: me?.type ?? null,
      outcome: me?.outcome ?? null,
      keyAllegations: d.key_allegations ?? [],
      latestDevelopment: timeline[0] ? { date: timeline[0].date, dateBs: timeline[0].date_bs, title: timeline[0].title } : null,
      courtCases: (d.court_cases ?? []).map((cc) => (typeof cc === 'string' ? cc : cc.courtcase_iri ?? cc.iri ?? null)).filter(Boolean),
      caseUpdatedAt: d.updated_at ?? null,
    });
  }
  return {
    block: {
      entityIri: iri,
      ...(iris.length > 1 ? { duplicateIris: iris.slice(1) } : {}),
      nameEn: entity.name?.en ?? entityTitle?.en ?? null,
      nameNe: entity.name?.ne ?? entityTitle?.ne ?? null,
      photoCredit: entity.image?.creditText ?? null,
      caseCount: cases.length,
      totalBigoNpr: cases.reduce((s, c) => s + (c.bigoNpr ?? 0), 0),
      cases,
      attribution: 'Case data: Jawafdehi Initiative (jawafdehi.org), CC BY-NC 4.0',
      syncedAt: new Date().toISOString(),
    },
    photo: entity.image?.contentUrl ?? casePhoto ?? null,
  };
}

const dataPath = new URL('../public/data/politicians.json', import.meta.url);
const politicians = JSON.parse(readFileSync(dataPath, 'utf8'));

const jobs = politicians.map((p) => ({ matchName: p.name, queries: SEARCH_QUERIES[p.name] ?? [p.name] }));
for (const add of ADDITIONS) {
  if (!politicians.some((p) => p.name === add.matchName)) jobs.push(add);
  else {
    const j = jobs.find((x) => x.matchName === add.matchName);
    if (j) j.queries = add.queries;
  }
}

for (const job of jobs) {
  console.log(`\n=== ${job.matchName}`);
  let resolved = [];
  try {
    resolved = await resolveEntities(job.matchName, job.queries);
  } catch (e) {
    console.log(`  resolution error: ${e.message}`);
  }
  if (!resolved.length) {
    console.log('  entity: NOT RESOLVED — entry left unchanged');
    continue;
  }
  console.log(`  entities (${resolved.length}): ${resolved.map((r) => r.iri).join(', ')}`);
  const { block, photo } = await buildBlock(resolved.map((r) => r.iri), resolved[0].title);
  console.log(`  cases: ${block.caseCount} | total bigo: ${formatBigo(block.totalBigoNpr) ?? '—'}`);

  let entry = politicians.find((p) => p.name === job.matchName);
  const caseDates = block.cases.map((c) => (c.caseUpdatedAt ?? '').slice(0, 10)).filter(Boolean).sort();
  const newest = caseDates.at(-1);
  if (entry) {
    entry.jawafdehi = block;
    if (newest && newest > (entry.lastUpdated ?? '')) entry.lastUpdated = newest;
    const src = new Set(entry.sources ?? []);
    block.cases.forEach((c) => src.add(c.url));
    entry.sources = [...src];
    console.log('  merged into existing entry; manual fields untouched');
  } else if (job.draft) {
    entry = {
      id: `politician-draft-${resolved[0].iri.split('/').at(-1)}`,
      name: job.matchName,
      position: job.draft.position,
      party: job.draft.party,
      ...(photo ? { photo } : {}),
      corruptionAllegations: [],
      children: [],
      lastUpdated: newest ?? null,
      sources: block.cases.map((c) => c.url),
      jawafdehi: block,
      _draft: 'Created by sync-jawafdehi — position/party are manual placeholders, verify before publishing',
    };
    politicians.push(entry);
    console.log('  NEW draft entry created');
  }
}

if (DRY) {
  console.log('\nDry run — no file written.');
} else {
  writeFileSync(dataPath, JSON.stringify(politicians, null, 2) + '\n');
  console.log(`\nWrote politicians.json (${politicians.length} entries).`);
}
