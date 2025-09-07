import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Analytics } from "@vercel/analytics/next"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Jhappad.com - A Slap to Corruption in Nepal',
  description: 'A collective SLAP to corruption in Nepal. We are ordinary Nepali people uniting against corrupt politicians and their children who spend taxpayers’ money on their personal luxuries',
  keywords: ['nepal', 'corruption', 'transparency', 'accountability', 'politics', 'jhappad', 'slap'],
  authors: [{ name: 'Jhappad.com Contributors' }],
  openGraph: {
    title: 'Jhappad.com - A Slap to Corruption in Nepal',
    description: 'A collective SLAP to corruption in Nepal. We are ordinary Nepali people uniting against corrupt politicians and their children who spend taxpayers’ money on their personal luxuries',
    type: 'website',
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
        <div className="min-h-screen bg-gray-50">
          {children}
        </div>
        <Analytics />
      </body>
    </html>
  )
}