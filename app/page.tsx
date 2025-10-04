'use client'

import { useState, useEffect } from 'react'
import { Search, Users, DollarSign, Calendar, ExternalLink, Github, Share2, AlertTriangle, Camera, TrendingUp, Shield, Eye, Heart } from 'lucide-react'
import PoliticianCard from '@/components/PoliticianCard'
import Header from '@/components/Header'
import SocialShare from '@/components/SocialShare'
import { Politician } from '@/types/politician'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Home() {
  const [politicians, setPoliticians] = useState<Politician[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const { t } = useLanguage()

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <Header />
      
      <main className="container-responsive">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-r from-nepal-red/5 via-transparent to-nepal-blue/5"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-nepal-red/10 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-nepal-blue/10 to-transparent rounded-full blur-3xl"></div>
          
          <div className="relative text-center py-8 sm:py-12">
            <div className="inline-flex items-center bg-nepal-red/10 text-nepal-red px-4 py-2 rounded-full text-sm font-medium mb-4">
              <span className="text-lg mr-2">👋</span>
              {t('home.exposingCorruption')}
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              <span className="bg-gradient-to-r from-nepal-red to-red-600 bg-clip-text text-transparent">
                {t('home.title')}
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-600 mb-6 max-w-3xl mx-auto px-4 leading-relaxed">
              {t('home.description')}
            </p>
            
            {/* Main Action Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-8">
              <a
                href="https://forms.gle/w7jEJtD2HSrgDNcw5"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-gradient-to-br from-nepal-red to-red-600 text-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="text-center">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-white/30 transition-colors">
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Report Corruption</h3>
                  <p className="text-red-100 text-sm">Share evidence and help expose corruption</p>
                </div>
              </a>
              
              <a
                href="/protests/sep-8"
                className="group bg-gradient-to-br from-amber-500 to-orange-500 text-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="text-center">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-white/30 transition-colors">
                    <Camera className="w-4 h-4" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">View Protests</h3>
                  <p className="text-amber-100 text-sm">See evidence from September 8th protests</p>
                </div>
              </a>
              
              <a
                href="/memorial"
                className="group bg-gradient-to-br from-gray-600 to-gray-700 text-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="text-center">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-white/30 transition-colors">
                    <Heart className="w-4 h-4" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Memorial</h3>
                  <p className="text-gray-200 text-sm">Remembering those who lost their lives</p>
                </div>
              </a>
            </div>
            
            {/* Social Share Buttons */}
            <div className="mb-6">
              <SocialShare 
                variant="compact" 
                className="justify-center"
              />
            </div>
            
          </div>
        </div>

        {/* Politicians Section */}
        <div id="politicians" className="py-8">
          <div className="text-center mb-6">
            {/* Politicians Stats */}
            <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mb-6">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20">
                <div className="text-2xl font-bold text-gray-900 mb-1">{totalPoliticians}</div>
                <div className="text-sm text-gray-600 font-medium">{t('home.stats.politicians')}</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20">
                <div className="text-2xl font-bold text-gray-900 mb-1">{totalChildren}</div>
                <div className="text-sm text-gray-600 font-medium">{t('home.stats.children')}</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20">
                <div className="text-2xl font-bold text-gray-900 mb-1">∞</div>
                <div className="text-sm text-gray-600 font-medium">{t('home.stats.wealth')}</div>
              </div>
            </div>
            
            {/* Inline Search */}
            <div className="relative max-w-2xl mx-auto px-4">
              <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder={t('home.search.placeholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-14 pr-6 py-4 text-base border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-nepal-red/20 focus:border-nepal-red shadow-lg transition-all duration-200 bg-white/80 backdrop-blur-sm"
              />
            </div>
            
            {searchTerm && (
              <div className="text-center mt-4">
                <p className="text-sm text-gray-600 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full inline-block">
                  {t('home.search.found').replace('{count}', filteredPoliticians.length.toString()).replace('{total}', politicians.length.toString())}
                </p>
              </div>
            )}
          </div>
          
          {loading ? (
            <div className="text-center py-16">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-nepal-red/20 border-t-nepal-red mx-auto mb-4"></div>
              <p className="text-xl text-gray-600 mb-2">{t('common.loading')}</p>
              <p className="text-sm text-gray-500">{t('home.loadingPoliticians')}</p>
            </div>
          ) : politicians.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-red-500 text-8xl mb-6">⚠️</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{t('home.failedToLoad')}</h3>
              <p className="text-gray-600 mb-6">{t('home.checkConsole')}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="bg-gradient-to-r from-nepal-red to-red-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                {t('common.retry')}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPoliticians.map((politician) => (
                <PoliticianCard key={politician.id} politician={politician} />
              ))}
            </div>
          )}
        </div>

        {/* Social Proof Section */}
        <div className="py-16 bg-white/30 backdrop-blur-sm">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('home.joinMovement')}</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {t('home.thousandsUsing')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="bg-gradient-to-r from-nepal-red to-red-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                {totalPoliticians}+
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{t('home.politiciansExposed')}</h3>
              <p className="text-gray-600">{t('home.publicRecords')}</p>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-r from-nepal-blue to-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                {totalChildren}+
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{t('home.familyMembers')}</h3>
              <p className="text-gray-600">{t('home.childrenRelatives')}</p>
            </div>
            
            <div className="text-center">
              <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                ∞
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{t('home.socialShares')}</h3>
              <p className="text-gray-600">{t('home.everyShareHelps')}</p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 max-w-4xl mx-auto shadow-lg border border-white/20">
              <div className="flex items-center justify-center mb-4">
                <div className="flex -space-x-2">
                  <div className="w-10 h-10 bg-nepal-red rounded-full border-2 border-white flex items-center justify-center text-white font-bold text-sm">N</div>
                  <div className="w-10 h-10 bg-nepal-blue rounded-full border-2 border-white flex items-center justify-center text-white font-bold text-sm">P</div>
                  <div className="w-10 h-10 bg-green-500 rounded-full border-2 border-white flex items-center justify-center text-white font-bold text-sm">A</div>
                  <div className="w-10 h-10 bg-amber-500 rounded-full border-2 border-white flex items-center justify-center text-white font-bold text-sm">L</div>
                  <div className="w-10 h-10 bg-purple-500 rounded-full border-2 border-white flex items-center justify-center text-white font-bold text-sm">+</div>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "{t('home.platformVoice')}"
              </p>
              <p className="text-sm text-gray-500 mt-2">- {t('home.anonymousContributor')}</p>
            </div>
          </div>
        </div>

        {!loading && politicians.length > 0 && filteredPoliticians.length === 0 && (
          <div className="text-center py-16 px-4">
            <div className="text-gray-400 text-8xl mb-6">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">{t('home.search.noResults')}</h3>
            <p className="text-gray-600 mb-6">{t('home.search.trySearching')}</p>
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <span className="inline-block bg-nepal-red/10 text-nepal-red px-4 py-2 rounded-full text-sm font-medium">politician name</span>
              <span className="inline-block bg-nepal-red/10 text-nepal-red px-4 py-2 rounded-full text-sm font-medium">party name</span>
              <span className="inline-block bg-nepal-red/10 text-nepal-red px-4 py-2 rounded-full text-sm font-medium">position</span>
              <span className="inline-block bg-nepal-red/10 text-nepal-red px-4 py-2 rounded-full text-sm font-medium">corruption type</span>
            </div>
            <button 
              onClick={() => setSearchTerm('')} 
              className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-gray-600 hover:to-gray-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              {t('home.search.clear')}
            </button>
          </div>
        )}

        {/* Contribution CTA */}
        <div className="py-20 bg-gradient-to-r from-nepal-red/5 via-nepal-blue/5 to-nepal-red/5">
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 sm:p-12 shadow-2xl border border-white/20">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-nepal-red to-red-600 rounded-full mb-6">
                  <Github className="w-10 h-10 text-white" />
                </div>
                
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                  {t('home.cta.title')}
                </h2>
                
                <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
                  {t('home.cta.description')}
                </p>
                
                {/* Social Share Section */}
                <div className="mb-8">
                  <SocialShare />
                </div>
                
                {/* Primary CTA - Google Form */}
                <div className="mb-8">
                  <a
                    href="https://forms.gle/w7jEJtD2HSrgDNcw5"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-nepal-red to-red-600 text-white px-10 py-4 rounded-2xl font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-200 inline-flex items-center justify-center text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    <AlertTriangle className="w-5 h-5 mr-3" />
                    {t('home.cta.report')}
                  </a>
                  <p className="text-sm text-gray-500 mt-3">
                    {t('home.cta.quick')}
                  </p>
                </div>

                {/* Secondary CTAs */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="/contribute"
                    className="bg-white border-2 border-gray-200 text-gray-700 px-8 py-3 rounded-xl font-semibold hover:border-nepal-red hover:text-nepal-red transition-all duration-200 inline-flex items-center justify-center shadow-lg hover:shadow-xl"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    {t('home.cta.technical')}
                  </a>
                  <a
                    href="https://github.com/najus/jhappad"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white border-2 border-gray-200 text-gray-700 px-8 py-3 rounded-xl font-semibold hover:border-nepal-red hover:text-nepal-red transition-all duration-200 inline-flex items-center justify-center shadow-lg hover:shadow-xl"
                  >
                    <Github className="w-4 h-4 mr-2" />
                    {t('home.cta.github')}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Floating Share Button */}
      <SocialShare variant="floating" />
    </div>
  )
}