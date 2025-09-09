'use client'

import { Flag, Users, Shield, Heart, Target, Globe } from 'lucide-react'
import Header from '@/components/Header'
import SocialShare from '@/components/SocialShare'
import { useLanguage } from '@/contexts/LanguageContext'

export default function About() {
  const { t } = useLanguage()
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('about.title')}
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            {t('home.description')}
          </p>
        </div>

        {/* Mission Section */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="card">
            <div className="flex items-center mb-6">
              <Target className="w-8 h-8 text-nepal-red mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">{t('about.mission.title')}</h2>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              <strong>Jhappad.com</strong> {t('about.mission.description').replace('Jhappad.com is more than just a website - it\'s a movement. ', '')}
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              {t('about.mission.description2')}
            </p>
          </div>
        </div>

        {/* Who We Are */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="card">
            <div className="flex items-center mb-6">
              <Users className="w-8 h-8 text-nepal-blue mr-3" />
              <h2 className="text-2xl font-bold text-gray-900">{t('about.who.title')}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('about.who.ordinary')}</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center">
                    <Heart className="w-4 h-4 text-red-500 mr-2" />
                    {t('about.who.concerned')}
                  </li>
                  <li className="flex items-center">
                    <Heart className="w-4 h-4 text-red-500 mr-2" />
                    {t('about.who.students')}
                  </li>
                  <li className="flex items-center">
                    <Heart className="w-4 h-4 text-red-500 mr-2" />
                    {t('about.who.parents')}
                  </li>
                  <li className="flex items-center">
                    <Heart className="w-4 h-4 text-red-500 mr-2" />
                    {t('about.who.taxpayers')}
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('about.who.united')}</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center">
                    <Shield className="w-4 h-4 text-blue-500 mr-2" />
                    {t('about.who.love')}
                  </li>
                  <li className="flex items-center">
                    <Shield className="w-4 h-4 text-blue-500 mr-2" />
                    {t('about.who.transparency')}
                  </li>
                  <li className="flex items-center">
                    <Shield className="w-4 h-4 text-blue-500 mr-2" />
                    {t('about.who.justice')}
                  </li>
                  <li className="flex items-center">
                    <Shield className="w-4 h-4 text-blue-500 mr-2" />
                    {t('about.who.hope')}
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
              <h2 className="text-2xl font-bold text-gray-900">{t('about.why.title')}</h2>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              {t('about.why.description')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-red-50 p-4 rounded-lg">
                <h4 className="font-semibold text-red-800 mb-2">{t('about.why.corrupt')}</h4>
                <p className="text-red-700 text-sm">
                  {t('about.why.corrupt.desc')}
                </p>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <h4 className="font-semibold text-red-800 mb-2">{t('about.why.hypocrisy')}</h4>
                <p className="text-red-700 text-sm">
                  {t('about.why.hypocrisy.desc')}
                </p>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <h4 className="font-semibold text-red-800 mb-2">{t('about.why.injustice')}</h4>
                <p className="text-red-700 text-sm">
                  {t('about.why.injustice.desc')}
                </p>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <h4 className="font-semibold text-red-800 mb-2">{t('about.why.silence')}</h4>
                <p className="text-red-700 text-sm">
                  {t('about.why.silence.desc')}
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
              <h2 className="text-2xl font-bold text-gray-900">{t('about.approach.title')}</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="bg-nepal-red text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</div>
                <div>
                  <h4 className="font-semibold text-gray-900">{t('about.approach.step1')}</h4>
                  <p className="text-gray-700">
                    {t('about.approach.step1.desc')}
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-nepal-red text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</div>
                <div>
                  <h4 className="font-semibold text-gray-900">{t('about.approach.step2')}</h4>
                  <p className="text-gray-700">
                    {t('about.approach.step2.desc')}
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-nepal-red text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</div>
                <div>
                  <h4 className="font-semibold text-gray-900">{t('about.approach.step3')}</h4>
                  <p className="text-gray-700">
                    {t('about.approach.step3.desc')}
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="bg-nepal-red text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">4</div>
                <div>
                  <h4 className="font-semibold text-gray-900">{t('about.approach.step4')}</h4>
                  <p className="text-gray-700">
                    {t('about.approach.step4.desc')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="max-w-4xl mx-auto text-center">
          <div className="card bg-gradient-to-r from-nepal-red to-nepal-blue text-white">
            <h2 className="text-2xl font-bold mb-4">{t('about.cta.title')}</h2>
            <p className="text-lg mb-6 opacity-90">
              {t('about.cta.description')}
            </p>
            <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
              <a
                href="https://forms.gle/w7jEJtD2HSrgDNcw5"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-nepal-red px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block w-full sm:w-auto"
              >
                📝 {t('about.cta.report')}
              </a>
              <a
                href="/contribute"
                className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-nepal-red transition-colors inline-block w-full sm:w-auto"
              >
                {t('about.cta.technical')}
              </a>
            </div>
            <p className="text-sm mt-4 opacity-75">
              {t('about.cta.footer')}
            </p>
          </div>
        </div>
      </main>
      
      {/* Floating Share Button */}
      <SocialShare variant="floating" />
    </div>
  )
}
