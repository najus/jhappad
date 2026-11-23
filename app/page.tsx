'use client'

import { useState, useEffect } from 'react'
import { Search, ExternalLink, Github, ArrowRight, ArrowUpRight } from 'lucide-react'
import PoliticianCard from '@/components/PoliticianCard'
import Header from '@/components/Header'
import SocialShare from '@/components/SocialShare'
import { Politician } from '@/types/politician'
import { useLanguage } from '@/contexts/LanguageContext'

function formatBigo(npr: number): string {
  if (npr >= 1e9) return `Rs ${(npr / 1e9).toFixed(2)} arba`
  if (npr >= 1e7) return `Rs ${(npr / 1e7).toFixed(2)} crore`
  return `Rs ${npr.toLocaleString('en-IN')}`
}

export default function Home() {
  const [politicians, setPoliticians] = useState<Politician[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const { t } = useLanguage()

  useEffect(() => {
    const loadPoliticians = async () => {
      try {
        const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3001'
        const response = await fetch(`${baseUrl}/data/politicians.json`)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        setPoliticians(data)
      } catch (error) {
        console.error('Error loading politicians:', error)
        setPoliticians([])
      } finally {
        setLoading(false)
      }
    }

    if (typeof window !== 'undefined') {
      loadPoliticians()
    }
  }, [])

  const filteredPoliticians = politicians.filter(politician => {
    if (!searchTerm.trim()) return true

    const searchLower = searchTerm.toLowerCase()
    return (
      politician.name.toLowerCase().includes(searchLower) ||
      politician.party.toLowerCase().includes(searchLower) ||
      politician.position.toLowerCase().includes(searchLower) ||
      (politician.corruptionAllegations && politician.corruptionAllegations.some(allegation =>
        allegation.toLowerCase().includes(searchLower)
      )) ||
      politician.children.some(child =>
        child.name.toLowerCase().includes(searchLower)
      ) ||
      (politician.jawafdehi && politician.jawafdehi.cases.some(c =>
        c.title.toLowerCase().includes(searchLower) ||
        c.keyAllegations.some(a => a.toLowerCase().includes(searchLower))
      ))
    )
  })

  const totalChildren = politicians.reduce((sum, politician) => sum + politician.children.length, 0)
  const totalPoliticians = politicians.length
  const totalCases = politicians.reduce((sum, p) => sum + (p.jawafdehi?.caseCount ?? 0), 0)
  const totalBigo = politicians.reduce((sum, p) => sum + (p.jawafdehi?.totalBigoNpr ?? 0), 0)

  return (
    <div className="min-h-screen bg-paper">
      <Header />

      <main className="container-responsive">
        {/* Masthead story */}
        <section className="pt-10 sm:pt-14 pb-8 border-b border-ink">
          <p className="text-xs sm:text-sm uppercase tracking-[0.22em] text-nepal-blue font-semibold mb-4">
            {t('home.exposingCorruption')}
          </p>
          <h1 className="font-display font-black text-4xl sm:text-6xl leading-[1.02] tracking-tight max-w-4xl">
            {t('home.title')}
          </h1>
          <p className="font-display text-lg sm:text-2xl text-ink/75 leading-relaxed max-w-3xl mt-5">
            {t('home.description')}
          </p>

          {/* Ledger of record */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6 mt-10">
            <div className="ledger-cell">
              <div className="font-display text-3xl sm:text-4xl font-bold">{totalPoliticians}</div>
              <div className="text-xs uppercase tracking-[0.14em] text-ink/60 mt-1">{t('home.stats.politicians')}</div>
            </div>
            <div className="ledger-cell">
              <div className="font-display text-3xl sm:text-4xl font-bold">{totalCases}</div>
              <div className="text-xs uppercase tracking-[0.14em] text-ink/60 mt-1">Documented court / CIAA cases</div>
            </div>
            <div className="ledger-cell">
              <div className="font-display text-3xl sm:text-4xl font-bold text-nepal-red">{totalBigo > 0 ? formatBigo(totalBigo) : '—'}</div>
              <div className="text-xs uppercase tracking-[0.14em] text-ink/60 mt-1">बिगो claimed in those cases</div>
            </div>
            <div className="ledger-cell">
              <div className="font-display text-3xl sm:text-4xl font-bold">{totalChildren}</div>
              <div className="text-xs uppercase tracking-[0.14em] text-ink/60 mt-1">{t('home.stats.children')}</div>
            </div>
          </div>
          <p className="text-xs text-ink/50 mt-4">
            Case figures are drawn from court and CIAA filings documented by the Jawafdehi Initiative (CC BY-NC 4.0) and are claims before the courts, not verdicts.
          </p>
        </section>

        {/* Actions, as a ruled index */}
        <section className="border-b border-ink">
          <a href="https://forms.gle/w7jEJtD2HSrgDNcw5" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between gap-4 py-4 border-b border-hairline">
            <div>
              <span className="font-display font-bold text-lg sm:text-xl group-hover:text-nepal-red transition-colors">Report corruption</span>
              <span className="block text-sm text-ink/60">Share evidence, anonymously if you need to. It helps expose what officials hide.</span>
            </div>
            <ArrowUpRight className="w-5 h-5 flex-shrink-0 text-nepal-red" />
          </a>
          <a href="/protests/sep-8" className="group flex items-center justify-between gap-4 py-4 border-b border-hairline">
            <div>
              <span className="font-display font-bold text-lg sm:text-xl group-hover:text-nepal-red transition-colors">The September 8 evidence</span>
              <span className="block text-sm text-ink/60">Photos and video from the Gen Z protests that changed the country.</span>
            </div>
            <ArrowRight className="w-5 h-5 flex-shrink-0 text-nepal-red" />
          </a>
          <a href="/memorial" className="group flex items-center justify-between gap-4 py-4">
            <div>
              <span className="font-display font-bold text-lg sm:text-xl group-hover:text-nepal-red transition-colors">Memorial</span>
              <span className="block text-sm text-ink/60">Remembering those who lost their lives on September 8, 2025.</span>
            </div>
            <ArrowRight className="w-5 h-5 flex-shrink-0 text-nepal-red" />
          </a>
        </section>

        {/* The record */}
        <section id="politicians" className="py-10">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
            <h2 className="font-display font-black text-3xl sm:text-4xl tracking-tight">The record</h2>
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/40 w-5 h-5" />
              <input
                type="text"
                placeholder={t('home.search.placeholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3 text-base bg-white border border-ink/30 rounded-sm focus:outline-none focus:border-nepal-red focus:ring-1 focus:ring-nepal-red placeholder:text-ink/40"
              />
            </div>
          </div>

          {searchTerm && (
            <p className="text-sm text-ink/60 mb-6">
              {t('home.search.found').replace('{count}', filteredPoliticians.length.toString()).replace('{total}', politicians.length.toString())}
            </p>
          )}

          {loading ? (
            <div className="text-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-2 border-nepal-red/20 border-t-nepal-red mx-auto mb-4"></div>
              <p className="text-lg text-ink/70 mb-2">{t('common.loading')}</p>
              <p className="text-sm text-ink/50">{t('home.loadingPoliticians')}</p>
            </div>
          ) : politicians.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="font-display text-2xl font-bold mb-4">{t('home.failedToLoad')}</h3>
              <p className="text-ink/60 mb-6">{t('home.checkConsole')}</p>
              <button onClick={() => window.location.reload()} className="btn-primary inline-flex">
                {t('common.retry')}
              </button>
            </div>
          ) : filteredPoliticians.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="font-display text-2xl font-bold mb-4">{t('home.search.noResults')}</h3>
              <p className="text-ink/60 mb-6">{t('home.search.trySearching')}</p>
              <button onClick={() => setSearchTerm('')} className="btn-secondary inline-flex">
                {t('home.search.clear')}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPoliticians.map((politician) => (
                <PoliticianCard key={politician.id} politician={politician} />
              ))}
            </div>
          )}
        </section>

        {/* How this record is built */}
        <section className="py-12 border-t border-ink">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl">
            <div>
              <h2 className="font-display font-black text-2xl sm:text-3xl tracking-tight mb-4">{t('home.joinMovement')}</h2>
              <p className="text-ink/75 leading-relaxed">
                Every entry here is a public record: declared wealth that does not match a lifestyle, family members
                living far beyond a public salary, and — now — the actual cases filed before Nepal&apos;s courts and
                the CIAA, with the amount claimed in each. Allegations are labelled as allegations; case status is
                shown as the courts report it.
              </p>
            </div>
            <div className="space-y-4">
              <SocialShare />
              <div className="flex flex-col sm:flex-row gap-3">
                <a href="https://forms.gle/w7jEJtD2HSrgDNcw5" target="_blank" rel="noopener noreferrer" className="btn-primary">
                  {t('home.cta.report')}
                </a>
                <a href="/contribute" className="btn-secondary">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  {t('home.cta.technical')}
                </a>
                <a href="https://github.com/najus/jhappad" target="_blank" rel="noopener noreferrer" className="btn-secondary">
                  <Github className="w-4 h-4 mr-2" />
                  {t('home.cta.github')}
                </a>
              </div>
              <p className="text-sm text-ink/50">{t('home.cta.quick')}</p>
            </div>
          </div>
        </section>
      </main>

      {/* Floating Share Button */}
      <SocialShare variant="floating" />
    </div>
  )
}
