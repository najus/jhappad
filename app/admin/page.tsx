'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Lock, Unlock, RefreshCw, ArrowLeft } from 'lucide-react'
import Header from '@/components/Header'

export default function AdminLoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check if already logged in
    checkAdminStatus()
  }, [])

  const checkAdminStatus = async () => {
    try {
      const response = await fetch('/api/admin/me/')
      const data = await response.json()
      if (data.isAdmin) {
        setIsLoggedIn(true)
        // Redirect to protests page after a short delay
        setTimeout(() => {
          router.push('/protests/sep-8')
        }, 1500)
      }
    } catch (error) {
      console.error('Error checking admin status:', error)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      })

      const data = await response.json()

      if (response.ok) {
        setIsLoggedIn(true)
        setPassword('')
        // Wait a bit for the cookie to be set, then redirect
        setTimeout(() => {
          router.push('/protests/sep-8')
        }, 1000)
      } else {
        setError(data.error || 'Login failed')
      }
    } catch (error) {
      console.error('Login error:', error)
      setError('Network error. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout/', { method: 'POST' })
      setIsLoggedIn(false)
      setPassword('')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  if (isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto">
            <div className="card text-center">
              <div className="mb-6">
                <Unlock className="w-16 h-16 text-green-600 mx-auto mb-4" />
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Login Successful!</h1>
                <p className="text-gray-600">Redirecting to admin panel...</p>
              </div>
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-nepal-red mx-auto"></div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          {/* Back to protests link */}
          <div className="mb-6">
            <a
              href="/protests/sep-8"
              className="inline-flex items-center text-gray-600 hover:text-nepal-red transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Protests
            </a>
          </div>

          {/* Admin Login Form */}
          <div className="card">
            <div className="text-center mb-6">
              <Lock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Login</h1>
              <p className="text-gray-600">Access the admin panel to manage content</p>
            </div>
            
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Admin Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-nepal-red focus:border-transparent"
                  placeholder="Enter admin password"
                  required
                />
              </div>
              
              {error && (
                <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                  {error}
                </div>
              )}
              
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-nepal-red text-white py-3 px-4 rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    <Unlock className="w-4 h-4 mr-2" />
                    Sign In
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Info */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Admin access is required to view and manage pending content submissions.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
