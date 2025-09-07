'use client'

import { useState } from 'react'
import { Users, DollarSign, Calendar, ExternalLink, ChevronDown, ChevronUp, Instagram, Facebook } from 'lucide-react'
import { Politician } from '@/types/politician'
import ChildCard from './ChildCard'

interface PoliticianCardProps {
  politician: Politician
}

export default function PoliticianCard({ politician }: PoliticianCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="card hover:shadow-lg transition-shadow">
      {/* Politician Header */}
      <div className="flex items-start space-x-4 mb-4">
        {politician.photo && (
          <img
            src={politician.photo}
            alt={politician.name}
            className="w-16 h-16 rounded-full object-cover"
          />
        )}
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-1">
            {politician.name}
          </h3>
          <p className="text-nepal-red font-semibold mb-1">
            {politician.position}
          </p>
          <p className="text-gray-600 text-sm">
            {politician.party}
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <Users className="w-4 h-4 mr-2" />
          {politician.children.length} children
        </div>
        {politician.estimatedWealth && (
          <div className="flex items-center text-sm text-gray-600">
            <DollarSign className="w-4 h-4 mr-2" />
            {politician.estimatedWealth}
          </div>
        )}
      </div>

      {/* Corruption Allegations */}
      {politician.corruptionAllegations && politician.corruptionAllegations.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-red-600 mb-2">Corruption Allegations:</h4>
          <div className="space-y-1">
            {politician.corruptionAllegations.slice(0, 2).map((allegation, index) => (
              <p key={index} className="text-sm text-gray-700 bg-red-50 p-2 rounded">
                {allegation}
              </p>
            ))}
            {politician.corruptionAllegations.length > 2 && (
              <p className="text-xs text-gray-500">
                +{politician.corruptionAllegations.length - 2} more allegations
              </p>
            )}
          </div>
        </div>
      )}

      {/* Expand/Collapse Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-center py-2 text-nepal-red hover:bg-red-50 rounded-md transition-colors"
      >
        {isExpanded ? (
          <>
            <ChevronUp className="w-4 h-4 mr-2" />
            Hide Children Details
          </>
        ) : (
          <>
            <ChevronDown className="w-4 h-4 mr-2" />
            View Children Details
          </>
        )}
      </button>

      {/* Children Details */}
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <h4 className="text-lg font-semibold text-gray-900 mb-3">
            Children ({politician.children.length})
          </h4>
          <div className="space-y-4">
            {politician.children.map((child, index) => (
              <ChildCard key={index} child={child} />
            ))}
          </div>
        </div>
      )}

      {/* Sources */}
      {politician.sources && politician.sources.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Sources:</h4>
          <div className="space-y-1">
            {politician.sources.map((source, index) => (
              <a
                key={index}
                href={source}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-sm text-blue-600 hover:text-blue-800"
              >
                <ExternalLink className="w-3 h-3 mr-1" />
                Source {index + 1}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Last Updated */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center text-xs text-gray-500">
          <Calendar className="w-3 h-3 mr-1" />
          Last updated: {new Date(politician.lastUpdated).toLocaleDateString()}
        </div>
      </div>
    </div>
  )
}