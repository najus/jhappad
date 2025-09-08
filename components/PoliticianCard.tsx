'use client'

import { useState } from 'react'
import { Users, DollarSign, Calendar, ExternalLink, ChevronDown, ChevronUp, Instagram, Facebook } from 'lucide-react'
import { Politician } from '@/types/politician'
import ChildCard from './ChildCard'
import SocialShare from './SocialShare'
import { useLanguage } from '@/contexts/LanguageContext'

interface PoliticianCardProps {
  politician: Politician
}

export default function PoliticianCard({ politician }: PoliticianCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [showAllAllegations, setShowAllAllegations] = useState(false)
  const { t } = useLanguage()

  return (
    <div className="card hover:shadow-lg transition-all duration-200 p-4 sm:p-6">
      {/* Politician Header */}
      <div className="flex items-start space-x-3 sm:space-x-4 mb-3 sm:mb-4">
        {politician.photo && (
          <img
            src={politician.photo}
            alt={politician.name}
            className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover flex-shrink-0"
          />
        )}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 break-words">
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

      {/* Corruption Allegations */}
      {politician.corruptionAllegations && politician.corruptionAllegations.length > 0 && (
        <div className="mb-3 sm:mb-4">
          <h4 className="text-xs sm:text-sm font-semibold text-red-600 mb-2">{t('politician.allegations')}</h4>
          <div className="space-y-1">
            {(showAllAllegations ? politician.corruptionAllegations : politician.corruptionAllegations.slice(0, 2)).map((allegation, index) => (
              <p key={index} className="text-xs sm:text-sm text-gray-700 bg-red-50 p-2 rounded break-words">
                {allegation}
              </p>
            ))}
            {politician.corruptionAllegations.length > 2 && (
              <button
                onClick={() => setShowAllAllegations(!showAllAllegations)}
                className="text-xs text-nepal-red hover:text-red-800 font-medium cursor-pointer transition-colors bg-red-50 hover:bg-red-100 px-2 py-1 rounded border border-red-200 w-full sm:w-auto"
              >
                {showAllAllegations 
                  ? t('politician.showLess')
                  : `+${politician.corruptionAllegations.length - 2} ${t('politician.showMore')}`
                }
              </button>
            )}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="space-y-2">
        {/* Share Button */}
        <div className="mb-2">
          <SocialShare 
            politicianName={politician.name}
            title={`${politician.name} - Corruption Details`}
            description={`Check out ${politician.name}'s corruption allegations and children's lavish lifestyles on Jhappad.com`}
            variant="compact"
            className="justify-center"
          />
        </div>
        
        {/* Expand/Collapse Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-center py-3 text-nepal-red hover:bg-red-50 rounded-lg transition-colors text-sm sm:text-base font-medium btn-touch"
        >
          {isExpanded ? (
            <>
              <ChevronUp className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">{t('politician.hideDetails')}</span>
            <span className="sm:hidden">{t('politician.hideDetails')}</span>
          </>
        ) : (
          <>
            <ChevronDown className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">{t('politician.viewDetails')}</span>
            <span className="sm:hidden">{t('politician.viewDetails')}</span>
          </>
        )}
        </button>
      </div>

      {/* Children Details */}
      {isExpanded && (
        <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-200">
          <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-3">
            {t('politician.children')} ({politician.children.length})
          </h4>
          <div className="space-y-3 sm:space-y-4">
            {politician.children.map((child, index) => (
              <ChildCard key={index} child={child} />
            ))}
          </div>
        </div>
      )}

      {/* Sources */}
      {politician.sources && politician.sources.length > 0 && (
        <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-200">
          <h4 className="text-xs sm:text-sm font-semibold text-gray-700 mb-2">{t('politician.sources')}</h4>
          <div className="space-y-1">
            {politician.sources.map((source, index) => (
              <a
                key={index}
                href={source}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-xs sm:text-sm text-blue-600 hover:text-blue-800 break-all"
              >
                <ExternalLink className="w-3 h-3 mr-1 flex-shrink-0" />
                Source {index + 1}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Last Updated */}
      <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-200">
        <div className="flex items-center text-xs text-gray-500">
          <Calendar className="w-3 h-3 mr-1 flex-shrink-0" />
          <span className="truncate">{t('politician.lastUpdated')} {new Date(politician.lastUpdated).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  )
}