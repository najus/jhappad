'use client'

import { Flag, Users, Shield, Heart, Target, Globe } from 'lucide-react'
import Header from '@/components/Header'
import SocialShare from '@/components/SocialShare'

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            About Jhappad.com
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            A collective slap to corruption in Nepal. We are ordinary Nepali people 
            uniting against the corrupt practices that plague our nation.
          </p>
        </div>

        {/* Mission Section */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="card">
            <div className="flex items-center mb-6">
              <Target className="w-8 h-8 text-nepal-red mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Our Mission</h2>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              <strong>Jhappad.com</strong> is more than just a website - it's a movement. 
              We believe that when politicians' children flaunt luxury lifestyles that 
              far exceed their family's declared income, it's time for a collective 
              <span className="text-nepal-red font-bold"> SLAP</span> to corruption.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              Our mission is to expose the hypocrisy of corrupt politicians by documenting 
              their children's extravagant lifestyles, expensive education abroad, and 
              business interests that don't add up to their declared wealth.
            </p>
          </div>
        </div>

        {/* Who We Are */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="card">
            <div className="flex items-center mb-6">
              <Users className="w-8 h-8 text-nepal-blue mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Who We Are</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">We are ordinary Nepali people:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center">
                    <Heart className="w-4 h-4 text-red-500 mr-2" />
                    Concerned citizens tired of corruption
                  </li>
                  <li className="flex items-center">
                    <Heart className="w-4 h-4 text-red-500 mr-2" />
                    Students who see peers with impossible wealth
                  </li>
                  <li className="flex items-center">
                    <Heart className="w-4 h-4 text-red-500 mr-2" />
                    Parents struggling while politicians' kids live lavishly
                  </li>
                  <li className="flex items-center">
                    <Heart className="w-4 h-4 text-red-500 mr-2" />
                    Taxpayers demanding accountability
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">We are united by:</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center">
                    <Shield className="w-4 h-4 text-blue-500 mr-2" />
                    Love for our country Nepal
                  </li>
                  <li className="flex items-center">
                    <Shield className="w-4 h-4 text-blue-500 mr-2" />
                    Desire for transparent governance
                  </li>
                  <li className="flex items-center">
                    <Shield className="w-4 h-4 text-blue-500 mr-2" />
                    Belief in justice and fairness
                  </li>
                  <li className="flex items-center">
                    <Shield className="w-4 h-4 text-blue-500 mr-2" />
                    Hope for a better future
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Why Jhappad */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="card">
            <div className="flex items-center mb-6">
              <Flag className="w-8 h-8 text-nepal-red mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Why "Jhappad"?</h2>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              <strong>"Jhappad"</strong> means "slap" in Nepali. This platform is our 
              collective slap to:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-red-50 p-4 rounded-lg">
                <h4 className="font-semibold text-red-800 mb-2">Corrupt Politicians</h4>
                <p className="text-red-700 text-sm">
                  Who steal from the people and live like kings while citizens suffer
                </p>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <h4 className="font-semibold text-red-800 mb-2">Hypocrisy</h4>
                <p className="text-red-700 text-sm">
                  Of claiming to serve the people while their children flaunt impossible wealth
                </p>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <h4 className="font-semibold text-red-800 mb-2">Injustice</h4>
                <p className="text-red-700 text-sm">
                  Where honest people struggle while corrupt families prosper
                </p>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <h4 className="font-semibold text-red-800 mb-2">Silence</h4>
                <p className="text-red-700 text-sm">
                  That allows corruption to continue unchecked in our society
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Our Approach */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="card">
            <div className="flex items-center mb-6">
              <Globe className="w-8 h-8 text-nepal-blue mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">Our Approach</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="bg-nepal-red text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</div>
                <div>
                  <h4 className="font-semibold text-gray-900">Document Everything</h4>
                  <p className="text-gray-700">
                    We collect and verify information about politicians' children's lifestyles, 
                    education, and business interests from credible sources.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-nepal-red text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</div>
                <div>
                  <h4 className="font-semibold text-gray-900">Source Everything</h4>
                  <p className="text-gray-700">
                    Every piece of information is backed by credible sources - news articles, 
                    social media posts, business registries, and official documents.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-nepal-red text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</div>
                <div>
                  <h4 className="font-semibold text-gray-900">Expose Hypocrisy</h4>
                  <p className="text-gray-700">
                    We highlight the disconnect between declared family income and the 
                    extravagant lifestyles of politicians' children.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-nepal-red text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">4</div>
                <div>
                  <h4 className="font-semibold text-gray-900">Demand Accountability</h4>
                  <p className="text-gray-700">
                    We call for transparency, proper investigation, and accountability 
                    from our elected representatives.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="max-w-4xl mx-auto text-center">
          <div className="card bg-gradient-to-r from-nepal-red to-nepal-blue text-white">
            <h2 className="text-2xl font-bold mb-4">Join the Movement</h2>
            <p className="text-lg mb-6 opacity-90">
              Together, we can deliver the biggest <strong>JHAPPAD</strong> to corruption 
              that Nepal has ever seen. Every contribution matters.
            </p>
            <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
              <a
                href="https://forms.gle/w7jEJtD2HSrgDNcw5"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-nepal-red px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block w-full sm:w-auto"
              >
                📝 Report Corruption Anonymously
              </a>
              <a
                href="/contribute"
                className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-nepal-red transition-colors inline-block w-full sm:w-auto"
              >
                Technical Contribution
              </a>
            </div>
            <p className="text-sm mt-4 opacity-75">
              Report corruption anonymously or contribute technically - both ways help expose corruption!
            </p>
          </div>
        </div>
      </main>
      
      {/* Floating Share Button */}
      <SocialShare variant="floating" />
    </div>
  )
}
