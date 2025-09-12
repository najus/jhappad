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
    'nav.protests': 'Sep 8 Protests',
    'nav.github': 'GitHub',
    
    // Homepage
    'home.title': 'Jhappad.com',
    'home.subtitle': 'A Slap to Corruption',
    'home.description': 'A collective SLAP to corruption in Nepal. We are ordinary Nepali people uniting against corrupt politicians and their children.',
    'home.stats.politicians': 'Politicians Tracked',
    'home.stats.children': 'Family Members Documented',
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
    'politician.children': 'Family',
    'politician.allegations': 'Corruption Allegations:',
    'politician.showMore': 'more allegations (tap to expand)',
    'politician.showLess': 'Show less',
    'politician.viewDetails': 'View Family Details',
    'politician.hideDetails': 'Hide Family Details',
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
    'about.who.title': 'Who We Are',
    'about.who.ordinary': 'We are ordinary Nepali people:',
    'about.who.concerned': 'Concerned citizens tired of corruption',
    'about.who.students': 'Students who see peers with impossible wealth',
    'about.who.parents': 'Parents struggling while politicians\' kids live lavishly',
    'about.who.taxpayers': 'Taxpayers demanding accountability',
    'about.who.united': 'We are united by:',
    'about.who.love': 'Love for our country Nepal',
    'about.who.transparency': 'Desire for transparent governance',
    'about.who.justice': 'Belief in justice and fairness',
    'about.who.hope': 'Hope for a better future',
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
    'about.approach.title': 'Our Approach',
    'about.approach.step1': 'Document Everything',
    'about.approach.step1.desc': 'We collect and verify information about politicians\' children\'s lifestyles, education, and business interests from credible sources.',
    'about.approach.step2': 'Source Everything',
    'about.approach.step2.desc': 'Every piece of information is backed by credible sources - news articles, social media posts, business registries, and official documents.',
    'about.approach.step3': 'Expose Hypocrisy',
    'about.approach.step3.desc': 'We highlight the disconnect between declared family income and the extravagant lifestyles of politicians\' children.',
    'about.approach.step4': 'Demand Accountability',
    'about.approach.step4.desc': 'We call for transparency, proper investigation, and accountability from our elected representatives.',
    'about.cta.title': 'Join the Movement',
    'about.cta.description': 'Together, we can deliver the biggest JHAPPAD to corruption that Nepal has ever seen. Every contribution matters.',
    'about.cta.report': 'Report Corruption Anonymously',
    'about.cta.technical': 'Technical Contribution',
    'about.cta.footer': 'Report corruption anonymously or contribute technically - both ways help expose corruption!',
    
    // Contribute Page
    'contribute.title': 'Contribute to Jhappad.com',
    'contribute.description': 'Help us deliver the biggest SLAP to corruption by contributing information about corrupt politicians and their children.',
    'contribute.cta.report': 'Report Corruption Info',
    'contribute.cta.quick': 'Quick & Easy • No Technical Skills Required • 100% Anonymous',
    'contribute.easy.title': 'Easy Way',
    'contribute.easy.subtitle': 'For everyone - no technical skills needed',
    'contribute.easy.step1': 'Click the form button above',
    'contribute.easy.step2': 'Fill out the form with corruption information',
    'contribute.easy.step3': 'Submit anonymously - we\'ll add it to the website',
    'contribute.easy.button': 'Open Form',
    'contribute.technical.title': 'Technical Way',
    'contribute.technical.subtitle': 'For developers and technical users',
    'contribute.technical.step1': 'Fork the repository on GitHub',
    'contribute.technical.step2': 'Add politician data to the JSON file',
    'contribute.technical.step3': 'Create a pull request for review',
    'contribute.technical.button': 'View on GitHub',
    'contribute.info.title': 'What Information to Contribute',
    'contribute.info.politician': 'Politician Information',
    'contribute.info.politician.name': 'Full name and current position',
    'contribute.info.politician.party': 'Political party affiliation',
    'contribute.info.politician.allegations': 'Corruption allegations with sources',
    'contribute.info.politician.wealth': 'Estimated family wealth',
    'contribute.info.children': 'Children Information',
    'contribute.info.children.details': 'Name, age, and relationship',
    'contribute.info.children.education': 'Expensive education abroad',
    'contribute.info.children.luxury': 'Luxury items and recent purchases',
    'contribute.info.children.business': 'Business interests and ownership',
    'contribute.sources.title': 'Source Requirements',
    'contribute.sources.acceptable': 'Acceptable Sources',
    'contribute.sources.acceptable.news': 'News articles from reputable media',
    'contribute.sources.acceptable.documents': 'Official government documents',
    'contribute.sources.acceptable.registry': 'Public business registry records',
    'contribute.sources.acceptable.social': 'Social media posts (with screenshots)',
    'contribute.sources.acceptable.court': 'Court documents and legal filings',
    'contribute.sources.acceptable.research': 'Academic research and reports',
    'contribute.sources.unacceptable': 'Unacceptable Sources',
    'contribute.sources.unacceptable.rumors': 'Unverified rumors or hearsay',
    'contribute.sources.unacceptable.blogs': 'Personal blogs without credibility',
    'contribute.sources.unacceptable.anonymous': 'Anonymous social media accounts',
    'contribute.sources.unacceptable.speculation': 'Speculation without evidence',
    'contribute.sources.unacceptable.private': 'Private or confidential information',
    'contribute.sources.unacceptable.opinions': 'Personal opinions without facts',
    'contribute.guide.title': 'Step-by-Step Contribution Guide',
    'contribute.guide.step1.title': 'Step 1: Fork the Repository',
    'contribute.guide.step1.desc': 'Go to our GitHub repository and click the "Fork" button.',
    'contribute.guide.step2.title': 'Step 2: Create a Branch',
    'contribute.guide.step2.desc': 'Create a new branch for your contribution:',
    'contribute.guide.step3.title': 'Step 3: Add Your Data',
    'contribute.guide.step3.desc': 'Edit the file public/data/politicians.json and add your politician information following the schema.',
    'contribute.guide.step3.tip': 'Tip: Check the existing entries for reference and ensure all required fields are filled.',
    'contribute.guide.step4.title': 'Step 4: Validate Your Data',
    'contribute.guide.step4.desc': 'Run the validation script to check your data:',
    'contribute.guide.step5.title': 'Step 5: Submit Pull Request',
    'contribute.guide.step5.desc': 'Commit your changes and create a pull request:',
    'contribute.format.title': 'Data Format Example',
    'contribute.cta.final.title': 'Ready to Deliver a JHAPPAD?',
    'contribute.cta.final.description': 'Every piece of information helps us expose corruption. Join the movement and help us hold corrupt politicians accountable.',
    'contribute.cta.final.start': 'Start Contributing',
    'contribute.cta.final.learn': 'Learn More',
    
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
    'nav.protests': 'सेप्टेम्बर ८ आन्दोलन',
    'nav.github': 'गिटहब',
    
    // Homepage
    'home.title': 'झाप्पड.कम',
    'home.subtitle': 'भ्रष्टाचारलाई झाप्पड',
    'home.description': 'नेपालमा भ्रष्टाचारलाई सामूहिक झाप्पड। हामी सामान्य नेपाली हौं जो भ्रष्ट राजनीतिज्ञ र उनीहरूका सन्तानहरूको विरुद्ध एकजुट भएका छौं।',
    'home.stats.politicians': 'राजनीतिज्ञ ट्र्याक',
    'home.stats.children': 'परिवार सदस्य दस्तावेज',
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
    'politician.children': 'परिवार',
    'politician.allegations': 'भ्रष्टाचार आरोप:',
    'politician.showMore': 'अधिक आरोप (विस्तार गर्न ट्याप गर्नुहोस्)',
    'politician.showLess': 'कम देखाउनुहोस्',
    'politician.viewDetails': 'परिवारको विवरण हेर्नुहोस्',
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
    'about.who.title': 'हामी को हौं',
    'about.who.ordinary': 'हामी सामान्य नेपाली हौं:',
    'about.who.concerned': 'भ्रष्टाचारबाट थकित चिन्तित नागरिकहरू',
    'about.who.students': 'असम्भव सम्पत्ति भएका सहपाठीहरू देख्ने विद्यार्थीहरू',
    'about.who.parents': 'राजनीतिज्ञका छोराछोरीहरू विलासी जीवन बिताउँदा संघर्ष गर्ने अभिभावकहरू',
    'about.who.taxpayers': 'जवाफदेहिता माग्ने करदाताहरू',
    'about.who.united': 'हामी यसबाट एकजुट छौं:',
    'about.who.love': 'हाम्रो देश नेपालको प्रेम',
    'about.who.transparency': 'पारदर्शी शासनको इच्छा',
    'about.who.justice': 'न्याय र निष्पक्षतामा विश्वास',
    'about.who.hope': 'राम्रो भविष्यको आशा',
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
    'about.approach.title': 'हाम्रो दृष्टिकोण',
    'about.approach.step1': 'सबै कुरा दस्तावेजीकरण गर्नुहोस्',
    'about.approach.step1.desc': 'हामी राजनीतिज्ञका सन्तानहरूको जीवनशैली, शिक्षा, र व्यापारिक हितहरूको बारेमा विश्वसनीय स्रोतहरूबाट जानकारी संकलन र प्रमाणीकरण गर्छौं।',
    'about.approach.step2': 'सबै कुरा स्रोत गर्नुहोस्',
    'about.approach.step2.desc': 'प्रत्येक जानकारी विश्वसनीय स्रोतहरूद्वारा समर्थित छ - समाचार लेखहरू, सामाजिक मिडिया पोस्टहरू, व्यापारिक रजिस्ट्रीहरू, र आधिकारिक कागजातहरू।',
    'about.approach.step3': 'पाखण्ड उजागर गर्नुहोस्',
    'about.approach.step3.desc': 'हामी घोषित परिवारिक आम्दानी र राजनीतिज्ञका सन्तानहरूको विलासी जीवनशैली बीचको असमानतालाई उजागर गर्छौं।',
    'about.approach.step4': 'जवाफदेहिता माग्नुहोस्',
    'about.approach.step4.desc': 'हामी हाम्रा निर्वाचित प्रतिनिधिहरूबाट पारदर्शिता, उचित जाँच, र जवाफदेहिताको माग गर्छौं।',
    'about.cta.title': 'आन्दोलनमा सामेल हुनुहोस्',
    'about.cta.description': 'सँगै, हामी नेपालमा कहिल्यै नदेखिएको सबैभन्दा ठूलो झाप्पड भ्रष्टाचारलाई दिन सक्छौं। प्रत्येक योगदान महत्वपूर्ण छ।',
    'about.cta.report': 'गुमनाम रूपमा भ्रष्टाचार रिपोर्ट',
    'about.cta.technical': 'तकनीकी योगदान',
    'about.cta.footer': 'भ्रष्टाचार गुमनाम रूपमा रिपोर्ट गर्नुहोस् वा तकनीकी रूपमा योगदान गर्नुहोस् - दुबै तरिकाले भ्रष्टाचार उजागर गर्न मद्दत गर्छ!',
    
    // Contribute Page
    'contribute.title': 'झाप्पड.कममा योगदान',
    'contribute.description': 'भ्रष्ट राजनीतिज्ञ र उनीहरूका सन्तानहरूको बारेमा जानकारी योगदान गरेर भ्रष्टाचारलाई सबैभन्दा ठूलो झाप्पड दिन मद्दत गर्नुहोस्।',
    'contribute.cta.report': 'भ्रष्टाचार जानकारी रिपोर्ट',
    'contribute.cta.quick': 'छिटो र सजिलो • तकनीकी कौशल आवश्यक छैन • १००% गुमनाम',
    'contribute.easy.title': 'सजिलो तरिका',
    'contribute.easy.subtitle': 'सबैका लागि - तकनीकी कौशल आवश्यक छैन',
    'contribute.easy.step1': 'माथिको फर्म बटनमा क्लिक गर्नुहोस्',
    'contribute.easy.step2': 'भ्रष्टाचार जानकारीसँग फर्म भर्नुहोस्',
    'contribute.easy.step3': 'गुमनाम रूपमा पेश गर्नुहोस् - हामी यसलाई वेबसाइटमा थप्नेछौं',
    'contribute.easy.button': 'फर्म खोल्नुहोस्',
    'contribute.technical.title': 'तकनीकी तरिका',
    'contribute.technical.subtitle': 'डेभलपर र तकनीकी प्रयोगकर्ताहरूका लागि',
    'contribute.technical.step1': 'गिटहबमा रिपोजिटरी फर्क गर्नुहोस्',
    'contribute.technical.step2': 'JSON फाइलमा राजनीतिज्ञ डेटा थप्नुहोस्',
    'contribute.technical.step3': 'समीक्षाका लागि पुल अनुरोध सिर्जना गर्नुहोस्',
    'contribute.technical.button': 'गिटहबमा हेर्नुहोस्',
    'contribute.info.title': 'कुन जानकारी योगदान गर्ने',
    'contribute.info.politician': 'राजनीतिज्ञ जानकारी',
    'contribute.info.politician.name': 'पूरा नाम र हालको पद',
    'contribute.info.politician.party': 'राजनीतिक दल सम्बन्ध',
    'contribute.info.politician.allegations': 'स्रोतसहित भ्रष्टाचार आरोप',
    'contribute.info.politician.wealth': 'अनुमानित परिवारिक सम्पत्ति',
    'contribute.info.children': 'सन्तान जानकारी',
    'contribute.info.children.details': 'नाम, उमेर, र सम्बन्ध',
    'contribute.info.children.education': 'विदेशमा महँगो शिक्षा',
    'contribute.info.children.luxury': 'विलासी वस्तुहरू र हालैका खरिदहरू',
    'contribute.info.children.business': 'व्यापारिक हित र स्वामित्व',
    'contribute.sources.title': 'स्रोत आवश्यकताहरू',
    'contribute.sources.acceptable': 'स्वीकार्य स्रोतहरू',
    'contribute.sources.acceptable.news': 'प्रतिष्ठित मिडियाबाट समाचार लेखहरू',
    'contribute.sources.acceptable.documents': 'आधिकारिक सरकारी कागजातहरू',
    'contribute.sources.acceptable.registry': 'सार्वजनिक व्यापारिक रजिस्ट्री रेकर्डहरू',
    'contribute.sources.acceptable.social': 'सामाजिक मिडिया पोस्टहरू (स्क्रिनशटसहित)',
    'contribute.sources.acceptable.court': 'अदालती कागजात र कानूनी फाइलहरू',
    'contribute.sources.acceptable.research': 'शैक्षिक अनुसन्धान र रिपोर्टहरू',
    'contribute.sources.unacceptable': 'अस्वीकार्य स्रोतहरू',
    'contribute.sources.unacceptable.rumors': 'अप्रमाणित अफवाह वा सुनसुनाइ',
    'contribute.sources.unacceptable.blogs': 'विश्वसनीयताविना व्यक्तिगत ब्लगहरू',
    'contribute.sources.unacceptable.anonymous': 'गुमनाम सामाजिक मिडिया खाताहरू',
    'contribute.sources.unacceptable.speculation': 'प्रमाणविना अनुमान',
    'contribute.sources.unacceptable.private': 'निजी वा गोपनीय जानकारी',
    'contribute.sources.unacceptable.opinions': 'तथ्यविना व्यक्तिगत रायहरू',
    'contribute.guide.title': 'चरणबद्ध योगदान गाइड',
    'contribute.guide.step1.title': 'चरण १: रिपोजिटरी फर्क गर्नुहोस्',
    'contribute.guide.step1.desc': 'हाम्रो गिटहब रिपोजिटरीमा जानुहोस् र "फर्क" बटनमा क्लिक गर्नुहोस्।',
    'contribute.guide.step2.title': 'चरण २: ब्रान्च सिर्जना गर्नुहोस्',
    'contribute.guide.step2.desc': 'तपाईंको योगदानका लागि नयाँ ब्रान्च सिर्जना गर्नुहोस्:',
    'contribute.guide.step3.title': 'चरण ३: आफ्नो डेटा थप्नुहोस्',
    'contribute.guide.step3.desc': 'public/data/politicians.json फाइल सम्पादन गर्नुहोस् र स्किमा अनुसार तपाईंको राजनीतिज्ञ जानकारी थप्नुहोस्।',
    'contribute.guide.step3.tip': 'सुझाव: सन्दर्भका लागि मौजूदा प्रविष्टिहरू जाँच गर्नुहोस् र सबै आवश्यक फिल्डहरू भरेको सुनिश्चित गर्नुहोस्।',
    'contribute.guide.step4.title': 'चरण ४: आफ्नो डेटा प्रमाणीकरण गर्नुहोस्',
    'contribute.guide.step4.desc': 'तपाईंको डेटा जाँच गर्न प्रमाणीकरण स्क्रिप्ट चलाउनुहोस्:',
    'contribute.guide.step5.title': 'चरण ५: पुल अनुरोध पेश गर्नुहोस्',
    'contribute.guide.step5.desc': 'तपाईंका परिवर्तनहरू कमिट गर्नुहोस् र पुल अनुरोध सिर्जना गर्नुहोस्:',
    'contribute.format.title': 'डेटा ढाँचा उदाहरण',
    'contribute.cta.final.title': 'झाप्पड दिन तयार हुनुहुन्छ?',
    'contribute.cta.final.description': 'प्रत्येक जानकारीले हामीलाई भ्रष्टाचार उजागर गर्न मद्दत गर्छ। आन्दोलनमा सामेल हुनुहोस् र भ्रष्ट राजनीतिज्ञहरूलाई जवाफदेही बनाउन मद्दत गर्नुहोस्।',
    'contribute.cta.final.start': 'योगदान सुरु गर्नुहोस्',
    'contribute.cta.final.learn': 'थप जान्नुहोस्',
    
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
