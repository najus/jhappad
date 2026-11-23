#!/usr/bin/env node
/**
 * POC: sync Jawafdehi (api.jawafdehi.org) case data into Jhappad's politicians.json
 *
 * What it does, per configured person:
 *   1. Resolves the person in Jawafdehi's entity registry (NES) by slug
 *   2. Pulls every PUBLISHED case citing that entity (reverse lookup by entity IRI)
 *   3. Fetches each case's detail and extracts this person's role/outcome
 *   4. Merges a `jawafdehi` block into the politician's entry and refreshes
 *      `lastUpdated` + `sources`. Manual fields (position, party, estimatedWealth,
 *      corruptionAllegations, children) are NEVER overwritten.
 *   5. If the person is not yet in politicians.json, creates a draft entry with
 *      the API-sourced fields filled and manual fields flagged for review.
 *
 * Case facts: Jawafdehi Initiative, CC BY-NC 4.0 (attribution in each block).
 * Requests are sequential with a small delay — no bulk scraping.
 *
 * Usage: node scripts/sync-jawafdehi-poc.mjs
 * Output: public/data/politicians.poc.json (the live file is left untouched)
 */
import { readFileSync, writeFileSync } from 'node:fs';

const API = 'https://api.jawafdehi.org';
const UA = { 'User-Agent': 'jhappad-sync-poc/0.1 (contact: jhappad.com)', Accept: 'application/json' };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// POC scope: one existing Jhappad entry + one person who is not on Jhappad yet.
// `draft` fields are used ONLY when creating a new entry; position/party are
// manual data in Jhappad's model (the API does not provide them).
const PEOPLE = [
  { matchName: 'K.P. Sharma Oli', entitySlug: 'kp-sharma-oli' },
  {
    matchName: 'Bishnu Prasad Paudel',
    entitySlug: 'bishnu-prasad-paudel',
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

async function syncPerson(cfg, politicians) {
  const iri = `https://jawafdehi.org/entity/person/${cfg.entitySlug}`;
  console.log(`\n=== ${cfg.matchName} (${iri})`);

  const entity = await getJSON(`${API}/api/entities/person/${cfg.entitySlug}/`);
  await sleep(300);
  const list = await getJSON(`${API}/api/cases/?entity=${encodeURIComponent(iri)}&page_size=50`);
  console.log(`  entity found: ${entity.name?.en} | published cases: ${list.count}`);

  const cases = [];
  let casePhoto = null; // entity-registry record may lack a photo; case payloads often carry one
  for (const c of list.results ?? []) {
    await sleep(300);
    const d = await getJSON(`${API}/api/cases/${c.slug}/`);
    const me = (d.entities ?? []).find((e) => e.nes_id === iri);
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
      role: me?.type ?? null, // accused | related | ...
      outcome: me?.outcome ?? null, // charged | ...
      keyAllegations: d.key_allegations ?? [],
      latestDevelopment: timeline[0] ? { date: timeline[0].date, dateBs: timeline[0].date_bs, title: timeline[0].title } : null,
      courtCases: (d.court_cases ?? []).map((cc) => (typeof cc === 'string' ? cc : cc.courtcase_iri ?? cc.iri ?? null)).filter(Boolean),
      caseUpdatedAt: d.updated_at ?? null,
    });
    console.log(`  case: ${d.slug} [${d.status}] bigo=${cases.at(-1).bigoFormatted ?? '—'} role=${me?.type ?? '?'}/${me?.outcome ?? '?'}`);
  }

  const block = {
    entityIri: iri,
    nameEn: entity.name?.en ?? cfg.matchName,
    nameNe: entity.name?.ne ?? null,
    photoCredit: entity.image?.creditText ?? null,
    caseCount: cases.length,
    totalBigoNpr: cases.reduce((s, c) => s + (c.bigoNpr ?? 0), 0),
    cases,
    attribution: 'Case data: Jawafdehi Initiative (jawafdehi.org), CC BY-NC 4.0',
    syncedAt: new Date().toISOString(),
  };

  let entry = politicians.find((p) => p.name === cfg.matchName);
  const caseDates = cases.map((c) => (c.caseUpdatedAt ?? '').slice(0, 10)).filter(Boolean).sort();
  const newest = caseDates.at(-1);

  if (entry) {
    entry.jawafdehi = block;
    if (newest && newest > (entry.lastUpdated ?? '')) {
      console.log(`  lastUpdated: ${entry.lastUpdated} -> ${newest}`);
      entry.lastUpdated = newest;
    }
    const src = new Set(entry.sources ?? []);
    cases.forEach((c) => src.add(c.url));
    entry.sources = [...src];
    console.log('  merged into existing entry; manual fields untouched');
  } else {
    entry = {
      id: `politician-draft-${cfg.entitySlug}`,
      name: cfg.matchName,
      position: cfg.draft?.position ?? 'TODO (manual)',
      party: cfg.draft?.party ?? 'TODO (manual)',
      // schema requires strings when present — omit absent fields instead of null
      ...(entity.image?.contentUrl || casePhoto ? { photo: entity.image?.contentUrl ?? casePhoto } : {}),
      corruptionAllegations: [],
      children: [],
      lastUpdated: newest ?? null,
      sources: cases.map((c) => c.url),
      jawafdehi: block,
      _draft: 'Created by sync-jawafdehi-poc — position/party are manual placeholders, verify before publishing',
    };
    politicians.push(entry);
    console.log('  NEW draft entry created');
  }
  return entry;
}

const dataPath = new URL('../public/data/politicians.json', import.meta.url);
const politicians = JSON.parse(readFileSync(dataPath, 'utf8'));
for (const cfg of PEOPLE) await syncPerson(cfg, politicians);

const out = new URL('../public/data/politicians.poc.json', import.meta.url);
writeFileSync(out, JSON.stringify(politicians, null, 2) + '\n');
console.log(`\nWrote ${out.pathname} (${politicians.length} entries). Live politicians.json untouched.`);
