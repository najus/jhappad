'use client'

import { useState, useEffect } from 'react'
import { Users, DollarSign, Calendar, ExternalLink, ChevronDown, ChevronUp, Instagram, Facebook, X, Eye, Share2, Scale } from 'lucide-react'

function formatBigo(npr?: number | null): string | null {
  if (!npr) return null
  if (npr >= 1e9) return `Rs ${(npr / 1e9).toFixed(npr % 1e9 ? 2 : 0)} arba`
  if (npr >= 1e7) return `Rs ${(npr / 1e7).toFixed(npr % 1e7 ? 2 : 0)} crore`
  return `Rs ${npr.toLocaleString('en-IN')}`
}
import { Politician } from '@/types/politician'
import ChildCard from './ChildCard'
import SocialShare from './SocialShare'
import { useLanguage } from '@/contexts/LanguageContext'

interface PoliticianCardProps {
  politician: Politician
}

export default function PoliticianCard({ politician }: PoliticianCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { t } = useLanguage()

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isModalOpen) {
        setIsModalOpen(false)
      }
    }

    if (isModalOpen) {
      document.addEventListener('keydown', handleKeyDown)
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [isModalOpen])

  return (
    <>
      {/* Clickable Card */}
      <div 
        className="card cursor-pointer group hover:border-nepal-red/60 transition-colors"
        onClick={() => setIsModalOpen(true)}
      >
        {/* Politician Header */}
        <div className="flex items-start space-x-3 sm:space-x-4 mb-3 sm:mb-4">
          {politician.photo && (
            <img
              src={politician.photo}
              alt={politician.name}
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-sm object-cover flex-shrink-0 border border-hairline"
            />
          )}
          <div className="flex-1 min-w-0">
            <h3 className="font-display text-lg sm:text-xl font-bold text-ink mb-1 break-words group-hover:text-nepal-red transition-colors">
              {politician.name}
            </h3>
            <p className="text-nepal-red font-semibold mb-1 text-sm sm:text-base break-words">
              {politician.position}
            </p>
            <p className="text-ink/60 text-xs sm:text-sm break-words">
              {politician.party}
            </p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-2 sm:gap-4 mb-3 sm:mb-4">
          <div className="flex items-center text-xs sm:text-sm text-ink/60">
            <Users className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 flex-shrink-0" />
            <span className="truncate">{politician.children.length} {t('politician.children')}</span>
          </div>
          {politician.estimatedWealth && (
            <div className="flex items-center text-xs sm:text-sm text-ink/60">
              <DollarSign className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 flex-shrink-0" />
              <span className="truncate">{politician.estimatedWealth}</span>
            </div>
          )}
        </div>

        {/* Corruption Allegations Preview */}
        {politician.corruptionAllegations && politician.corruptionAllegations.length > 0 && (
          <div className="mb-3 sm:mb-4">
            <h4 className="text-xs sm:text-sm font-semibold text-nepal-red mb-2 uppercase tracking-wide">{t('politician.allegations')}</h4>
            <div className="space-y-1">
              {politician.corruptionAllegations.slice(0, 1).map((allegation, index) => (
                <p key={index} className="text-xs sm:text-sm text-ink/80 bg-sheet border-l-2 border-nepal-red p-2 break-words line-clamp-2">
                  {allegation}
                </p>
              ))}
              {politician.corruptionAllegations.length > 1 && (
                <p className="text-xs text-nepal-red font-medium">
                  +{politician.corruptionAllegations.length - 1} {t('politician.moreAllegations')}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Documented Cases (Jawafdehi) Preview */}
        {politician.jawafdehi && politician.jawafdehi.caseCount > 0 && (
          <div className="flex items-center text-xs sm:text-sm text-ink bg-sheet border-l-2 border-nepal-blue p-2">
            <Scale className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 flex-shrink-0 text-nepal-blue" />
            <span className="truncate">
              {politician.jawafdehi.caseCount} documented court/CIAA case{politician.jawafdehi.caseCount > 1 ? 's' : ''}
              {formatBigo(politician.jawafdehi.totalBigoNpr) && <> · बिगो {formatBigo(politician.jawafdehi.totalBigoNpr)}</>}
            </span>
          </div>
        )}

      </div>

      {/* Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setIsModalOpen(false)
            }
          }}
        >
          <div className="bg-paper rounded-sm border border-ink max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-paper border-b border-ink p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {politician.photo && (
                    <img
                      src={politician.photo}
                      alt={politician.name}
                      className="w-16 h-16 rounded-sm object-cover border border-hairline"
                    />
                  )}
                  <div>
                    <h2 className="font-display text-2xl font-bold text-ink">{politician.name}</h2>
                    <p className="text-nepal-red font-semibold text-lg">{politician.position}</p>
                    <p className="text-gray-600">{politician.party}</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-sheet rounded-sm transition-colors"
                >
                  <X className="w-6 h-6 text-ink/60" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-sheet border-t-2 border-ink p-4 text-center">
                  <Users className="w-8 h-8 text-nepal-red mx-auto mb-2" />
                  <div className="font-display text-2xl font-bold text-ink">{politician.children.length}</div>
                  <div className="text-sm text-ink/60">{t('politician.children')}</div>
                </div>
                {politician.estimatedWealth && (
                  <div className="bg-sheet border-t-2 border-ink p-4 text-center">
                    <DollarSign className="w-8 h-8 text-nepal-blue mx-auto mb-2" />
                    <div className="font-display text-2xl font-bold text-ink">{politician.estimatedWealth}</div>
                    <div className="text-sm text-ink/60">{t('politician.estimatedWealth')}</div>
                  </div>
                )}
                <div className="bg-sheet border-t-2 border-ink p-4 text-center">
                  <Calendar className="w-8 h-8 text-nepal-blue mx-auto mb-2" />
                  <div className="font-display text-2xl font-bold text-ink">{new Date(politician.lastUpdated).toLocaleDateString()}</div>
                  <div className="text-sm text-ink/60">{t('politician.lastUpdated')}</div>
                </div>
              </div>

              {/* Corruption Allegations */}
              {politician.corruptionAllegations && politician.corruptionAllegations.length > 0 && (
                <div>
                  <h3 className="font-display text-xl font-bold text-ink mb-4 flex items-center border-b border-hairline pb-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                    {t('politician.corruptionAllegations')} ({politician.corruptionAllegations.length})
                  </h3>
                  <div className="space-y-3">
                    {politician.corruptionAllegations.map((allegation, index) => (
                      <div key={index} className="bg-white border-l-2 border-nepal-red p-4">
                        <p className="text-ink/85">{allegation}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Documented Cases (Jawafdehi) */}
              {politician.jawafdehi && politician.jawafdehi.caseCount > 0 && (
                <div>
                  <h3 className="font-display text-xl font-bold text-ink mb-4 flex items-center border-b border-hairline pb-2">
                    <Scale className="w-6 h-6 mr-3 text-nepal-blue" />
                    Documented Court / CIAA Cases ({politician.jawafdehi.caseCount})
                  </h3>
                  <div className="space-y-4">
                    {politician.jawafdehi.cases.map((c) => (
                      <div key={c.slug} className="bg-white border-l-2 border-nepal-blue p-4">
                        <a href={c.url} target="_blank" rel="noopener noreferrer" className="font-display font-semibold text-ink hover:text-nepal-blue break-words">
                          {c.title}
                        </a>
                        <div className="flex flex-wrap gap-2 mt-2 text-xs">
                          {c.status && <span className="border border-nepal-blue text-nepal-blue px-2 py-0.5 font-medium uppercase tracking-wide">{c.status}</span>}
                          {c.bigoFormatted && <span className="bg-sheet border border-hairline px-2 py-0.5">बिगो {c.bigoFormatted}</span>}
                          {c.role && <span className="bg-sheet border border-hairline px-2 py-0.5">Role: {c.role}{c.outcome ? ` / ${c.outcome}` : ''}</span>}
                        </div>
                        {c.keyAllegations.length > 0 && (
                          <ul className="list-disc list-inside text-sm text-ink/75 mt-2 space-y-1">
                            {c.keyAllegations.slice(0, 3).map((a, i) => (
                              <li key={i} className="break-words">{a}</li>
                            ))}
                          </ul>
                        )}
                        {c.latestDevelopment && (
                          <p className="text-xs text-ink/50 mt-2">
                            Latest: {c.latestDevelopment.title} ({c.latestDevelopment.date})
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-ink/50 mt-3">{politician.jawafdehi.attribution}</p>
                </div>
              )}

              {/* Children */}
              <div>
                <h3 className="font-display text-xl font-bold text-ink mb-4 flex items-center border-b border-hairline pb-2">
                  <Users className="w-6 h-6 mr-3 text-nepal-red" />
                  {t('politician.familyMembers')} ({politician.children.length})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {politician.children.map((child, index) => (
                    <ChildCard key={index} child={child} />
                  ))}
                </div>
              </div>

              {/* Sources */}
              {politician.sources && politician.sources.length > 0 && (
                <div>
                  <h3 className="font-display text-xl font-bold text-ink mb-4 flex items-center border-b border-hairline pb-2">
                    <ExternalLink className="w-6 h-6 mr-3 text-nepal-blue" />
                    {t('politician.sources')} ({politician.sources.length})
                  </h3>
                  <div className="space-y-2">
                    {politician.sources.map((source, index) => (
                      <a
                        key={index}
                        href={source}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center p-3 bg-sheet hover:bg-hairline/50 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4 mr-3 text-nepal-blue flex-shrink-0" />
                        <span className="text-nepal-blue hover:text-ink break-all">Source {index + 1}</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Share Section */}
              <div className="bg-sheet p-6">
                <h3 className="font-display text-xl font-bold text-ink mb-4 flex items-center border-b border-hairline pb-2">
                  <Share2 className="w-6 h-6 mr-3 text-nepal-red" />
                  {t('politician.shareInformation')}
                </h3>
                <p className="text-ink/70 mb-4">
                  {t('politician.shareDescription').replace('{name}', politician.name)}
                </p>
                <SocialShare 
                  politicianName={politician.name}
                  title={`${politician.name} - Corruption Details`}
                  description={`Check out ${politician.name}'s corruption allegations and children's lavish lifestyles on Jhappad.com`}
                  variant="compact"
                  className="justify-center"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}