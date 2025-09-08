'use client'

import { Github, FileText, Users, CheckCircle, AlertCircle, ExternalLink, Upload, Search } from 'lucide-react'
import Header from '@/components/Header'

export default function Contribute() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Contribute to Jhappad.com
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Help us deliver the biggest <span className="text-nepal-red font-bold">SLAP</span> to corruption 
            by contributing information about corrupt politicians and their children.
          </p>
          
          {/* Primary CTA - Google Form */}
          <div className="mb-8">
            <a
              href="https://forms.gle/w7jEJtD2HSrgDNcw5"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-nepal-red to-red-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-200 inline-flex items-center justify-center text-lg shadow-lg hover:shadow-xl"
            >
              📝 Report Corruption Info
            </a>
            <p className="text-sm text-gray-500 mt-3">
              Quick & Easy • No Technical Skills Required • 100% Anonymous
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
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Easy Way</h2>
                <p className="text-gray-600">For everyone - no technical skills needed</p>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">1</div>
                  <p className="text-gray-700">Click the form button above</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">2</div>
                  <p className="text-gray-700">Fill out the form with corruption information</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">3</div>
                  <p className="text-gray-700">Submit anonymously - we'll add it to the website</p>
                </div>
              </div>
              <div className="mt-6 text-center">
                <a
                  href="https://forms.gle/w7jEJtD2HSrgDNcw5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors inline-flex items-center"
                >
                  📝 Open Form
                </a>
              </div>
            </div>

            {/* Technical Way - GitHub */}
            <div className="card bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <div className="text-center mb-6">
                <div className="bg-blue-500 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  <Github className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Technical Way</h2>
                <p className="text-gray-600">For developers and technical users</p>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">1</div>
                  <p className="text-gray-700">Fork the repository on GitHub</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">2</div>
                  <p className="text-gray-700">Add politician data to the JSON file</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0">3</div>
                  <p className="text-gray-700">Create a pull request for review</p>
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
                  View on GitHub
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
              What Information to Contribute
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Politician Information</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Full name and current position
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Political party affiliation
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Corruption allegations with sources
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Estimated family wealth
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Children Information</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Name, age, and relationship
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Expensive education abroad
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Luxury items and recent purchases
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Business interests and ownership
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
              Source Requirements
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-green-700 mb-3 flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Acceptable Sources
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• News articles from reputable media</li>
                  <li>• Official government documents</li>
                  <li>• Public business registry records</li>
                  <li>• Social media posts (with screenshots)</li>
                  <li>• Court documents and legal filings</li>
                  <li>• Academic research and reports</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-red-700 mb-3 flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  Unacceptable Sources
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Unverified rumors or hearsay</li>
                  <li>• Personal blogs without credibility</li>
                  <li>• Anonymous social media accounts</li>
                  <li>• Speculation without evidence</li>
                  <li>• Private or confidential information</li>
                  <li>• Personal opinions without facts</li>
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
              Step-by-Step Contribution Guide
            </h2>
            <div className="space-y-6">
              <div className="border-l-4 border-nepal-red pl-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Step 1: Fork the Repository</h3>
                <p className="text-gray-700 mb-2">
                  Go to <a href="https://github.com/najus/jhappad" className="text-nepal-red hover:underline">our GitHub repository</a> and click the "Fork" button.
                </p>
                <div className="bg-gray-100 p-3 rounded text-sm font-mono">
                  git clone https://github.com/najus/jhappad.git
                </div>
              </div>
              
              <div className="border-l-4 border-nepal-red pl-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Step 2: Create a Branch</h3>
                <p className="text-gray-700 mb-2">
                  Create a new branch for your contribution:
                </p>
                <div className="bg-gray-100 p-3 rounded text-sm font-mono">
                  git checkout -b add-politician-[politician-name]
                </div>
              </div>
              
              <div className="border-l-4 border-nepal-red pl-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Step 3: Add Your Data</h3>
                <p className="text-gray-700 mb-2">
                  Edit the file <code className="bg-gray-100 px-2 py-1 rounded text-sm">public/data/politicians.json</code> and add your politician information following the schema.
                </p>
                <div className="bg-yellow-50 border border-yellow-200 p-3 rounded">
                  <p className="text-yellow-800 text-sm">
                    <strong>Tip:</strong> Check the existing entries for reference and ensure all required fields are filled.
                  </p>
                </div>
              </div>
              
              <div className="border-l-4 border-nepal-red pl-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Step 4: Validate Your Data</h3>
                <p className="text-gray-700 mb-2">
                  Run the validation script to check your data:
                </p>
                <div className="bg-gray-100 p-3 rounded text-sm font-mono">
                  npm run validate-data
                </div>
              </div>
              
              <div className="border-l-4 border-nepal-red pl-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Step 5: Submit Pull Request</h3>
                <p className="text-gray-700 mb-2">
                  Commit your changes and create a pull request:
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
              Data Format Example
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
            <h2 className="text-2xl font-bold mb-4">Ready to Deliver a JHAPPAD?</h2>
            <p className="text-lg mb-6 opacity-90">
              Every piece of information helps us expose corruption. 
              Join the movement and help us hold corrupt politicians accountable.
            </p>
            <div className="space-x-4">
              <a
                href="https://github.com/najus/jhappad"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-nepal-red px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center"
              >
                <Github className="w-5 h-5 mr-2" />
                Start Contributing
              </a>
              <a
                href="/about"
                className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-nepal-red transition-colors inline-flex items-center"
              >
                <ExternalLink className="w-5 h-5 mr-2" />
                Learn More
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
