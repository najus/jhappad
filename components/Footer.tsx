'use client'

import { Flag, Github } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <Flag className="w-6 h-6 text-nepal-red" />
              <h3 className="text-xl font-bold">{t('home.title')}</h3>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              {t('home.subtitle')}
            </p>
            <p className="text-sm text-gray-400">
              {t('footer.description')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="/"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t('nav.home')}
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t('nav.about')}
                </a>
              </li>
              <li>
                <a
                  href="/contribute"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t('nav.contribute')}
                </a>
              </li>
              <li>
                <a
                  href="/protests/sep-8"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {t('nav.protests')}
                </a>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('footer.connect')}</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://forms.gle/w7jEJtD2HSrgDNcw5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors flex items-center"
                >
                  📝 {t('nav.report')}
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/najus/jhappad"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors flex items-center"
                >
                  <Github className="w-4 h-4 mr-2" />
                  {t('nav.github')}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  )
}
