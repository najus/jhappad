import { NextRequest, NextResponse } from 'next/server'

// We will dynamically import @vercel/blob to avoid local dev failures if not installed
async function getBlob() {
  try {
    // @ts-ignore
    const mod = await import('@vercel/blob')
    return mod
  } catch (e) {
    return null
  }
}

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    // Check admin authentication
    const cookieHeader = req.headers.get('cookie') || ''
    const isAdmin = cookieHeader.includes('ADMIN_SESSION=1')
    if (!isAdmin) {
      return NextResponse.json({ error: 'Admin access required' }, { status: 401 })
    }

    const formData = await req.formData()
    const file = formData.get('file') as File | null
    const personId = formData.get('personId') as string

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    if (!personId) {
      return NextResponse.json({ error: 'Person ID required' }, { status: 400 })
    }

    // Check file size (limit to 10MB for images)
    const maxSize = 10 * 1024 * 1024 // 10MB
    if (file.size > maxSize) {
      return NextResponse.json({ 
        error: `File too large. Maximum size: ${maxSize / (1024 * 1024)}MB` 
      }, { status: 413 })
    }

    // Check file type (only images)
    if (!file.type?.startsWith('image/')) {
      return NextResponse.json({ 
        error: 'Only image files are allowed' 
      }, { status: 400 })
    }

    const blobMod = await getBlob()
    if (!blobMod) {
      return NextResponse.json({ error: 'Blob SDK not available. Deploy to Vercel with @vercel/blob.' }, { status: 503 })
    }

    const { put } = blobMod

    // Store as: memorial/photos/{personId}-{timestamp}.{ext}
    const ext = file.name?.split('.').pop() || 'jpg'
    const ts = Date.now()
    const pathname = `memorial/photos/${personId}-${ts}.${ext}`
    
    // Convert to buffer for better compatibility
    let uploadData: Buffer
    try {
      const arrayBuffer = await file.arrayBuffer()
      uploadData = Buffer.from(arrayBuffer)
    } catch (error) {
      return NextResponse.json({ 
        error: 'Failed to process file. Please try again.' 
      }, { status: 400 })
    }
    
    const res = await put(pathname, uploadData, {
      access: 'public',
      addRandomSuffix: false,
      contentType: file.type || 'image/jpeg',
    })

    return NextResponse.json({ 
      ok: true, 
      url: res.url, 
      pathname,
      personId: parseInt(personId)
    })
  } catch (e: any) {
    console.error('Memorial photo upload error:', e)
    return NextResponse.json({ 
      error: e?.message || 'Upload failed',
      details: e?.stack || 'No additional details'
    }, { status: 500 })
  }
}
