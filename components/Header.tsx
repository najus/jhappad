'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import LanguageSwitcher from './LanguageSwitcher'
import { useLanguage } from '@/contexts/LanguageContext'

const navLink = 'text-sm text-ink/70 hover:text-nepal-red underline-offset-4 hover:underline decoration-nepal-red transition-colors'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { t } = useLanguage()

  return (
    <header className="bg-paper sticky top-0 z-40 border-b border-ink">
      {/* Flag rule */}
      <div className="h-1 bg-gradient-to-r from-nepal-blue via-nepal-red to-nepal-blue" />
      <div className="container-responsive">
        <div className="flex items-end justify-between py-3 gap-4">
          <a href="/" className="hover:opacity-80 transition-opacity min-w-0">
            <div className="font-display font-black text-3xl sm:text-4xl leading-none tracking-tight text-ink">
              Jhappad<span className="text-nepal-red">.</span>
            </div>
            <p className="text-[11px] sm:text-xs uppercase tracking-[0.18em] text-ink/60 mt-1">{t('home.subtitle')}</p>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 pb-1">
            <a href="/" className={navLink}>{t('nav.home')}</a>
            <a href="/protests/sep-8" className={navLink}>{t('nav.protests')}</a>
            <a href="/memorial" className={navLink}>Memorial</a>
            <a href="/about" className={navLink}>{t('nav.about')}</a>
            <a
              href="https://forms.gle/w7jEJtD2HSrgDNcw5"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-nepal-red underline underline-offset-4 hover:text-red-800 transition-colors"
            >
              {t('nav.report')}
            </a>
            <LanguageSwitcher />
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-ink hover:text-nepal-red transition-colors pb-1"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden border-t border-hairline">
            <div className="flex flex-col py-2">
              <a href="/" className="py-2.5 text-ink/80 hover:text-nepal-red border-b border-hairline/60" onClick={() => setIsMobileMenuOpen(false)}>{t('nav.home')}</a>
              <a href="/protests/sep-8" className="py-2.5 text-ink/80 hover:text-nepal-red border-b border-hairline/60" onClick={() => setIsMobileMenuOpen(false)}>{t('nav.protests')}</a>
              <a href="/memorial" className="py-2.5 text-ink/80 hover:text-nepal-red border-b border-hairline/60" onClick={() => setIsMobileMenuOpen(false)}>Memorial</a>
              <a href="/about" className="py-2.5 text-ink/80 hover:text-nepal-red border-b border-hairline/60" onClick={() => setIsMobileMenuOpen(false)}>{t('nav.about')}</a>
              <a
                href="https://forms.gle/w7jEJtD2HSrgDNcw5"
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 font-semibold text-nepal-red"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('nav.report')}
              </a>
              <div className="py-2.5 border-t border-hairline/60 flex items-center justify-between">
                <span className="text-sm text-ink/60">Language / भाषा:</span>
                <LanguageSwitcher />
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
