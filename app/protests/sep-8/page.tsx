'use client'

import { useState, useEffect, useRef } from 'react'
import { Lock, Unlock, Upload, Eye, EyeOff, LogOut, RefreshCw, Check, X, AlertTriangle, Camera, Users } from 'lucide-react'
import Header from '@/components/Header'
import SocialShare from '@/components/SocialShare'
import { useLanguage } from '@/contexts/LanguageContext'

interface ProtestItem {
  url: string
  pathname: string
  uploadedAt?: string
  size?: number
  contentType?: string
  caption?: string
}

export default function ProtestsPage() {
  const [isAdmin, setIsAdmin] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  
  // State for both sections
  const [genzApproved, setGenzApproved] = useState<ProtestItem[]>([])
  const [genzPending, setGenzPending] = useState<ProtestItem[]>([])
  const [protestApproved, setProtestApproved] = useState<ProtestItem[]>([])
  const [protestPending, setProtestPending] = useState<ProtestItem[]>([])
  
  const [loadingItems, setLoadingItems] = useState(false)
  const [activeSection, setActiveSection] = useState<'genz' | 'protest'>('genz')
  const [activeTab, setActiveTab] = useState<'approved' | 'pending'>('approved')
  
  // Upload states
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const [uploadSuccess, setUploadSuccess] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [caption, setCaption] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  // Image gallery states
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)
  const [currentItems, setCurrentItems] = useState<ProtestItem[]>([])
  
  // View counter states
  const [viewCounts, setViewCounts] = useState<Record<string, number>>({})
  
  // Upload section highlight state
  const [isUploadSectionVisible, setIsUploadSectionVisible] = useState(false)
  
  const { t } = useLanguage()

  // Check admin status on component mount
  useEffect(() => {
    checkAdminStatus()
  }, [])

  // Keyboard navigation for image gallery
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (selectedImageIndex !== null) {
        if (event.key === 'Escape') {
          closeImageGallery()
        } else if (event.key === 'ArrowLeft') {
          goToPreviousImage()
        } else if (event.key === 'ArrowRight') {
          goToNextImage()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedImageIndex, currentItems.length])

  // Also check admin status when the page becomes visible (in case of redirect from admin login)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        checkAdminStatus()
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [])

  // Load items when admin status changes
  useEffect(() => {
    if (isAdmin) {
      loadAllItems()
    } else {
      loadApprovedItems()
    }
  }, [isAdmin])

  // Intersection observer for upload section highlight
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsUploadSectionVisible(entry.isIntersecting)
      },
      { threshold: 0.3 }
    )

    const uploadSection = document.getElementById('upload-section')
    if (uploadSection) {
      observer.observe(uploadSection)
    }

    return () => {
      if (uploadSection) {
        observer.unobserve(uploadSection)
      }
    }
  }, [])


  const checkAdminStatus = async (retryCount = 0) => {
    try {
      console.log('Checking admin status... (attempt', retryCount + 1, ')')
      const response = await fetch('/api/admin/me/')
      const data = await response.json()
      console.log('Admin status response:', data)
      setIsAdmin(data.isAdmin)
    } catch (error) {
      console.error('Error checking admin status:', error)
      setIsAdmin(false)
      
      // Retry once after a short delay if this is the first attempt
      if (retryCount === 0) {
        console.log('Retrying admin status check in 500ms...')
        setTimeout(() => {
          checkAdminStatus(1)
        }, 500)
        return
      }
    } finally {
      setIsLoading(false)
    }
  }


  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout/', { method: 'POST' })
      setIsAdmin(false)
      setGenzPending([])
      setProtestPending([])
      setActiveTab('approved')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const loadApprovedItems = async () => {
    setLoadingItems(true)
    try {
      const [genzResponse, protestResponse] = await Promise.all([
        fetch('/api/protests/sep-8/list?type=genz&status=approved'),
        fetch('/api/protests/sep-8/list?type=protest&status=approved')
      ])

      const genzData = await genzResponse.json()
      const protestData = await protestResponse.json()

      const allItems = [
        ...(genzData.items || []),
        ...(protestData.items || [])
      ]
      
      setGenzApproved(genzData.items || [])
      setProtestApproved(protestData.items || [])
      
      // Load view counts for all items
      loadViewCounts(allItems)
    } catch (error) {
      console.error('Error loading approved items:', error)
      setGenzApproved([])
      setProtestApproved([])
    } finally {
      setLoadingItems(false)
    }
  }

  const loadAllItems = async () => {
    setLoadingItems(true)
    try {
      console.log('Loading all items...')
      const [genzApprovedResponse, genzPendingResponse, protestApprovedResponse, protestPendingResponse] = await Promise.all([
        fetch('/api/protests/sep-8/list?type=genz&status=approved'),
        fetch('/api/protests/sep-8/list?type=genz&status=pending'),
        fetch('/api/protests/sep-8/list?type=protest&status=approved'),
        fetch('/api/protests/sep-8/list?type=protest&status=pending')
      ])

      const genzApprovedData = await genzApprovedResponse.json()
      const genzPendingData = await genzPendingResponse.json()
      const protestApprovedData = await protestApprovedResponse.json()
      const protestPendingData = await protestPendingResponse.json()

      console.log('GenZ Approved:', genzApprovedData.items?.length || 0, genzApprovedData)
      console.log('GenZ Pending:', genzPendingData.items?.length || 0, genzPendingData)
      console.log('Protest Approved:', protestApprovedData.items?.length || 0, protestApprovedData)
      console.log('Protest Pending:', protestPendingData.items?.length || 0, protestPendingData)

      const allItems = [
        ...(genzApprovedData.items || []),
        ...(genzPendingData.items || []),
        ...(protestApprovedData.items || []),
        ...(protestPendingData.items || [])
      ]
      
      setGenzApproved(genzApprovedData.items || [])
      setGenzPending(genzPendingData.items || [])
      setProtestApproved(protestApprovedData.items || [])
      setProtestPending(protestPendingData.items || [])
      
      // Load view counts for all items
      loadViewCounts(allItems)
    } catch (error) {
      console.error('Error loading items:', error)
      setGenzApproved([])
      setGenzPending([])
      setProtestApproved([])
      setProtestPending([])
    } finally {
      setLoadingItems(false)
    }
  }

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return 'Unknown size'
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i]
  }

  // Image gallery functions
  const openImageGallery = (items: ProtestItem[], index: number) => {
    const imageItems = items.filter(item => item.contentType?.startsWith('image/'))
    const imageIndex = imageItems.findIndex(item => item === items[index])
    if (imageIndex !== -1) {
      setCurrentItems(imageItems)
      setSelectedImageIndex(imageIndex)
      
      // Increment view count for the clicked image
      const clickedItem = items[index]
      if (clickedItem) {
        incrementViewCount(clickedItem.pathname)
      }
    }
  }

  const closeImageGallery = () => {
    setSelectedImageIndex(null)
    setCurrentItems([])
  }

  const goToPreviousImage = () => {
    if (selectedImageIndex !== null && selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1)
    }
  }

  const goToNextImage = () => {
    if (selectedImageIndex !== null && selectedImageIndex < currentItems.length - 1) {
      setSelectedImageIndex(selectedImageIndex + 1)
    }
  }

  // View counter functions
  const incrementViewCount = async (pathname: string) => {
    try {
      const response = await fetch('/api/protests/sep-8/view/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ pathname })
      })
      
      if (response.ok) {
        const data = await response.json()
        setViewCounts(prev => ({
          ...prev,
          [pathname]: data.viewCount
        }))
      }
    } catch (error) {
      console.error('Failed to increment view count:', error)
      // Fallback: increment locally
      setViewCounts(prev => ({
        ...prev,
        [pathname]: (prev[pathname] || 0) + 1
      }))
    }
  }

  const loadViewCounts = async (items: ProtestItem[]) => {
    try {
      const promises = items.map(async (item) => {
        const response = await fetch(`/api/protests/sep-8/view/?pathname=${encodeURIComponent(item.pathname)}`)
        if (response.ok) {
          const data = await response.json()
          return { pathname: item.pathname, count: data.viewCount }
        }
        return { pathname: item.pathname, count: 0 }
      })
      
      const results = await Promise.all(promises)
      const newViewCounts: Record<string, number> = {}
      results.forEach(result => {
        newViewCounts[result.pathname] = result.count
      })
      
      setViewCounts(prev => ({ ...prev, ...newViewCounts }))
    } catch (error) {
      console.error('Failed to load view counts:', error)
    }
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Unknown date'
    return new Date(dateString).toLocaleDateString()
  }

  const getFileTypeIcon = (contentType?: string) => {
    if (!contentType) return '📄'
    if (contentType.startsWith('image/')) return '🖼️'
    if (contentType.startsWith('video/')) return '🎥'
    if (contentType.startsWith('audio/')) return '🎵'
    return '📄'
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      setUploadError('')
      setUploadSuccess('')
    }
  }

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedFile) return

    setUploading(true)
    setUploadError('')
    setUploadSuccess('')

    try {
      const formData = new FormData()
      formData.append('file', selectedFile)
      formData.append('type', activeSection)
      if (caption.trim()) {
        formData.append('caption', caption.trim())
      }

      const response = await fetch('/api/protests/sep-8/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (response.ok) {
        setUploadSuccess('File uploaded successfully! It will be reviewed before being made public.')
        setSelectedFile(null)
        setCaption('')
        if (fileInputRef.current) {
          fileInputRef.current.value = ''
        }
        // Refresh the data
        if (isAdmin) {
          loadAllItems()
        } else {
          loadApprovedItems()
        }
      } else {
        setUploadError(data.error || 'Upload failed')
      }
    } catch (error) {
      console.error('Upload error:', error)
      setUploadError('Network error. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  const handleApprove = async (item: ProtestItem) => {
    try {
      const response = await fetch('/api/protests/sep-8/approve/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pathname: item.pathname }),
      })

      const data = await response.json()

      if (response.ok) {
        // Refresh the data to show updated counts
        loadAllItems()
      } else {
        console.error('Approval failed:', data.error)
        alert('Failed to approve item: ' + (data.error || 'Unknown error'))
      }
    } catch (error) {
      console.error('Approval error:', error)
      alert('Network error while approving item')
    }
  }

  const handleReject = async (item: ProtestItem) => {
    if (!confirm('Are you sure you want to reject this item? This action cannot be undone.')) {
      return
    }

    try {
      const response = await fetch('/api/protests/sep-8/reject/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pathname: item.pathname }),
      })

      const data = await response.json()

      if (response.ok) {
        // Refresh the data to show updated counts
        loadAllItems()
      } else {
        console.error('Rejection failed:', data.error)
        alert('Failed to reject item: ' + (data.error || 'Unknown error'))
      }
    } catch (error) {
      console.error('Rejection error:', error)
      alert('Network error while rejecting item')
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-nepal-red mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {t('protests.title')}
            </h1>
            <p className="text-xl text-gray-600">
              {t('protests.description')}
            </p>
            <div className="mt-4 text-sm text-gray-500">
              <p>
                {t('protests.mediaCredit')} <a 
                  href="https://september-8-nepal.vercel.app/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-nepal-red hover:underline"
                >
                  @september-8-nepal.vercel.app
                </a>
              </p>
            </div>
          </div>

          {/* Content Advisory and Upload Info - Side by Side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Content Advisory */}
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <svg className="h-5 w-5 text-orange-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-base font-semibold text-orange-900 mb-2">
                    {t('protests.contentAdvisory')}
                  </h3>
                  <p className="text-sm text-orange-800 leading-relaxed">
                    {t('protests.contentWarning')}
                  </p>
                </div>
              </div>
            </div>

            {/* Upload Information */}
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                    <Upload className="h-5 w-5 text-indigo-600" />
                  </div>
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="text-base font-semibold text-indigo-900 mb-2">
                    {t('protests.uploadTo')} {activeSection === 'genz' ? t('protests.genzImposters') : t('protests.protestMedia')}
                  </h3>
                  <p className="text-sm text-indigo-800 leading-relaxed mb-4">
                    {activeSection === 'genz' 
                      ? t('protests.uploadDescription')
                      : t('protests.uploadDescriptionProtest')
                    }
                  </p>
                  <button
                    onClick={() => {
                      // Scroll to upload form at bottom
                      const uploadSection = document.getElementById('upload-section')
                      if (uploadSection) {
                        uploadSection.scrollIntoView({ behavior: 'smooth' })
                      }
                    }}
                    className={`inline-flex items-center px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 shadow-sm hover:shadow-md ${
                      isUploadSectionVisible 
                        ? 'bg-emerald-500 text-white hover:bg-emerald-600 transform hover:scale-105' 
                        : 'bg-indigo-500 text-white hover:bg-indigo-600 transform hover:scale-105'
                    }`}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    {isUploadSectionVisible ? '✓ ' : ''}{t('protests.uploadFile')}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Admin Status and Controls */}
          {isAdmin && (
            <div className="card mb-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Unlock className="w-5 h-5 text-green-600 mr-2" />
                  <span className="text-green-600 font-semibold">{t('protests.adminAccess')}</span>
                  <span className="ml-2 text-sm text-gray-500">• {t('protests.adminDescription')}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center text-gray-600 hover:text-red-600 transition-colors px-3 py-1 rounded hover:bg-red-50"
                >
                  <LogOut className="w-4 h-4 mr-1" />
                  {t('protests.logout')}
                </button>
              </div>
            </div>
          )}

          {/* Section Tabs */}
          <div className="flex space-x-2 mb-8 bg-gradient-to-r from-gray-50 to-gray-100 p-2 rounded-xl shadow-inner">
            <button
              onClick={() => setActiveSection('genz')}
              className={`flex-1 py-4 px-6 rounded-lg font-semibold transition-all duration-300 ${
                activeSection === 'genz'
                  ? 'bg-white text-red-600 shadow-lg border-2 border-red-200 transform scale-105'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-white/50 hover:shadow-md'
              }`}
            >
              <AlertTriangle className="w-5 h-5 inline mr-3" />
              {t('protests.genzImposters')}
            </button>
            <button
              onClick={() => setActiveSection('protest')}
              className={`flex-1 py-4 px-6 rounded-lg font-semibold transition-all duration-300 ${
                activeSection === 'protest'
                  ? 'bg-white text-red-600 shadow-lg border-2 border-red-200 transform scale-105'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-white/50 hover:shadow-md'
              }`}
            >
              <Camera className="w-5 h-5 inline mr-3" />
              {t('protests.protestMedia')}
            </button>
          </div>

          {/* Sub-tabs for Admin */}
          {isAdmin && (
            <div className="flex space-x-2 mb-8 bg-gradient-to-r from-slate-50 to-gray-100 p-2 rounded-xl shadow-inner">
              <button
                onClick={() => setActiveTab('approved')}
                className={`flex-1 py-3 px-5 rounded-lg font-semibold transition-all duration-300 ${
                  activeTab === 'approved'
                    ? 'bg-emerald-50 text-emerald-700 shadow-md border-2 border-emerald-200'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-white/50 hover:shadow-sm'
                }`}
              >
                <Eye className="w-4 h-4 inline mr-2" />
                {t('protests.approved')} ({activeSection === 'genz' ? genzApproved.length : protestApproved.length})
              </button>
              <button
                onClick={() => setActiveTab('pending')}
                className={`flex-1 py-3 px-5 rounded-lg font-semibold transition-all duration-300 ${
                  activeTab === 'pending'
                    ? 'bg-amber-50 text-amber-700 shadow-md border-2 border-amber-200'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-white/50 hover:shadow-sm'
                }`}
              >
                <EyeOff className="w-4 h-4 inline mr-2" />
                {t('protests.pending')} ({activeSection === 'genz' ? genzPending.length : protestPending.length})
              </button>
            </div>
          )}


          {/* Items List */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {activeSection === 'genz' ? t('protests.genzImposters') : t('protests.protestMedia')}
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    {activeSection === 'genz' 
                      ? t('protests.genzDescription')
                      : t('protests.protestDescription')
                    }
                  </p>
                  {activeSection === 'genz' && (
                    <div className="mt-4">
                      <SocialShare 
                        variant="compact"
                        title={`${t('protests.genzImposters')} - ${t('protests.title')}`}
                        description={t('protests.genzDescription')}
                      />
                    </div>
                  )}
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={isAdmin ? loadAllItems : loadApprovedItems}
                    disabled={loadingItems}
                    className="flex items-center px-4 py-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all duration-200 disabled:opacity-50"
                  >
                    <RefreshCw className={`w-4 h-4 mr-2 ${loadingItems ? 'animate-spin' : ''}`} />
                    {t('protests.refresh')}
                  </button>
                  {isAdmin && (
                    <button
                      onClick={async () => {
                        try {
                          const response = await fetch('/api/protests/sep-8/debug/')
                          const data = await response.json()
                          console.log('Debug results:', data)
                          alert('Check console for debug results')
                        } catch (error) {
                          console.error('Debug error:', error)
                        }
                      }}
                      className="flex items-center px-4 py-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-200"
                    >
                      🔍 {t('protests.debug')}
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div className="p-6">

            {loadingItems ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-nepal-red mx-auto"></div>
                <p className="mt-2 text-gray-600">{t('common.loading')}</p>
              </div>
            ) : (
              <>
                {(() => {
                  const items = isAdmin 
                    ? (activeTab === 'approved' 
                        ? (activeSection === 'genz' ? genzApproved : protestApproved)
                        : (activeSection === 'genz' ? genzPending : protestPending))
                    : (activeSection === 'genz' ? genzApproved : protestApproved)
                  
                  if (items.length === 0) {
                    return (
                      <div className="text-center py-8">
                        <div className="text-gray-400 text-4xl mb-4">
                          {isAdmin && activeTab === 'pending' ? '🔒' : '📁'}
                        </div>
                        <p className="text-gray-600">
                          {isAdmin && activeTab === 'pending' 
                            ? t('protests.noPendingItems')
                            : t('protests.noApprovedItems')
                          }
                        </p>
                      </div>
                    )
                  }

                  return (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {items.map((item, index) => (
                        <div 
                          key={index} 
                          className={`group bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg hover:border-nepal-red/20 transition-all duration-300 ${
                            item.contentType?.startsWith('image/') ? 'cursor-pointer' : 'cursor-default'
                          }`}
                          onClick={() => {
                            if (item.contentType?.startsWith('image/')) {
                              openImageGallery(items, index)
                            }
                            // For videos, we don't want to open in new tab - let the video controls handle playback
                          }}
                        >
                          {/* Media Preview */}
                          <div className="relative">
                            {item.contentType?.startsWith('image/') && (
                              <div className="aspect-video overflow-hidden">
                                <img
                                  src={item.url}
                                  alt={item.caption || 'Uploaded image'}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                  onError={(e) => {
                                    // Hide image if it fails to load
                                    e.currentTarget.style.display = 'none'
                                  }}
                                />
                              </div>
                            )}

                            {item.contentType?.startsWith('video/') && (
                              <div className="aspect-video overflow-hidden relative">
                                <video
                                  controls
                                  className="w-full h-full object-cover"
                                  preload="metadata"
                                  onClick={(e) => e.stopPropagation()}
                                  onPlay={() => {
                                    // Increment view count when video starts playing
                                    incrementViewCount(item.pathname)
                                  }}
                                  onError={(e) => {
                                    // Hide video if it fails to load and show fallback
                                    const videoElement = e.currentTarget
                                    videoElement.style.display = 'none'
                                    const fallback = videoElement.nextElementSibling as HTMLElement
                                    if (fallback) {
                                      fallback.style.display = 'flex'
                                    }
                                  }}
                                >
                                  <source src={item.url} type={item.contentType} />
                                  Your browser does not support the video tag.
                                </video>
                                <div 
                                  className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-500"
                                  style={{ display: 'none' }}
                                >
                                  <div className="text-center">
                                    <div className="text-4xl mb-2">🎥</div>
                                    <p className="text-sm font-medium">Video unavailable</p>
                                  </div>
                                </div>
                                
                                {/* Video Play Indicator */}
                                <div className="absolute bottom-3 left-3">
                                  <div className="bg-black/70 text-white px-2 py-1 rounded-md text-xs font-medium backdrop-blur-sm flex items-center">
                                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                                      <path d="M8 5v14l11-7z"/>
                                    </svg>
                                    Video
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* File Type Overlay - Only for images */}
                            {item.contentType?.startsWith('image/') && (
                              <div className="absolute top-3 left-3">
                                <div className="bg-black/70 text-white px-2 py-1 rounded-md text-sm font-medium backdrop-blur-sm">
                                  {getFileTypeIcon(item.contentType)}
                                </div>
                              </div>
                            )}

                            {/* Admin Controls Overlay */}
                            {isAdmin && activeTab === 'pending' && (
                              <div className="absolute top-3 right-3 flex space-x-1">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleApprove(item)
                                  }}
                                  className="bg-green-500/90 hover:bg-green-600 text-white p-1.5 rounded-md transition-colors backdrop-blur-sm"
                                  title={t('protests.approve')}
                                >
                                  <Check className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    handleReject(item)
                                  }}
                                  className="bg-red-500/90 hover:bg-red-600 text-white p-1.5 rounded-md transition-colors backdrop-blur-sm"
                                  title={t('protests.reject')}
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            )}

                            {/* Hover Overlay - Only for images */}
                            {item.contentType?.startsWith('image/') && (
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                  <div className="bg-white/90 backdrop-blur-sm rounded-full p-3">
                                    <Eye className="w-6 h-6 text-gray-700" />
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                          
                          {/* Content */}
                          <div className="p-4">
                            {/* Stats Row */}
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center space-x-3">
                                {/* View Counter */}
                                <div className="flex items-center text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                  </svg>
                                  {viewCounts[item.pathname] || 0}
                                </div>
                                <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                                  {formatFileSize(item.size)}
                                </div>
                              </div>
                              <div className="text-xs text-gray-400">
                                {formatDate(item.uploadedAt)}
                              </div>
                            </div>
                            
                            {/* Caption */}
                            {item.caption && (
                              <p className="text-sm text-gray-800 line-clamp-2 leading-relaxed">
                                {item.caption}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )
                })()}
              </>
            )}
            </div>
          </div>

          {/* Upload Section */}
          <div id="upload-section" className={`bg-white rounded-2xl shadow-lg border-2 border-dashed mt-8 transition-all duration-500 overflow-hidden ${
            isUploadSectionVisible 
              ? 'border-indigo-300 bg-gradient-to-br from-indigo-50 to-blue-50 shadow-xl' 
              : 'border-gray-200 hover:border-indigo-200 hover:shadow-md'
          }`}>
            <div className="bg-gradient-to-r from-indigo-50 to-blue-50 px-6 py-6 border-b border-indigo-100">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
                  <Upload className="w-8 h-8 text-indigo-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {t('protests.uploadTo')} {activeSection === 'genz' ? t('protests.genzImposters') : t('protests.protestMedia')}
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
                  {activeSection === 'genz' 
                    ? t('protests.uploadDescription')
                    : t('protests.uploadDescriptionProtest')
                  }
                </p>
              </div>
            </div>
            <div className="p-6">
            
            <form onSubmit={handleUpload} className="space-y-4">
              <div>
                <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('protests.selectFile')}
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  id="file"
                  accept="image/*,video/*,.pdf,.doc,.docx"
                  onChange={handleFileSelect}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-nepal-red focus:border-transparent"
                  required
                />
                {selectedFile && (
                  <p className="text-sm text-gray-600 mt-1">
                    Selected: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                  </p>
                )}
              </div>
              
              <div>
                <label htmlFor="caption" className="block text-sm font-medium text-gray-700 mb-2">
                  {t('protests.caption')}
                </label>
                <textarea
                  id="caption"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder={t('protests.captionPlaceholder')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-nepal-red focus:border-transparent"
                  rows={3}
                />
              </div>
              
              {uploadError && (
                <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
                  {uploadError}
                </div>
              )}
              
              {uploadSuccess && (
                <div className="text-green-600 text-sm bg-green-50 p-3 rounded-lg">
                  {uploadSuccess}
                </div>
              )}
              
              <button
                type="submit"
                disabled={uploading || !selectedFile}
                className="w-full bg-nepal-red text-white py-3 px-4 rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {uploading ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    {t('protests.uploading')}
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4 mr-2" />
                    {t('protests.uploadFile')}
                  </>
                )}
              </button>
            </form>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500 text-center">
                {t('protests.uploadReview')}
                <br />
                You can also use our{' '}
                <a
                  href="https://forms.gle/eUw7LfJdaxryWFw37 "
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-nepal-red hover:underline"
                >
                  {t('protests.googleForm')}
                </a>{' '}
                {t('protests.alternativeSubmission')}
              </p>
            </div>
          </div>
          {/* Admin Access Link */}
          {!isAdmin && (
            <div className="text-center mb-8">
              <a
                href="/admin"
                className="inline-flex items-center text-gray-500 hover:text-nepal-red transition-colors text-sm"
              >
              </a>
              <div className="mt-2">
                <button
                  onClick={() => checkAdminStatus()}
                  className="text-xs text-gray-400 hover:text-gray-600 transition-colors"
                >
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
      
      {/* Floating Share Button */}
      <SocialShare 
        variant="floating"
        title={`${t('protests.title')} - Nepal`}
        description={t('protests.description')}
      />

      {/* Image Gallery Modal */}
      {selectedImageIndex !== null && currentItems.length > 0 && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Close Button */}
            <button
              onClick={closeImageGallery}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Previous Button */}
            {selectedImageIndex > 0 && (
              <button
                onClick={goToPreviousImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}

            {/* Next Button */}
            {selectedImageIndex < currentItems.length - 1 && (
              <button
                onClick={goToNextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}

            {/* Image */}
            <img
              src={currentItems[selectedImageIndex]?.url}
              alt={currentItems[selectedImageIndex]?.caption || 'Gallery image'}
              className="max-w-full max-h-full object-contain mx-auto"
              style={{ 
                maxWidth: '90vw', 
                maxHeight: '90vh',
                width: 'auto',
                height: 'auto'
              }}
              onError={(e) => {
                e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzZiNzI4MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBhdmFpbGFibGU8L3RleHQ+PC9zdmc+'
              }}
            />

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black bg-opacity-50 px-3 py-1 rounded">
              {selectedImageIndex + 1} of {currentItems.length}
            </div>

            {/* Caption */}
            {currentItems[selectedImageIndex]?.caption && (
              <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black bg-opacity-50 px-3 py-1 rounded max-w-md text-center">
                {currentItems[selectedImageIndex].caption}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
