'use client'

import { useState } from 'react'
import { Flag, Github, Menu, X } from 'lucide-react'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Flag className="w-6 h-6 sm:w-8 sm:h-8 text-nepal-red" />
            <a href="/" className="hover:opacity-80 transition-opacity">
              <div>
              <h1 className="text-lg sm:text-xl font-bold text-gray-900">Jhappad.com</h1>
                <p className="text-xs sm:text-sm text-gray-600">A Slap to Corruption</p>
              </div>
            </a>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            <a
              href="/"
              className="text-gray-600 hover:text-nepal-red transition-colors"
            >
              Home
            </a>
            <a
              href="https://forms.gle/w7jEJtD2HSrgDNcw5"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-nepal-red text-white px-3 py-1 rounded-md text-sm font-medium hover:bg-red-700 transition-colors"
            >
              📝 Share Info
            </a>
            <a
              href="/contribute"
              className="text-gray-600 hover:text-nepal-red transition-colors"
            >
              Contribute
            </a>
            <a
              href="/about"
              className="text-gray-600 hover:text-nepal-red transition-colors"
            >
              About
            </a>
            <a
              href="https://github.com/najus/jhappad"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-nepal-red transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
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
                Home
              </a>
              <a
                href="https://forms.gle/w7jEJtD2HSrgDNcw5"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-nepal-red text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 transition-colors text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                📝 Share Corruption Info
              </a>
              <a
                href="/contribute"
                className="text-gray-600 hover:text-nepal-red transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Technical Contribution Guide
              </a>
              <a
                href="/about"
                className="text-gray-600 hover:text-nepal-red transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </a>
              <a
                href="https://github.com/najus/jhappad"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-nepal-red transition-colors py-2 flex items-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Github className="w-5 h-5 mr-2" />
                GitHub
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}