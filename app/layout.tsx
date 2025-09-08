import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Analytics } from "@vercel/analytics/next"
import { LanguageProvider } from '@/contexts/LanguageContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Jhappad.com - A Slap to Corruption in Nepal',
  description: 'A collective SLAP to corruption in Nepal. We are ordinary Nepali people uniting against corrupt politicians and their children who spend taxpayers money on their personal luxuries',
  keywords: ['nepal', 'corruption', 'transparency', 'accountability', 'politics', 'jhappad', 'slap'],
  authors: [{ name: 'Jhappad.com Contributors' }],
  openGraph: {
    title: 'Jhappad.com - A Slap to Corruption in Nepal',
    description: 'A collective SLAP to corruption in Nepal. We are ordinary Nepali people uniting against corrupt politicians and their children who spend taxpayers money on their personal luxuries',
    type: 'website',
    url: 'https://jhappad.com',
    siteName: 'Jhappad.com',
    images: [
      {
        url: 'https://via.placeholder.com/1200x630/DC143C/FFFFFF?text=Jhappad.com+-+A+Slap+to+Corruption+in+Nepal',
        width: 1200,
        height: 630,
        alt: 'Jhappad.com - A Slap to Corruption in Nepal',
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jhappad.com - A Slap to Corruption in Nepal',
    description: 'A collective SLAP to corruption in Nepal. We are ordinary Nepali people uniting against corrupt politicians and their children who spend taxpayers money on their personal luxuries',
    images: ['https://via.placeholder.com/1200x630/DC143C/FFFFFF?text=Jhappad.com+-+A+Slap+to+Corruption+in+Nepal'],
    creator: '@jhappad',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LanguageProvider>
          <div className="min-h-screen bg-gray-50">
            {children}
          </div>
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  )
}