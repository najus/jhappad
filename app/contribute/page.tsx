'use client'

import { Github, FileText, Users, CheckCircle, AlertCircle, ExternalLink, Upload, Search } from 'lucide-react'
import Header from '@/components/Header'
import SocialShare from '@/components/SocialShare'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Contribute() {
  const { t } = useLanguage()
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('contribute.title')}
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            {t('contribute.description')}
          </p>
          
          {/* Primary CTA - Google Form */}
          <div className="mb-8">
            <a
              href="https://forms.gle/w7jEJtD2HSrgDNcw5"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-nepal-red to-red-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-200 inline-flex items-center justify-center text-lg shadow-lg hover:shadow-xl"
            >
              📝 {t('contribute.cta.report')}
            </a>
            <p className="text-sm text-gray-500 mt-3">
              {t('contribute.cta.quick')}
            </p>
          </div>
        </div>

        {/* Two Ways to Contribute */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Easy Way - Google Form */}
            <div className="card bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <div className="text-center mb-6">
                <div className="bg-green-500 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  📝
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('contribute.easy.title')}</h2>
                <p className="text-gray-600">{t('contribute.easy.subtitle')}</p>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">1</div>
                  <p className="text-gray-700">{t('contribute.easy.step1')}</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">2</div>
                  <p className="text-gray-700">{t('contribute.easy.step2')}</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">3</div>
                  <p className="text-gray-700">{t('contribute.easy.step3')}</p>
                </div>
              </div>
              <div className="mt-6 text-center">
                <a
                  href="https://forms.gle/w7jEJtD2HSrgDNcw5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors inline-flex items-center"
                >
                  📝 {t('contribute.easy.button')}
                </a>
              </div>
            </div>

            {/* Technical Way - GitHub */}
            <div className="card bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <div className="text-center mb-6">
                <div className="bg-blue-500 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  <Github className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('contribute.technical.title')}</h2>
                <p className="text-gray-600">{t('contribute.technical.subtitle')}</p>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">1</div>
                  <p className="text-gray-700">{t('contribute.technical.step1')}</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">2</div>
                  <p className="text-gray-700">{t('contribute.technical.step2')}</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">3</div>
                  <p className="text-gray-700">{t('contribute.technical.step3')}</p>
                </div>
              </div>
              <div className="mt-6 text-center">
                <a
                  href="https://github.com/najus/jhappad"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center"
                >
                  <Github className="w-4 h-4 mr-2" />
                  {t('contribute.technical.button')}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* What to Contribute */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="card">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <FileText className="w-6 h-6 text-nepal-blue mr-3" />
              {t('contribute.info.title')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('contribute.info.politician')}</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    {t('contribute.info.politician.name')}
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    {t('contribute.info.politician.party')}
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    {t('contribute.info.politician.allegations')}
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    {t('contribute.info.politician.wealth')}
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('contribute.info.children')}</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    {t('contribute.info.children.details')}
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    {t('contribute.info.children.education')}
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    {t('contribute.info.children.luxury')}
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    {t('contribute.info.children.business')}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Source Requirements */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="card">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Search className="w-6 h-6 text-nepal-red mr-3" />
              {t('contribute.sources.title')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-green-700 mb-3 flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  {t('contribute.sources.acceptable')}
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• {t('contribute.sources.acceptable.news')}</li>
                  <li>• {t('contribute.sources.acceptable.documents')}</li>
                  <li>• {t('contribute.sources.acceptable.registry')}</li>
                  <li>• {t('contribute.sources.acceptable.social')}</li>
                  <li>• {t('contribute.sources.acceptable.court')}</li>
                  <li>• {t('contribute.sources.acceptable.research')}</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-red-700 mb-3 flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  {t('contribute.sources.unacceptable')}
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• {t('contribute.sources.unacceptable.rumors')}</li>
                  <li>• {t('contribute.sources.unacceptable.blogs')}</li>
                  <li>• {t('contribute.sources.unacceptable.anonymous')}</li>
                  <li>• {t('contribute.sources.unacceptable.speculation')}</li>
                  <li>• {t('contribute.sources.unacceptable.private')}</li>
                  <li>• {t('contribute.sources.unacceptable.opinions')}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Step-by-Step Guide */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="card">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Users className="w-6 h-6 text-nepal-blue mr-3" />
              {t('contribute.guide.title')}
            </h2>
            <div className="space-y-6">
              <div className="border-l-4 border-nepal-red pl-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('contribute.guide.step1.title')}</h3>
                <p className="text-gray-700 mb-2">
                  {t('contribute.guide.step1.desc')}
                </p>
                <div className="bg-gray-100 p-3 rounded text-sm font-mono">
                  git clone https://github.com/najus/jhappad.git
                </div>
              </div>
              
              <div className="border-l-4 border-nepal-red pl-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('contribute.guide.step2.title')}</h3>
                <p className="text-gray-700 mb-2">
                  {t('contribute.guide.step2.desc')}
                </p>
                <div className="bg-gray-100 p-3 rounded text-sm font-mono">
                  git checkout -b add-politician-[politician-name]
                </div>
              </div>
              
              <div className="border-l-4 border-nepal-red pl-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('contribute.guide.step3.title')}</h3>
                <p className="text-gray-700 mb-2">
                  {t('contribute.guide.step3.desc')}
                </p>
                <div className="bg-yellow-50 border border-yellow-200 p-3 rounded">
                  <p className="text-yellow-800 text-sm">
                    <strong>Tip:</strong> {t('contribute.guide.step3.tip')}
                  </p>
                </div>
              </div>
              
              <div className="border-l-4 border-nepal-red pl-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('contribute.guide.step4.title')}</h3>
                <p className="text-gray-700 mb-2">
                  {t('contribute.guide.step4.desc')}
                </p>
                <div className="bg-gray-100 p-3 rounded text-sm font-mono">
                  npm run validate-data
                </div>
              </div>
              
              <div className="border-l-4 border-nepal-red pl-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{t('contribute.guide.step5.title')}</h3>
                <p className="text-gray-700 mb-2">
                  {t('contribute.guide.step5.desc')}
                </p>
                <div className="bg-gray-100 p-3 rounded text-sm font-mono">
                  git add .<br/>
                  git commit -m "Add politician: [Name]"<br/>
                  git push origin add-politician-[politician-name]
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Data Format Example */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="card">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <FileText className="w-6 h-6 text-nepal-red mr-3" />
              {t('contribute.format.title')}
            </h2>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto">
              <pre className="text-sm">{`{
  "id": "politician-001",
  "name": "Politician Name",
  "position": "Current Position",
  "party": "Political Party",
  "children": [
    {
      "name": "Child Name",
      "relationship": "son",
      "age": 25,
      "education": {
        "institution": "Harvard University",
        "cost": "USD 200,000"
      },
      "lifestyle": {
        "luxuryItems": ["Lamborghini", "Rolex"],
        "recentSplurges": [
          {
            "item": "Luxury yacht",
            "cost": "USD 2.5 Million",
            "date": "2024-01-15"
          }
        ]
      },
      "sources": ["https://example.com/source"]
    }
  ],
  "sources": ["https://example.com/politician-source"]
}`}</pre>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="max-w-4xl mx-auto text-center">
          <div className="card bg-gradient-to-r from-nepal-red to-nepal-blue text-white">
            <h2 className="text-2xl font-bold mb-4">{t('contribute.cta.final.title')}</h2>
            <p className="text-lg mb-6 opacity-90">
              {t('contribute.cta.final.description')}
            </p>
            <div className="space-x-4">
              <a
                href="https://github.com/najus/jhappad"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-nepal-red px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center"
              >
                <Github className="w-5 h-5 mr-2" />
                {t('contribute.cta.final.start')}
              </a>
              <a
                href="/about"
                className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-nepal-red transition-colors inline-flex items-center"
              >
                <ExternalLink className="w-5 h-5 mr-2" />
                {t('contribute.cta.final.learn')}
              </a>
            </div>
          </div>
        </div>
      </main>
      
      {/* Floating Share Button */}
      <SocialShare variant="floating" />
    </div>
  )
}
