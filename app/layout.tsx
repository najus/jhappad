import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Jhappad.com - A Slap to Corruption in Nepal',
  description: 'A collective slap to corruption in Nepal. We are ordinary Nepali people uniting against corrupt politicians and their children.',
  keywords: ['nepal', 'corruption', 'transparency', 'accountability', 'politics', 'jhappad', 'slap'],
  authors: [{ name: 'Jhappad.com Contributors' }],
  openGraph: {
    title: 'Jhappad.com - A Slap to Corruption in Nepal',
    description: 'A collective slap to corruption in Nepal. We are ordinary Nepali people uniting against corrupt politicians and their children.',
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
      </body>
    </html>
  )
}