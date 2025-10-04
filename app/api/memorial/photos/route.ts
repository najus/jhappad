import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

export const dynamic = 'force-dynamic'

// Path to the memorial photos data file
const MEMORIAL_PHOTOS_PATH = path.join(process.cwd(), 'data', 'memorial-photos.json')

interface MemorialPhoto {
  personId: number
  url: string
  pathname: string
  uploadedAt: string
}

// Initialize the photos data file if it doesn't exist
async function initializePhotosFile() {
  try {
    await fs.access(MEMORIAL_PHOTOS_PATH)
  } catch {
    // File doesn't exist, create it with empty array
    await fs.mkdir(path.dirname(MEMORIAL_PHOTOS_PATH), { recursive: true })
    await fs.writeFile(MEMORIAL_PHOTOS_PATH, JSON.stringify([], null, 2))
  }
}

// Read photos data
async function readPhotosData(): Promise<MemorialPhoto[]> {
  await initializePhotosFile()
  try {
    const data = await fs.readFile(MEMORIAL_PHOTOS_PATH, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading memorial photos data:', error)
    return []
  }
}

// Write photos data
async function writePhotosData(photos: MemorialPhoto[]): Promise<void> {
  await initializePhotosFile()
  try {
    await fs.writeFile(MEMORIAL_PHOTOS_PATH, JSON.stringify(photos, null, 2))
  } catch (error) {
    console.error('Error writing memorial photos data:', error)
    throw error
  }
}

export async function GET(req: NextRequest) {
  try {
    const photos = await readPhotosData()
    return NextResponse.json({ photos })
  } catch (error) {
    console.error('Error fetching memorial photos:', error)
    return NextResponse.json({ error: 'Failed to fetch photos' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    // Check admin authentication
    const cookieHeader = req.headers.get('cookie') || ''
    const isAdmin = cookieHeader.includes('ADMIN_SESSION=1')
    if (!isAdmin) {
      return NextResponse.json({ error: 'Admin access required' }, { status: 401 })
    }

    const { personId, url, pathname } = await req.json()

    if (!personId || !url || !pathname) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const photos = await readPhotosData()
    
    // Remove existing photo for this person if any
    const filteredPhotos = photos.filter(photo => photo.personId !== personId)
    
    // Add new photo
    const newPhoto: MemorialPhoto = {
      personId,
      url,
      pathname,
      uploadedAt: new Date().toISOString()
    }
    
    filteredPhotos.push(newPhoto)
    await writePhotosData(filteredPhotos)

    return NextResponse.json({ ok: true, photo: newPhoto })
  } catch (error) {
    console.error('Error saving memorial photo:', error)
    return NextResponse.json({ error: 'Failed to save photo' }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    // Check admin authentication
    const cookieHeader = req.headers.get('cookie') || ''
    const isAdmin = cookieHeader.includes('ADMIN_SESSION=1')
    if (!isAdmin) {
      return NextResponse.json({ error: 'Admin access required' }, { status: 401 })
    }

    const { personId } = await req.json()

    if (!personId) {
      return NextResponse.json({ error: 'Person ID required' }, { status: 400 })
    }

    const photos = await readPhotosData()
    const filteredPhotos = photos.filter(photo => photo.personId !== personId)
    await writePhotosData(filteredPhotos)

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Error deleting memorial photo:', error)
    return NextResponse.json({ error: 'Failed to delete photo' }, { status: 500 })
  }
}
