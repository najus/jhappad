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
        const response = await fetch('/data/politicians.json')
        const data = await response.json()
        setPoliticians(data)
      } catch (error) {
        console.error('Error loading politicians:', error)
      } finally {
        setLoading(false)
      }
    }

    loadPoliticians()
  }, [])

  const filteredPoliticians = politicians.filter(politician =>
    politician.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    politician.party.toLowerCase().includes(searchTerm.toLowerCase()) ||
    politician.position.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalChildren = politicians.reduce((sum, politician) => sum + politician.children.length, 0)
  const totalPoliticians = politicians.length

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Jhappad.com
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            A collective <span className="text-nepal-red font-bold">SLAP</span> to corruption in Nepal. 
            We are ordinary Nepali people uniting against corrupt politicians and their children.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="card text-center">
              <Users className="w-8 h-8 text-nepal-red mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{totalPoliticians}</div>
              <div className="text-gray-600">Politicians Tracked</div>
            </div>
            <div className="card text-center">
              <Users className="w-8 h-8 text-nepal-blue mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{totalChildren}</div>
              <div className="text-gray-600">Children Documented</div>
            </div>
            <div className="card text-center">
              <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">∞</div>
              <div className="text-gray-600">Wealth Exposed</div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search politicians, parties, or positions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nepal-red focus:border-transparent"
            />
          </div>
        </div>

        {/* Politicians Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-nepal-red mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading politicians...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPoliticians.map((politician) => (
              <PoliticianCard key={politician.id} politician={politician} />
            ))}
          </div>
        )}

        {!loading && filteredPoliticians.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No politicians found matching your search.</p>
          </div>
        )}

        {/* Contribution CTA */}
        <div className="mt-16 text-center">
          <div className="card max-w-2xl mx-auto">
            <Github className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Join the JHAPPAD Movement
            </h2>
            <p className="text-gray-600 mb-6">
              This platform is open source and community-driven. Help us deliver the biggest 
              <span className="text-nepal-red font-bold"> SLAP</span> to corruption by contributing 
              information about corrupt politicians and their children.
            </p>
            <div className="space-x-4">
              <a
                href="https://github.com/your-username/corrupt-nepali"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center"
              >
                <Github className="w-4 h-4 mr-2" />
                Contribute on GitHub
              </a>
              <a
                href="/contribute"
                className="btn-secondary inline-flex items-center"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                How to Contribute
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}