import { Flag, Github, Info } from 'lucide-react'

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Flag className="w-8 h-8 text-nepal-red" />
            <div>
              <h1 className="text-xl font-bold text-gray-900">Jhappad.com</h1>
              <p className="text-sm text-gray-600">A Slap to Corruption</p>
            </div>
          </div>
          
          <nav className="flex items-center space-x-4">
            <a
              href="/"
              className="text-gray-600 hover:text-nepal-red transition-colors"
            >
              Home
            </a>
            <a
              href="/contribute"
              className="text-gray-600 hover:text-nepal-red transition-colors"
            >
              Contribute
            </a>
            <a
              href="/about"
              className="text-gray-600 hover:text-nepal-red transition-colors"
            >
              About
            </a>
            <a
              href="https://github.com/your-username/corrupt-nepali"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-nepal-red transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
          </nav>
        </div>
      </div>
    </header>
  )
}