'use client'

import { useState, useEffect } from 'react'
import { Search, Users, DollarSign, Calendar, ExternalLink, Github } from 'lucide-react'
import PoliticianCard from '@/components/PoliticianCard'
import Header from '@/components/Header'
import { Politician } from '@/types/politician'

export default function Home() {
  const [politicians, setPoliticians] = useState<Politician[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load politicians data
    const loadPoliticians = async () => {
      try {
        console.log('Loading politicians data...')
        
        // Use absolute URL for better reliability
        const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3001'
        const response = await fetch(`${baseUrl}/data/politicians.json`)
        console.log('Response status:', response.status)
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        console.log('Loaded politicians:', data.length)
        setPoliticians(data)
      } catch (error) {
        console.error('Error loading politicians:', error)
        // Set empty array on error to prevent infinite loading
        setPoliticians([])
      } finally {
        setLoading(false)
      }
    }

    // Only run on client side
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
      )
    )
  })

  const totalChildren = politicians.reduce((sum, politician) => sum + politician.children.length, 0)
  const totalPoliticians = politicians.length

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-6 sm:py-8">
        {/* Hero Section */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Jhappad.com
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto px-4">
            A collective <span className="text-nepal-red font-bold">SLAP</span> to corruption in Nepal. 
            We are ordinary Nepali people uniting against corrupt politicians and their children.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div className="card text-center p-4 sm:p-6">
              <Users className="w-6 h-6 sm:w-8 sm:h-8 text-nepal-red mx-auto mb-2" />
              <div className="text-xl sm:text-2xl font-bold text-gray-900">{totalPoliticians}</div>
              <div className="text-sm sm:text-base text-gray-600">Politicians Tracked</div>
            </div>
            <div className="card text-center p-4 sm:p-6">
              <Users className="w-6 h-6 sm:w-8 sm:h-8 text-nepal-blue mx-auto mb-2" />
              <div className="text-xl sm:text-2xl font-bold text-gray-900">{totalChildren}</div>
              <div className="text-sm sm:text-base text-gray-600">Children Documented</div>
            </div>
            <div className="card text-center p-4 sm:p-6">
              <DollarSign className="w-6 h-6 sm:w-8 sm:h-8 text-green-600 mx-auto mb-2" />
              <div className="text-xl sm:text-2xl font-bold text-gray-900">∞</div>
              <div className="text-sm sm:text-base text-gray-600">Wealth Exposed</div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="mb-6 sm:mb-8">
          <div className="relative max-w-md mx-auto px-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
            <input
              type="text"
              placeholder="Search politicians, parties, positions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 sm:pl-10 pr-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-nepal-red focus:border-transparent"
            />
          </div>
          {searchTerm && (
            <div className="text-center mt-2">
              <p className="text-xs sm:text-sm text-gray-600">
                Found {filteredPoliticians.length} of {politicians.length} politicians
              </p>
            </div>
          )}
        </div>

        {/* Politicians Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-nepal-red mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading politicians...</p>
            <p className="text-sm text-gray-500 mt-2">Check browser console for details</p>
          </div>
        ) : politicians.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-red-500 text-6xl mb-4">⚠️</div>
            <p className="text-gray-600 text-lg mb-2">Failed to load politicians data</p>
            <p className="text-sm text-gray-500">Please check the browser console for error details</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 btn-primary"
            >
              Retry
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredPoliticians.map((politician) => (
              <PoliticianCard key={politician.id} politician={politician} />
            ))}
          </div>
        )}

        {!loading && politicians.length > 0 && filteredPoliticians.length === 0 && (
          <div className="text-center py-8 sm:py-12 px-4">
            <div className="text-gray-400 text-3xl sm:text-4xl mb-4">🔍</div>
            <p className="text-gray-600 text-base sm:text-lg mb-2">No politicians found matching your search</p>
            <p className="text-xs sm:text-sm text-gray-500">Try searching for:</p>
            <div className="mt-2 flex flex-wrap justify-center gap-2">
              <span className="inline-block bg-gray-100 text-gray-700 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">politician name</span>
              <span className="inline-block bg-gray-100 text-gray-700 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">party name</span>
              <span className="inline-block bg-gray-100 text-gray-700 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">position</span>
              <span className="inline-block bg-gray-100 text-gray-700 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">corruption type</span>
            </div>
            <button 
              onClick={() => setSearchTerm('')} 
              className="mt-4 btn-secondary text-sm sm:text-base"
            >
              Clear Search
            </button>
          </div>
        )}

        {/* Contribution CTA */}
        <div className="mt-12 sm:mt-16 text-center px-4">
          <div className="card max-w-2xl mx-auto p-4 sm:p-6">
            <Github className="w-10 h-10 sm:w-12 sm:h-12 text-gray-600 mx-auto mb-4" />
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
              Join the JHAPPAD Movement
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
              Help us deliver the biggest <span className="text-nepal-red font-bold"> SLAP</span> to corruption! 
              Share information about corrupt politicians and their children anonymously.
            </p>
            
            {/* Primary CTA - Google Form */}
            <div className="mb-4 sm:mb-6">
              <a
                href="https://forms.gle/w7jEJtD2HSrgDNcw5"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-nepal-red to-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-200 inline-flex items-center justify-center text-sm sm:text-base shadow-lg hover:shadow-xl"
              >
                📝 Report Corruption Anonymously
              </a>
              <p className="text-xs text-gray-500 mt-2">
                Quick & Easy • No Technical Skills Required • 100% Anonymous
              </p>
            </div>

            {/* Secondary CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <a
                href="/contribute"
                className="btn-secondary inline-flex items-center justify-center text-sm sm:text-base"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Technical Contribution Guide
              </a>
              <a
                href="https://github.com/najus/jhappad"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary inline-flex items-center justify-center text-sm sm:text-base"
              >
                <Github className="w-4 h-4 mr-2" />
                View on GitHub
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}