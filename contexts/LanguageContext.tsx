'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type Language = 'en' | 'ne'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key: string) => key
})

// Translation data
const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.contribute': 'Contribute',
    'nav.report': 'Report Corruption',
    'nav.github': 'GitHub',
    
    // Homepage
    'home.title': 'Jhappad.com',
    'home.subtitle': 'A Slap to Corruption',
    'home.description': 'A collective SLAP to corruption in Nepal. We are ordinary Nepali people uniting against corrupt politicians and their children.',
    'home.stats.politicians': 'Politicians Tracked',
    'home.stats.children': 'Children Documented',
    'home.stats.wealth': 'Wealth Exposed',
    'home.search.placeholder': 'Search politicians, parties, positions...',
    'home.search.found': 'Found {count} of {total} politicians',
    'home.search.noResults': 'No politicians found matching your search',
    'home.search.trySearching': 'Try searching for:',
    'home.search.clear': 'Clear Search',
    'home.cta.title': 'Join the JHAPPAD Movement',
    'home.cta.description': 'Help us deliver the biggest SLAP to corruption! Share information about corrupt politicians and their children anonymously.',
    'home.cta.report': 'Report Corruption Anonymously',
    'home.cta.quick': 'Quick & Easy • No Technical Skills Required • 100% Anonymous',
    'home.cta.technical': 'Technical Contribution Guide',
    'home.cta.github': 'View on GitHub',
    
    // Politician Card
    'politician.children': 'children',
    'politician.allegations': 'Corruption Allegations:',
    'politician.showMore': 'more allegations (tap to expand)',
    'politician.showLess': 'Show less',
    'politician.viewDetails': 'View Children Details',
    'politician.hideDetails': 'Hide Children Details',
    'politician.sources': 'Sources:',
    'politician.lastUpdated': 'Last updated:',
    
    // Social Share
    'share.title': 'Share this {type}',
    'share.politician': 'politician',
    'share.movement': 'movement',
    'share.facebook': 'Facebook',
    'share.twitter': 'Twitter',
    'share.whatsapp': 'WhatsApp',
    'share.copyLink': 'Copy Link',
    'share.copied': 'Copied!',
    'share.shareJhappad': 'Share Jhappad.com',
    'share.shareJhappad.desc': 'Share Jhappad.com - A Slap to Corruption in Nepal',
    
    // About Page
    'about.title': 'About Jhappad.com',
    'about.mission.title': 'Our Mission',
    'about.mission.description': 'Jhappad.com is more than just a website - it\'s a movement. We believe that when politicians\' children flaunt luxury lifestyles that far exceed their family\'s declared income, it\'s time for a collective SLAP to corruption.',
    'about.mission.description2': 'Our mission is to expose the hypocrisy of corrupt politicians by documenting their children\'s extravagant lifestyles, expensive education abroad, and business interests that don\'t add up to their declared wealth.',
    'about.why.title': 'Why "Jhappad"?',
    'about.why.description': '"Jhappad" means "slap" in Nepali. This platform is our collective slap to:',
    'about.why.corrupt': 'Corrupt Politicians',
    'about.why.corrupt.desc': 'Who steal from the people and live like kings while citizens suffer',
    'about.why.hypocrisy': 'Hypocrisy',
    'about.why.hypocrisy.desc': 'Of claiming to serve the people while their children flaunt impossible wealth',
    'about.why.injustice': 'Injustice',
    'about.why.injustice.desc': 'Where honest people struggle while corrupt families prosper',
    'about.why.silence': 'Silence',
    'about.why.silence.desc': 'That allows corruption to continue unchecked in our society',
    
    // Common
    'common.loading': 'Loading...',
    'common.retry': 'Retry',
    'common.error': 'Error',
    'common.success': 'Success',
  },
  ne: {
    // Navigation
    'nav.home': 'गृहपृष्ठ',
    'nav.about': 'हाम्रो बारेमा',
    'nav.contribute': 'योगदान',
    'nav.report': 'भ्रष्टाचार रिपोर्ट',
    'nav.github': 'गिटहब',
    
    // Homepage
    'home.title': 'झाप्पड.कम',
    'home.subtitle': 'भ्रष्टाचारलाई झाप्पड',
    'home.description': 'नेपालमा भ्रष्टाचारलाई सामूहिक झाप्पड। हामी सामान्य नेपाली हौं जो भ्रष्ट राजनीतिज्ञ र उनीहरूका सन्तानहरूको विरुद्ध एकजुट भएका छौं।',
    'home.stats.politicians': 'राजनीतिज्ञ ट्र्याक',
    'home.stats.children': 'सन्तान दस्तावेज',
    'home.stats.wealth': 'सम्पत्ति उजागर',
    'home.search.placeholder': 'राजनीतिज्ञ, दल, पद खोज्नुहोस्...',
    'home.search.found': '{total} मध्ये {count} राजनीतिज्ञ फेला पर्यो',
    'home.search.noResults': 'तपाईंको खोजीसँग मेल खाने राजनीतिज्ञ फेला परेन',
    'home.search.trySearching': 'यसरी खोज्नुहोस्:',
    'home.search.clear': 'खोज खाली गर्नुहोस्',
    'home.cta.title': 'झाप्पड आन्दोलनमा सामेल हुनुहोस्',
    'home.cta.description': 'भ्रष्टाचारलाई सबैभन्दा ठूलो झाप्पड दिन मद्दत गर्नुहोस्! भ्रष्ट राजनीतिज्ञ र उनीहरूका सन्तानहरूको बारेमा जानकारी गुमनाम रूपमा साझा गर्नुहोस्।',
    'home.cta.report': 'गुमनाम रूपमा भ्रष्टाचार रिपोर्ट',
    'home.cta.quick': 'छिटो र सजिलो • तकनीकी कौशल आवश्यक छैन • १००% गुमनाम',
    'home.cta.technical': 'तकनीकी योगदान गाइड',
    'home.cta.github': 'गिटहबमा हेर्नुहोस्',
    
    // Politician Card
    'politician.children': 'सन्तान',
    'politician.allegations': 'भ्रष्टाचार आरोप:',
    'politician.showMore': 'अधिक आरोप (विस्तार गर्न ट्याप गर्नुहोस्)',
    'politician.showLess': 'कम देखाउनुहोस्',
    'politician.viewDetails': 'सन्तानको विवरण हेर्नुहोस्',
    'politician.hideDetails': 'विवरण लुकाउनुहोस्',
    'politician.sources': 'स्रोत:',
    'politician.lastUpdated': 'अन्तिम अपडेट:',
    
    // Social Share
    'share.title': 'यो {type} साझा गर्नुहोस्',
    'share.politician': 'राजनीतिज्ञ',
    'share.movement': 'आन्दोलन',
    'share.facebook': 'फेसबुक',
    'share.twitter': 'ट्विटर',
    'share.whatsapp': 'व्हाट्सएप',
    'share.copyLink': 'लिङ्क कपी गर्नुहोस्',
    'share.copied': 'कपी भयो!',
    'share.shareJhappad': 'झाप्पड.कम साझा गर्नुहोस्',
    'share.shareJhappad.desc': 'झाप्पड.कम - नेपालमा भ्रष्टाचारलाई झाप्पड',
    // About Page
    'about.title': 'झाप्पड.कमको बारेमा',
    'about.mission.title': 'हाम्रो मिशन',
    'about.mission.description': 'झाप्पड.कम केवल वेबसाइट मात्र होइन - यो आन्दोलन हो। हामी मान्छौं कि जब राजनीतिज्ञका सन्तानहरूले आफ्नो परिवारको घोषित आम्दानीभन्दा धेरै बढी विलासी जीवनशैली प्रदर्शन गर्छन्, यो भ्रष्टाचारलाई सामूहिक झाप्पड दिने समय हो।',
    'about.mission.description2': 'हाम्रो मिशन भ्रष्ट राजनीतिज्ञहरूको पाखण्डलाई उनीहरूका सन्तानहरूको विलासी जीवनशैली, विदेशमा महँगो शिक्षा, र आफ्नो घोषित सम्पत्तिसँग मेल नखाने व्यापारिक हितहरूको दस्तावेजीकरण गरेर उजागर गर्नु हो।',
    'about.why.title': '"झाप्पड" किन?',
    'about.why.description': '"झाप्पड" को अर्थ नेपालीमा "थप्पड" हो। यो प्लेटफर्म हाम्रो सामूहिक थप्पड हो:',
    'about.why.corrupt': 'भ्रष्ट राजनीतिज्ञ',
    'about.why.corrupt.desc': 'जसले जनताको पैसा चोरी गरेर राजा जस्तो बस्छन् र नागरिकहरू कष्ट झेल्छन्',
    'about.why.hypocrisy': 'पाखण्ड',
    'about.why.hypocrisy.desc': 'जनताको सेवा गर्ने दाबी गर्ने र उनीहरूका सन्तानहरूले असम्भव सम्पत्ति प्रदर्शन गर्ने',
    'about.why.injustice': 'अन्याय',
    'about.why.injustice.desc': 'जहाँ ईमानदार व्यक्तिहरू संघर्ष गर्छन् र भ्रष्ट परिवारहरू समृद्ध हुन्छन्',
    'about.why.silence': 'मौनता',
    'about.why.silence.desc': 'जसले हाम्रो समाजमा भ्रष्टाचारलाई निरन्तर जारी रहन दिन्छ',
    
    // Common
    'common.loading': 'लोड हुँदैछ...',
    'common.retry': 'पुनः प्रयास',
    'common.error': 'त्रुटि',
    'common.success': 'सफलता',
  }
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Load language from localStorage or detect from browser
    try {
      const savedLanguage = localStorage.getItem('language') as Language
      if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'ne')) {
        setLanguage(savedLanguage)
      } else {
        // Detect browser language
        const browserLang = navigator.language.split('-')[0]
        setLanguage(browserLang === 'ne' ? 'ne' : 'en')
      }
    } catch (error) {
      console.error('Error loading language preference:', error)
      setLanguage('en')
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    try {
      localStorage.setItem('language', lang)
    } catch (error) {
      console.error('Error saving language preference:', error)
    }
  }

  const t = (key: string): string => {
    try {
      const currentTranslations = mounted ? translations[language] : translations['en']
      
      // Check if the key exists directly in the translations object
      if (currentTranslations && (currentTranslations as any)[key]) {
        return (currentTranslations as any)[key]
      }
      
      return key
    } catch (error) {
      console.error('Translation error:', error, key)
      return key
    }
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  return context
}
