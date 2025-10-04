'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import LanguageSwitcher from './LanguageSwitcher'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { t } = useLanguage()

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-40">
      <div className="container-responsive py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="text-2xl sm:text-3xl">👋</div>
            <a href="/" className="hover:opacity-80 transition-opacity">
              <div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{t('home.title')}</h1>
                <p className="text-sm text-gray-600">{t('home.subtitle')}</p>
              </div>
            </a>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <a
              href="/"
              className="text-gray-600 hover:text-nepal-red transition-colors"
            >
              {t('nav.home')}
            </a>
            <a
              href="https://forms.gle/w7jEJtD2HSrgDNcw5"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-nepal-red text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors btn-touch"
            >
              📝 {t('nav.report')}
            </a>
            <a
              href="/protests/sep-8"
              className="bg-amber-100 text-amber-800 px-4 py-2 rounded-lg text-sm font-medium hover:bg-amber-200 transition-colors border border-amber-300"
            >
              🚨 {t('nav.protests')}
            </a>
            <a
              href="/memorial"
              className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors border border-gray-300"
            >
              🕯️ Memorial
            </a>
            <LanguageSwitcher />
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-gray-600 hover:text-nepal-red transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-gray-200">
            <div className="flex flex-col space-y-3 pt-4">
              <a
                href="/"
                className="text-gray-600 hover:text-nepal-red transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('nav.home')}
              </a>
              <a
                href="https://forms.gle/w7jEJtD2HSrgDNcw5"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-nepal-red text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 transition-colors text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                📝 {t('nav.report')}
              </a>
              <a
                href="/protests/sep-8"
                className="bg-amber-100 text-amber-800 px-4 py-2 rounded-md text-sm font-medium hover:bg-amber-200 transition-colors text-center border border-amber-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                🚨 {t('nav.protests')}
              </a>
              <a
                href="/memorial"
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors text-center border border-gray-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                🕯️ Memorial
              </a>
              {/* Language Switcher - More prominent in mobile */}
              <div className="py-2 border-t border-gray-200 mt-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Language / भाषा:</span>
                  <LanguageSwitcher />
                </div>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}