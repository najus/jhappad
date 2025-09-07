'use client'

import { useState } from 'react'
import { DollarSign, GraduationCap, Building, Instagram, Facebook, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react'
import { Child } from '@/types/politician'

interface ChildCardProps {
  child: Child
}

export default function ChildCard({ child }: ChildCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const getRelationshipIcon = (relationship: string) => {
    switch (relationship) {
      case 'son':
        return '👦'
      case 'daughter':
        return '👧'
      case 'adopted_son':
        return '👨‍👩‍👦'
      case 'adopted_daughter':
        return '👨‍👩‍👧'
      default:
        return '👶'
    }
  }

  return (
    <div className="bg-gray-50 rounded-lg p-4">
      {/* Child Header */}
      <div className="flex items-start space-x-3 mb-3">
        {child.photo && (
          <img
            src={child.photo}
            alt={child.name}
            className="w-12 h-12 rounded-full object-cover"
          />
        )}
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <h5 className="font-semibold text-gray-900">{child.name}</h5>
            <span className="text-lg">{getRelationshipIcon(child.relationship)}</span>
          </div>
          <p className="text-sm text-gray-600 capitalize">
            {child.relationship.replace('_', ' ')} • Age {child.age}
          </p>
        </div>
      </div>

      {/* Quick Info */}
      <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
        {child.education?.institution && (
          <div className="flex items-center text-gray-600">
            <GraduationCap className="w-3 h-3 mr-1" />
            {child.education.institution}
          </div>
        )}
        {child.education?.country && (
          <div className="text-gray-600">
            📍 {child.education.country}
          </div>
        )}
      </div>

      {/* Social Media Links */}
      {child.lifestyle?.socialMedia && (
        <div className="flex space-x-2 mb-3">
          {child.lifestyle.socialMedia.instagram && (
            <a
              href={child.lifestyle.socialMedia.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-600 hover:text-pink-800"
            >
              <Instagram className="w-4 h-4" />
            </a>
          )}
          {child.lifestyle.socialMedia.facebook && (
            <a
              href={child.lifestyle.socialMedia.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800"
            >
              <Facebook className="w-4 h-4" />
            </a>
          )}
        </div>
      )}

      {/* Expand Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-center py-1 text-xs text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded transition-colors"
      >
        {isExpanded ? (
          <>
            <ChevronUp className="w-3 h-3 mr-1" />
            Hide Details
          </>
        ) : (
          <>
            <ChevronDown className="w-3 h-3 mr-1" />
            Show Details
          </>
        )}
      </button>

      {/* Expanded Details */}
      {isExpanded && (
        <div className="mt-3 pt-3 border-t border-gray-200 space-y-3">
          {/* Education Details */}
          {child.education && (
            <div>
              <h6 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                <GraduationCap className="w-4 h-4 mr-1" />
                Education
              </h6>
              <div className="text-sm text-gray-600 space-y-1">
                {child.education.degree && (
                  <p><strong>Degree:</strong> {child.education.degree}</p>
                )}
                {child.education.cost && (
                  <p><strong>Cost:</strong> {child.education.cost}</p>
                )}
              </div>
            </div>
          )}

          {/* Luxury Items */}
          {child.lifestyle?.luxuryItems && child.lifestyle.luxuryItems.length > 0 && (
            <div>
              <h6 className="text-sm font-semibold text-gray-700 mb-2">Luxury Items</h6>
              <div className="flex flex-wrap gap-1">
                {child.lifestyle.luxuryItems.map((item, index) => (
                  <span
                    key={index}
                    className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Recent Splurges */}
          {child.lifestyle?.recentSplurges && child.lifestyle.recentSplurges.length > 0 && (
            <div>
              <h6 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                <DollarSign className="w-4 h-4 mr-1" />
                Recent Splurges
              </h6>
              <div className="space-y-2">
                {child.lifestyle.recentSplurges.map((splurge, index) => (
                  <div key={index} className="bg-red-50 p-2 rounded text-sm">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-gray-900">{splurge.item}</p>
                        <p className="text-red-600 font-semibold">{splurge.cost}</p>
                        <p className="text-gray-500 text-xs">
                          {new Date(splurge.date).toLocaleDateString()}
                        </p>
                      </div>
                      {splurge.source && (
                        <a
                          href={splurge.source}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Business Interests */}
          {child.businessInterests && child.businessInterests.length > 0 && (
            <div>
              <h6 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                <Building className="w-4 h-4 mr-1" />
                Business Interests
              </h6>
              <div className="space-y-2">
                {child.businessInterests.map((business, index) => (
                  <div key={index} className="bg-blue-50 p-2 rounded text-sm">
                    <p className="font-medium text-gray-900">{business.company}</p>
                    {business.position && (
                      <p className="text-gray-600">{business.position}</p>
                    )}
                    {business.ownership && (
                      <p className="text-blue-600 font-semibold">{business.ownership}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sources */}
          {child.sources && child.sources.length > 0 && (
            <div>
              <h6 className="text-sm font-semibold text-gray-700 mb-2">Sources</h6>
              <div className="space-y-1">
                {child.sources.map((source, index) => (
                  <a
                    key={index}
                    href={source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-xs text-blue-600 hover:text-blue-800"
                  >
                    <ExternalLink className="w-3 h-3 mr-1" />
                    Source {index + 1}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}