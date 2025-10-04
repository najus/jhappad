'use client'

import { useState, useEffect } from 'react'
import { Heart, Users, MapPin, Calendar, ArrowLeft, Share2, Upload, X, Camera, LogOut } from 'lucide-react'
import Header from '@/components/Header'
import SocialShare from '@/components/SocialShare'
import { useLanguage } from '@/contexts/LanguageContext'

interface MemorialPerson {
  id: number
  name: string
  age?: number
  location: string
  hasPhoto: boolean
  isUnidentified?: boolean
  incidentLocation?: string
  photoUrl?: string
}

interface MemorialPhoto {
  personId: number
  url: string
  pathname: string
  uploadedAt: string
}

// Memorial data based on the provided image
const memorialData: MemorialPerson[] = [
  // Row 1
  { id: 1, name: "Abhishek Shrestha", age: 23, location: "Sunsari", hasPhoto: true },
  { id: 2, name: "Aswah Alam Thakur", age: 25, location: "Parsa", hasPhoto: true },
  { id: 3, name: "Ayush Thapa Magar", age: 29, location: "Nepalgunj", hasPhoto: true },
  { id: 4, name: "Bimal Babu Bhatta", age: 22, location: "Gorkha, Barpak", hasPhoto: true },
  { id: 5, name: "Binod Maharjan", age: 30, location: "Lalitpur", hasPhoto: true },
  { id: 6, name: "Buddhi Bahadur Tamang", age: 41, location: "Kathmandu, Kritipur", hasPhoto: true },
  { id: 7, name: "Chhatraman Kusumi", age: 64, location: "Dhankuta", hasPhoto: true },
  { id: 8, name: "Dil Narayan Tamang", age: 42, location: "Kavre", hasPhoto: true },
  { id: 9, name: "Gaurav Joshi", age: 27, location: "Kailali", hasPhoto: true },
  { id: 10, name: "Ishwot Adhikari", age: 26, location: "Kathmandu, Banasthali", hasPhoto: true },
  
  // Row 2
  { id: 11, name: "Madhav Saru Magar", age: 18, location: "Arghakhanchi", hasPhoto: true },
  { id: 12, name: "Mohan Sardar", age: 40, location: "Sunsari", hasPhoto: true },
  { id: 13, name: "Ojhan Budha", age: 30, location: "Bajura", hasPhoto: true },
  { id: 14, name: "Risak Khatiwada", age: 23, location: "Kathmandu", hasPhoto: true },
  { id: 15, name: "Santosh BK", age: 29, location: "Udayapur", hasPhoto: true },
  { id: 16, name: "Sauran Kishor Shrestha", age: 30, location: "Baglung", hasPhoto: true },
  { id: 17, name: "Shreeyam Chaulagain", age: 19, location: "Itahari, Sunsari", hasPhoto: true },
  { id: 18, name: "Subhas Kumar Bohara", age: 23, location: "Bajhang, Khaptad", hasPhoto: true },
  { id: 19, name: "Sulabh Raj Shrestha", age: 25, location: "Banke, Nepalgunj", hasPhoto: true },
  { id: 20, name: "Yog Bahadur Shrestha", age: 21, location: "Bahrabise, Sindhupalchok", hasPhoto: true },
  
  // Row 3
  { id: 21, name: "Yogendra Neupane", age: 23, location: "Bhaktapur", hasPhoto: true },
  { id: 22, name: "Abhishek Chaulagain", age: 21, location: "Dolakha", hasPhoto: true },
  { id: 23, name: "Anish Parajuli (Ramesh)", age: 42, location: "Gorkha", hasPhoto: true },
  { id: 24, name: "Arjun Bhatta", age: 28, location: "Gorkha", hasPhoto: true },
  { id: 25, name: "Bhimraj Dhami", age: 28, location: "Bajhang", hasPhoto: true },
  { id: 26, name: "Bijay Chaudhary", age: 29, location: "Siraha", hasPhoto: true },
  { id: 27, name: "Bijay Tamang", age: 43, location: "Chitwan", incidentLocation: "Kaski", hasPhoto: true },
  { id: 28, name: "Deepak Saud", age: 19, location: "Baitadi", hasPhoto: true },
  { id: 29, name: "Dev Bahadur Subedi", age: 30, location: "Sarlahi", hasPhoto: true },
  { id: 30, name: "Dhiraj Shrestha", age: 25, location: "Kathmandu", hasPhoto: true },
  
  // Row 4
  { id: 31, name: "Dinesh Rajbanshi", age: 32, location: "Jhapa", hasPhoto: true },
  { id: 32, name: "Dipesh Sunuwar", age: 19, location: "Sindhuli", hasPhoto: true },
  { id: 33, name: "Gopal Sedhai", age: 30, location: "Jhapa", hasPhoto: true },
  { id: 34, name: "Kanchi Nagarkoti", age: 50, location: "Kathmandu", incidentLocation: "Kaski", hasPhoto: true },
  { id: 35, name: "Kamal Bhandari", age: 30, location: "Panchthar", hasPhoto: true },
  { id: 36, name: "Mahendra Pariyar", age: 40, location: "Kathmandu", hasPhoto: true },
  { id: 37, name: "Mahesh Budhathoki", age: 22, location: "Dolakha", hasPhoto: true },
  { id: 38, name: "Nikita Gautam", age: 17, location: "Chitwan", hasPhoto: true },
  { id: 39, name: "Niraj Pant", age: 48, location: "Baitadi", hasPhoto: true },
  { id: 40, name: "Prabin Kulung", age: 31, location: "Sankhuwasabha", hasPhoto: true },
  
  // Row 5
  { id: 41, name: "Rajesh Singh Gola", age: 57, location: "Indian woman", hasPhoto: true },
  { id: 42, name: "Sajan Rai", age: 43, location: "Sunsari", hasPhoto: true },
  { id: 43, name: "Santosh Rai", age: 50, location: "Udayapur", hasPhoto: true },
  { id: 44, name: "Saroj Gurung", age: 19, location: "Chitwan", hasPhoto: true },
  { id: 45, name: "Saroj Khatri", age: 25, location: "Kavre", hasPhoto: true },
  { id: 46, name: "Shubharaj Shrestha Balami", age: 27, location: "Nuwakot", hasPhoto: true },
  { id: 47, name: "Swasthani Khadka", age: 26, location: "Dolakha", incidentLocation: "Kaski", hasPhoto: true },
  { id: 48, name: "Umesh Mahat", age: 21, location: "Sindhupalchok", hasPhoto: true },
  { id: 49, name: "Amrit Gurung", age: 32, location: "Koteshwor Police", hasPhoto: true },
  { id: 50, name: "Milan Raya", age: 30, location: "Maharajgunj Police Circle", hasPhoto: true },
  
  // Row 6
  { id: 51, name: "Uttam Thapa", age: 30, location: "Maharajgunj Police Circle", hasPhoto: true },
  { id: 52, name: "Bhupendra Khatri", age: 21, location: "Banke Juvenile Detention Centre", incidentLocation: "Dailekh", hasPhoto: false },
  { id: 53, name: "Bikru Dhobi", location: "Ramechhap Prison", incidentLocation: "Dhanusha", hasPhoto: false },
  { id: 54, name: "Dinesh Gharti Magar", age: 20, location: "Banke Juvenile Detention Centre", incidentLocation: "Dang", hasPhoto: false },
  { id: 55, name: "Indra Bahadur Dala", age: 36, location: "Dhading Prison", incidentLocation: "Nawalparasi", hasPhoto: false },
  { id: 56, name: "Manoj Mahato", age: 40, location: "Ramechhap Prison", incidentLocation: "Dhanusha", hasPhoto: false },
  { id: 57, name: "Jit Bahadur Ghale", age: 61, location: "Dhading Prison", hasPhoto: false },
  { id: 58, name: "Rajkishor Yadav", age: 51, location: "Ramechhap Prison", incidentLocation: "Morang", hasPhoto: false },
  { id: 59, name: "Jagat Deuba", age: 19, location: "Banke Juvenile Detention Centre", incidentLocation: "Kailali", hasPhoto: false },
  { id: 60, name: "Samir Thapa", age: 20, location: "Banke Juvenile Detention Centre", incidentLocation: "Banke", hasPhoto: false },
  
  // Row 7
  { id: 61, name: "Umesh Bista", age: 21, location: "Banke Juvenile Detention Centre", incidentLocation: "Achham", hasPhoto: false },
  { id: 62, name: "Unidentified", location: "Bhatbhateni", incidentLocation: "Sunsari, Dharan", isUnidentified: true, hasPhoto: false },
  { id: 63, name: "Unidentified", location: "Bhatbhateni", incidentLocation: "Sunsari, Dharan", isUnidentified: true, hasPhoto: false },
  { id: 64, name: "Unidentified", location: "Bhatbhateni", incidentLocation: "Sunsari, Dharan", isUnidentified: true, hasPhoto: false },
  { id: 65, name: "Unidentified", location: "Bhatbhateni", incidentLocation: "Sunsari, Dharan", isUnidentified: true, hasPhoto: false },
  { id: 66, name: "Unidentified", location: "Bhatbhateni", incidentLocation: "Biratnagar", isUnidentified: true, hasPhoto: false },
  { id: 67, name: "Unidentified", location: "Bhatbhateni", incidentLocation: "Chucchepati, Kathmandu", isUnidentified: true, hasPhoto: false },
  { id: 68, name: "Unidentified", location: "Bhatbhateni", incidentLocation: "Chucchepati, Kathmandu", isUnidentified: true, hasPhoto: false },
  { id: 69, name: "Unidentified", location: "Bhatbhateni", incidentLocation: "Chucchepati, Kathmandu", isUnidentified: true, hasPhoto: false },
  { id: 70, name: "Unidentified", location: "Bhatbhateni", incidentLocation: "Chucchepati, Kathmandu", isUnidentified: true, hasPhoto: false },
  
  // Row 8
  { id: 71, name: "Unidentified", location: "Bhatbhateni", incidentLocation: "Chucchepati, Kathmandu", isUnidentified: true, hasPhoto: false },
  { id: 72, name: "Unidentified", location: "Bhatbhateni", incidentLocation: "Chucchepati, Kathmandu", isUnidentified: true, hasPhoto: false },
  { id: 73, name: "Unidentified", location: "Bhatbhateni", incidentLocation: "Chucchepati, Kathmandu", isUnidentified: true, hasPhoto: false },
  { id: 74, name: "Unidentified", location: "Bhatbhateni", incidentLocation: "Chucchepati, Kathmandu", isUnidentified: true, hasPhoto: false },
]

export default function MemorialPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedPerson, setSelectedPerson] = useState<MemorialPerson | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [memorialPhotos, setMemorialPhotos] = useState<Record<number, string>>({})
  const [uploadingPhoto, setUploadingPhoto] = useState<number | null>(null)
  const [uploadError, setUploadError] = useState('')
  const { t } = useLanguage()

  // Check admin status and load photos on mount
  useEffect(() => {
    checkAdminStatus()
    loadMemorialPhotos()
  }, [])

  const checkAdminStatus = async () => {
    try {
      const response = await fetch('/api/admin/me/')
      const data = await response.json()
      setIsAdmin(data.isAdmin)
    } catch (error) {
      console.error('Error checking admin status:', error)
      setIsAdmin(false)
    } finally {
      setIsLoading(false)
    }
  }

  const loadMemorialPhotos = async () => {
    try {
      const response = await fetch('/api/memorial/photos')
      const data = await response.json()
      if (data.photos) {
        const photoMap: Record<number, string> = {}
        data.photos.forEach((photo: MemorialPhoto) => {
          photoMap[photo.personId] = photo.url
        })
        setMemorialPhotos(photoMap)
      }
    } catch (error) {
      console.error('Error loading memorial photos:', error)
    }
  }

  const handlePhotoUpload = async (personId: number, file: File) => {
    setUploadingPhoto(personId)
    setUploadError('')

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('personId', personId.toString())

      const uploadResponse = await fetch('/api/memorial/upload', {
        method: 'POST',
        body: formData,
      })

      const uploadData = await uploadResponse.json()

      if (uploadResponse.ok) {
        // Save photo data
        const saveResponse = await fetch('/api/memorial/photos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            personId,
            url: uploadData.url,
            pathname: uploadData.pathname,
          }),
        })

        if (saveResponse.ok) {
          // Update local state
          setMemorialPhotos(prev => ({
            ...prev,
            [personId]: uploadData.url
          }))
        } else {
          setUploadError('Failed to save photo data')
        }
      } else {
        setUploadError(uploadData.error || 'Upload failed')
      }
    } catch (error) {
      console.error('Photo upload error:', error)
      setUploadError('Network error. Please try again.')
    } finally {
      setUploadingPhoto(null)
    }
  }

  const handleDeletePhoto = async (personId: number) => {
    if (!confirm('Are you sure you want to delete this photo?')) {
      return
    }

    try {
      const response = await fetch('/api/memorial/photos', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ personId }),
      })

      if (response.ok) {
        // Update local state
        setMemorialPhotos(prev => {
          const newPhotos = { ...prev }
          delete newPhotos[personId]
          return newPhotos
        })
      } else {
        setUploadError('Failed to delete photo')
      }
    } catch (error) {
      console.error('Photo deletion error:', error)
      setUploadError('Network error. Please try again.')
    }
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout/', { method: 'POST' })
      setIsAdmin(false)
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const filteredPeople = memorialData.filter(person => {
    if (!searchTerm.trim()) return true
    const searchLower = searchTerm.toLowerCase()
    return (
      person.name.toLowerCase().includes(searchLower) ||
      person.location.toLowerCase().includes(searchLower) ||
      (person.incidentLocation && person.incidentLocation.toLowerCase().includes(searchLower))
    )
  })

  const peopleWithPhotos = memorialData.filter(p => p.hasPhoto || memorialPhotos[p.id]).length
  const unidentifiedCount = memorialData.filter(p => p.isUnidentified).length

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Admin Status and Controls */}
          {isAdmin && (
            <div className="mb-8 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-green-600 font-semibold">Admin Access Granted</span>
                  <span className="ml-2 text-sm text-gray-500">• You can upload and manage memorial photos</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center text-gray-600 hover:text-red-600 transition-colors px-3 py-1 rounded hover:bg-red-50"
                >
                  <LogOut className="w-4 h-4 mr-1" />
                  Logout
                </button>
              </div>
            </div>
          )}

          {/* Upload Error Display */}
          {uploadError && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4">
              <div className="flex items-center">
                <X className="w-5 h-5 text-red-500 mr-2" />
                <span className="text-red-700">{uploadError}</span>
                <button
                  onClick={() => setUploadError('')}
                  className="ml-auto text-red-500 hover:text-red-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-gradient-to-r from-red-50 to-rose-50 text-red-800 px-6 py-3 rounded-full text-sm font-medium mb-6 border border-red-200 shadow-sm">
              🕯️ In Loving Memory
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              <span className="bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
                September 8th Memorial
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
              Remembering those who lost their lives during the protests on September 8th, 2025. 
              Each name represents a life, a family, and a community forever changed.
            </p>
            
            {/* Memorial Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-xl mx-auto mb-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
                <div className="text-3xl font-bold text-red-600 mb-2">{memorialData.length}</div>
                <div className="text-sm text-gray-600 font-medium">Lives Lost</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20">
                <div className="text-3xl font-bold text-gray-600 mb-2">{unidentifiedCount}</div>
                <div className="text-sm text-gray-600 font-medium">Unidentified</div>
              </div>
            </div>

            {/* Social Share */}
            <div className="mb-8">
              <SocialShare 
                variant="compact"
                title="🕯️ September 8th Memorial - In Loving Memory"
                description="May their memory be a blessing. Remembering those who lost their lives during the September 8th protests in Nepal. Their sacrifice will never be forgotten."
                className="justify-center"
                isMemorial={true}
              />
            </div>
          </div>

          {/* Search */}
          <div className="mb-8">
            <div className="relative max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Search by name or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-6 py-4 text-base border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-red-200 focus:border-red-300 shadow-lg transition-all duration-200 bg-white/80 backdrop-blur-sm"
              />
              <Users className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
          </div>

          {/* Memorial Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredPeople.map((person) => (
              <div
                key={person.id}
                className="group bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/30 hover:border-red-200/50 cursor-pointer transform hover:-translate-y-1"
                onClick={() => setSelectedPerson(person)}
              >
                {/* Photo or Placeholder */}
                <div className="relative mb-6">
                  {memorialPhotos[person.id] ? (
                    <div className="w-full h-56 rounded-2xl overflow-hidden shadow-md">
                      <img
                        src={memorialPhotos[person.id]}
                        alt={person.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Fallback to placeholder if image fails to load
                          e.currentTarget.style.display = 'none'
                          const fallback = e.currentTarget.nextElementSibling as HTMLElement
                          if (fallback) {
                            fallback.style.display = 'flex'
                          }
                        }}
                      />
                      <div 
                        className="w-full h-full bg-gradient-to-br from-red-50 to-rose-50 flex items-center justify-center"
                        style={{ display: 'none' }}
                      >
                        <div className="text-center">
                          <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-rose-100 rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
                            <Heart className="w-8 h-8 text-red-500" />
                          </div>
                          <p className="text-sm text-red-600 font-medium">Photo Available</p>
                        </div>
                      </div>
                    </div>
                  ) : person.hasPhoto ? (
                    <div className="w-full h-56 bg-gradient-to-br from-red-50 to-rose-50 rounded-2xl flex items-center justify-center shadow-md border border-red-100">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-rose-100 rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
                          <Heart className="w-8 h-8 text-red-500" />
                        </div>
                        <p className="text-sm text-red-600 font-medium">Photo Available</p>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-56 bg-gradient-to-br from-slate-100 to-gray-100 rounded-2xl flex items-center justify-center shadow-md border border-slate-200">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-slate-200 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm">
                          <Users className="w-8 h-8 text-slate-500" />
                        </div>
                        <p className="text-sm text-slate-600 font-medium">No Photo</p>
                      </div>
                    </div>
                  )}
                  
                  {/* Age Badge */}
                  {person.age && (
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-md">
                      {person.age} years
                    </div>
                  )}

                  {/* Admin Upload Controls */}
                  {isAdmin && (
                    <div className="absolute top-4 left-4 flex space-x-2">
                      {memorialPhotos[person.id] ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDeletePhoto(person.id)
                          }}
                          className="bg-red-500/90 hover:bg-red-600 text-white p-2 rounded-lg transition-all duration-200 backdrop-blur-sm shadow-md hover:shadow-lg"
                          title="Delete Photo"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      ) : (
                        <label className="bg-blue-500/90 hover:bg-blue-600 text-white p-2 rounded-lg transition-all duration-200 backdrop-blur-sm cursor-pointer shadow-md hover:shadow-lg">
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0]
                              if (file) {
                                handlePhotoUpload(person.id, file)
                              }
                            }}
                            disabled={uploadingPhoto === person.id}
                          />
                          {uploadingPhoto === person.id ? (
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          ) : (
                            <Camera className="w-4 h-4" />
                          )}
                        </label>
                      )}
                    </div>
                  )}
                </div>

                {/* Name */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                  {person.isUnidentified ? (
                    <span className="text-slate-600 italic">Unidentified</span>
                  ) : (
                    person.name
                  )}
                </h3>

                {/* Location */}
                <div className="flex items-center text-sm text-slate-600 mb-3">
                  <MapPin className="w-4 h-4 mr-2 flex-shrink-0 text-slate-500" />
                  <span className="line-clamp-1 font-medium">{person.location}</span>
                </div>

                {/* Incident Location */}
                {person.incidentLocation && (
                  <div className="flex items-center text-sm text-slate-500 mb-3">
                    <Calendar className="w-4 h-4 mr-2 flex-shrink-0 text-slate-400" />
                    <span className="line-clamp-1">Incident: {person.incidentLocation}</span>
                  </div>
                )}

              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredPeople.length === 0 && (
            <div className="text-center py-16">
              <div className="text-gray-400 text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No results found</h3>
              <p className="text-gray-600 mb-4">Try searching with different terms</p>
              <button 
                onClick={() => setSearchTerm('')} 
                className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Clear Search
              </button>
            </div>
          )}

          {/* Disclaimer */}
          <div className="mt-16 bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Important Note</h3>
              <p className="text-gray-600 leading-relaxed max-w-4xl mx-auto">
                The names of the deceased have been translated from Nepali to English. Despite our best efforts to confirm spellings with reliable sources, there may be slight variations. We have used the most accurate spellings possible based on available information.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Person Detail Modal */}
      {selectedPerson && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={(e) => {
            // Close modal when clicking on the backdrop
            if (e.target === e.currentTarget) {
              setSelectedPerson(null)
            }
          }}
        >
          <div 
            className="bg-white/95 backdrop-blur-sm rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl border border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-10">
              {/* Close Button */}
              <button
                onClick={() => setSelectedPerson(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Photo */}
              <div className="mb-8">
                {memorialPhotos[selectedPerson.id] ? (
                  <div 
                    className="w-full rounded-2xl overflow-hidden shadow-lg"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <img
                      src={memorialPhotos[selectedPerson.id]}
                      alt={selectedPerson.name}
                      className="w-full h-auto max-h-[65vh] object-contain mx-auto"
                      onError={(e) => {
                        // Fallback to placeholder if image fails to load
                        e.currentTarget.style.display = 'none'
                        const fallback = e.currentTarget.nextElementSibling as HTMLElement
                        if (fallback) {
                          fallback.style.display = 'flex'
                        }
                      }}
                    />
                    <div 
                      className="w-full h-80 bg-gradient-to-br from-red-50 to-rose-50 flex items-center justify-center"
                      style={{ display: 'none' }}
                    >
                      <div className="text-center">
                        <div className="w-24 h-24 bg-gradient-to-br from-red-100 to-rose-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                          <Heart className="w-12 h-12 text-red-500" />
                        </div>
                        <p className="text-red-600 font-medium">Photo Available</p>
                      </div>
                    </div>
                  </div>
                ) : selectedPerson.hasPhoto ? (
                  <div className="w-full h-80 bg-gradient-to-br from-red-50 to-rose-50 rounded-2xl flex items-center justify-center shadow-lg border border-red-100">
                    <div className="text-center">
                      <div className="w-24 h-24 bg-gradient-to-br from-red-100 to-rose-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                        <Heart className="w-12 h-12 text-red-500" />
                      </div>
                      <p className="text-red-600 font-medium">Photo Available</p>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-80 bg-gradient-to-br from-slate-100 to-gray-100 rounded-2xl flex items-center justify-center shadow-lg border border-slate-200">
                    <div className="text-center">
                      <div className="w-24 h-24 bg-gradient-to-br from-slate-200 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                        <Users className="w-12 h-12 text-slate-500" />
                      </div>
                      <p className="text-slate-600 font-medium">No Photo Available</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-gray-900">
                  {selectedPerson.isUnidentified ? (
                    <span className="text-slate-600 italic">Unidentified</span>
                  ) : (
                    selectedPerson.name
                  )}
                </h2>

                {selectedPerson.age && (
                  <div className="flex items-center text-lg text-slate-700">
                    <Calendar className="w-5 h-5 mr-3 text-slate-500" />
                    <span className="font-medium">{selectedPerson.age} years old</span>
                  </div>
                )}

                <div className="flex items-center text-lg text-slate-700">
                  <MapPin className="w-5 h-5 mr-3 text-slate-500" />
                  <span className="font-medium">{selectedPerson.location}</span>
                </div>

                {selectedPerson.incidentLocation && (
                  <div className="flex items-center text-lg text-slate-700">
                    <Calendar className="w-5 h-5 mr-3 text-slate-500" />
                    <span className="font-medium">Incident Location: {selectedPerson.incidentLocation}</span>
                  </div>
                )}

                <div className="pt-6 border-t border-slate-200">
                  <p className="text-slate-600 italic text-lg leading-relaxed">
                    "May their memory be a blessing and their sacrifice never be forgotten."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Share Button */}
      <SocialShare 
        variant="floating"
        title="🕯️ September 8th Memorial - In Loving Memory"
        description="May their memory be a blessing. Remembering those who lost their lives during the September 8th protests in Nepal. Their sacrifice will never be forgotten."
        isMemorial={true}
      />
    </div>
  )
}
