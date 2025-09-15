'use client'

import { useState, useEffect } from 'react'
import { Users, DollarSign, Calendar, ExternalLink, ChevronDown, ChevronUp, Instagram, Facebook, X, Eye, Share2 } from 'lucide-react'
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
        className="card hover:shadow-xl transition-all duration-300 p-4 sm:p-6 cursor-pointer group hover:scale-105"
        onClick={() => setIsModalOpen(true)}
      >
        {/* Politician Header */}
        <div className="flex items-start space-x-3 sm:space-x-4 mb-3 sm:mb-4">
          {politician.photo && (
            <img
              src={politician.photo}
              alt={politician.name}
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover flex-shrink-0 group-hover:ring-4 group-hover:ring-nepal-red/20 transition-all duration-300"
            />
          )}
          <div className="flex-1 min-w-0">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 break-words group-hover:text-nepal-red transition-colors">
              {politician.name}
            </h3>
            <p className="text-nepal-red font-semibold mb-1 text-sm sm:text-base break-words">
              {politician.position}
            </p>
            <p className="text-gray-600 text-xs sm:text-sm break-words">
              {politician.party}
            </p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-2 sm:gap-4 mb-3 sm:mb-4">
          <div className="flex items-center text-xs sm:text-sm text-gray-600">
            <Users className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 flex-shrink-0" />
            <span className="truncate">{politician.children.length} {t('politician.children')}</span>
          </div>
          {politician.estimatedWealth && (
            <div className="flex items-center text-xs sm:text-sm text-gray-600">
              <DollarSign className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 flex-shrink-0" />
              <span className="truncate">{politician.estimatedWealth}</span>
            </div>
          )}
        </div>

        {/* Corruption Allegations Preview */}
        {politician.corruptionAllegations && politician.corruptionAllegations.length > 0 && (
          <div className="mb-3 sm:mb-4">
            <h4 className="text-xs sm:text-sm font-semibold text-red-600 mb-2">{t('politician.allegations')}</h4>
            <div className="space-y-1">
              {politician.corruptionAllegations.slice(0, 1).map((allegation, index) => (
                <p key={index} className="text-xs sm:text-sm text-gray-700 bg-red-50 p-2 rounded break-words line-clamp-2">
                  {allegation}
                </p>
              ))}
              {politician.corruptionAllegations.length > 1 && (
                <p className="text-xs text-nepal-red font-medium">
                  +{politician.corruptionAllegations.length - 1} more allegations
                </p>
              )}
            </div>
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
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {politician.photo && (
                    <img
                      src={politician.photo}
                      alt={politician.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{politician.name}</h2>
                    <p className="text-nepal-red font-semibold text-lg">{politician.position}</p>
                    <p className="text-gray-600">{politician.party}</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-nepal-red/10 rounded-xl p-4 text-center">
                  <Users className="w-8 h-8 text-nepal-red mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{politician.children.length}</div>
                  <div className="text-sm text-gray-600">{t('politician.children')}</div>
                </div>
                {politician.estimatedWealth && (
                  <div className="bg-green-100 rounded-xl p-4 text-center">
                    <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">{politician.estimatedWealth}</div>
                    <div className="text-sm text-gray-600">Estimated Wealth</div>
                  </div>
                )}
                <div className="bg-amber-100 rounded-xl p-4 text-center">
                  <Calendar className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{new Date(politician.lastUpdated).toLocaleDateString()}</div>
                  <div className="text-sm text-gray-600">Last Updated</div>
                </div>
              </div>

              {/* Corruption Allegations */}
              {politician.corruptionAllegations && politician.corruptionAllegations.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                    Corruption Allegations ({politician.corruptionAllegations.length})
                  </h3>
                  <div className="space-y-3">
                    {politician.corruptionAllegations.map((allegation, index) => (
                      <div key={index} className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
                        <p className="text-gray-800">{allegation}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Children */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Users className="w-6 h-6 mr-3 text-nepal-red" />
                  Family Members ({politician.children.length})
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
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <ExternalLink className="w-6 h-6 mr-3 text-blue-600" />
                    Sources ({politician.sources.length})
                  </h3>
                  <div className="space-y-2">
                    {politician.sources.map((source, index) => (
                      <a
                        key={index}
                        href={source}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                      >
                        <ExternalLink className="w-4 h-4 mr-3 text-blue-600 flex-shrink-0" />
                        <span className="text-blue-600 hover:text-blue-800 break-all">Source {index + 1}</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Share Section */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Share2 className="w-6 h-6 mr-3 text-nepal-red" />
                  Share This Information
                </h3>
                <p className="text-gray-600 mb-4">
                  Help expose corruption by sharing {politician.name}'s details on social media.
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