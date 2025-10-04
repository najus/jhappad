'use client'

import { useState } from 'react'
import { Share2, Facebook, Twitter, MessageCircle, Link, Check, Copy } from 'lucide-react'
import { useLanguage } from '@/contexts/LanguageContext'

interface SocialShareProps {
  url?: string
  title?: string
  description?: string
  politicianName?: string
  className?: string
  variant?: 'default' | 'compact' | 'floating'
  isMemorial?: boolean
}

export default function SocialShare({ 
  url, 
  title, 
  description,
  politicianName,
  className = "",
  variant = "default",
  isMemorial = false
}: SocialShareProps) {
  const [copied, setCopied] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const { t, language } = useLanguage()

  // Default translations based on language
  const defaultTitle = language === 'ne' 
    ? "झाप्पड.कम - नेपालमा भ्रष्टाचारलाई झाप्पड"
    : "Jhappad.com - A Slap to Corruption in Nepal"
  
  const defaultDescription = language === 'ne'
    ? "नेपालमा भ्रष्टाचारको विरुद्ध आन्दोलनमा सामेल हुनुहोस्। भ्रष्ट राजनीतिज्ञ र उनीहरूका परिवारहरूको विलासी जीवनशैली ट्र्याक गर्नुहोस्।"
    : "Join the movement against corruption in Nepal. Track corrupt politicians and their family's lavish lifestyles."

  // Use current page URL if not provided
  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '')
  
  const finalTitle = title || (politicianName 
    ? `${politicianName} - ${defaultTitle}` 
    : defaultTitle)
  const finalDescription = description || (politicianName 
    ? (language === 'ne' 
        ? `${politicianName} को भ्रष्टाचार विवरण झाप्पड.कममा हेर्नुहोस्`
        : `Check out ${politicianName}'s corruption details on Jhappad.com`)
    : defaultDescription)

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy link:', err)
    }
  }

  // Use respectful messaging for memorial content
  const shareText = isMemorial 
    ? `${finalTitle} - ${finalDescription}`
    : finalTitle

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(finalDescription)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`,
  }

  if (variant === 'floating') {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <div className="relative">
          {isOpen && (
            <div className="absolute bottom-16 right-0 bg-white rounded-lg shadow-xl border border-gray-200 p-4 min-w-[200px]">
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-gray-900 mb-2">{t('share.shareJhappad')}</h4>
                
                <a
                  href={shareLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <Facebook className="w-4 h-4" />
                  <span className="text-sm">{t('share.facebook')}</span>
                </a>
                
                <a
                  href={shareLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-blue-400 hover:text-blue-600 transition-colors"
                >
                  <Twitter className="w-4 h-4" />
                  <span className="text-sm">{t('share.twitter')}</span>
                </a>
                
                <a
                  href={shareLinks.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-green-600 hover:text-green-800 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span className="text-sm">{t('share.whatsapp')}</span>
                </a>
                
                <button
                  onClick={handleCopyLink}
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors w-full"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span className="text-sm">{copied ? t('share.copied') : t('share.copyLink')}</span>
                </button>
              </div>
            </div>
          )}
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="bg-nepal-red text-white p-3 rounded-full shadow-lg hover:bg-red-700 transition-all duration-200 hover:scale-110"
            aria-label="Share"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    )
  }

  if (variant === 'compact') {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        <span className="text-sm text-gray-600">{t('share.title').replace('{type}', politicianName ? t('share.politician') : t('share.movement'))}:</span>
        <a
          href={shareLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 transition-colors"
          aria-label="Share on Facebook"
        >
          <Facebook className="w-4 h-4" />
        </a>
        <a
          href={shareLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-600 transition-colors"
          aria-label="Share on Twitter"
        >
          <Twitter className="w-4 h-4" />
        </a>
        <a
          href={shareLinks.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-600 hover:text-green-800 transition-colors"
          aria-label="Share on WhatsApp"
        >
          <MessageCircle className="w-4 h-4" />
        </a>
        <button
          onClick={handleCopyLink}
          className="text-gray-600 hover:text-gray-800 transition-colors"
          aria-label="Copy link"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
    )
  }

  return (
    <div className={`bg-gray-50 rounded-lg p-4 ${className}`}>
      <h4 className="text-sm font-semibold text-gray-900 mb-3">{t('share.title').replace('{type}', politicianName ? t('share.politician') : t('share.movement'))}</h4>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <a
          href={shareLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          <Facebook className="w-4 h-4" />
          <span>{t('share.facebook')}</span>
        </a>
        
        <a
          href={shareLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center space-x-2 bg-blue-400 text-white px-3 py-2 rounded-md hover:bg-blue-500 transition-colors text-sm font-medium"
        >
          <Twitter className="w-4 h-4" />
          <span>{t('share.twitter')}</span>
        </a>
        
        <a
          href={shareLinks.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center space-x-2 bg-green-600 text-white px-3 py-2 rounded-md hover:bg-green-700 transition-colors text-sm font-medium"
        >
          <MessageCircle className="w-4 h-4" />
          <span>{t('share.whatsapp')}</span>
        </a>
        
        <button
          onClick={handleCopyLink}
          className="flex items-center justify-center space-x-2 bg-gray-600 text-white px-3 py-2 rounded-md hover:bg-gray-700 transition-colors text-sm font-medium"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? t('share.copied') : t('share.copyLink')}</span>
        </button>
      </div>
    </div>
  )
}
