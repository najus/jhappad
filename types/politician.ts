export interface Politician {
  id: string
  name: string
  position: string
  party: string
  photo?: string
  estimatedWealth?: string
  corruptionAllegations?: string[]
  children: Child[]
  lastUpdated: string
  sources?: string[]
}

export interface Child {
  name: string
  relationship: 'son' | 'daughter' | 'adopted_son' | 'adopted_daughter'
  age: number
  photo?: string
  education?: {
    institution?: string
    degree?: string
    country?: string
    cost?: string
  }
  lifestyle?: {
    luxuryItems?: string[]
    recentSplurges?: RecentSplurge[]
    socialMedia?: {
      instagram?: string
      facebook?: string
      tiktok?: string
    }
  }
  businessInterests?: BusinessInterest[]
  sources?: string[]
}

export interface RecentSplurge {
  item: string
  cost: string
  date: string
  source?: string
}

export interface BusinessInterest {
  company: string
  position?: string
  ownership?: string
}