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
  jawafdehi?: JawafdehiBlock
  _draft?: string
}

/** Case data synced from Jawafdehi (api.jawafdehi.org), CC BY-NC 4.0. */
export interface JawafdehiBlock {
  entityIri: string
  nameEn: string
  nameNe?: string | null
  photoCredit?: string | null
  caseCount: number
  totalBigoNpr: number
  cases: JawafdehiCase[]
  attribution: string
  syncedAt: string
}

export interface JawafdehiCase {
  slug: string
  title: string
  url: string
  caseType?: string | null
  status?: string | null
  bigoNpr?: number | null
  bigoFormatted?: string | null
  role?: string | null
  outcome?: string | null
  keyAllegations: string[]
  latestDevelopment?: { date: string; dateBs?: string; title: string } | null
  courtCases: string[]
  caseUpdatedAt?: string | null
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