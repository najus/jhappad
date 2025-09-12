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

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File | null
    const type = (formData.get('type') as string) || 'media'
    const caption = (formData.get('caption') as string) || ''

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Check file size (limit to 100MB for videos, 10MB for images)
    const maxSize = file.type?.startsWith('video/') ? 100 * 1024 * 1024 : 10 * 1024 * 1024
    if (file.size > maxSize) {
      return NextResponse.json({ 
        error: `File too large. Maximum size: ${maxSize / (1024 * 1024)}MB` 
      }, { status: 413 })
    }

    const blobMod = await getBlob()
    if (!blobMod) {
      return NextResponse.json({ error: 'Blob SDK not available. Deploy to Vercel with @vercel/blob.' }, { status: 503 })
    }

    const { put, upload } = blobMod

    // Store first as pending: protests/sep-8/{type}/pending/{timestamp}-{filename}
    const ext = file.name?.split('.').pop() || 'bin'
    const ts = Date.now()
    const pathname = `protests/sep-8/${type}/pending/${ts}-${Math.random().toString(36).slice(2)}.${ext}`
    
    // For large files, use the file stream directly
    // For smaller files, convert to buffer for better compatibility
    let uploadData: File | Buffer
    if (file.size > 50 * 1024 * 1024) { // 50MB threshold
      // Use file directly for large files
      uploadData = file
    } else {
      // Convert to buffer for smaller files
      try {
        const arrayBuffer = await file.arrayBuffer()
        uploadData = Buffer.from(arrayBuffer)
      } catch (error) {
        return NextResponse.json({ 
          error: 'Failed to process file. Please try a smaller file.' 
        }, { status: 400 })
      }
    }
    
    const res = await put(pathname, uploadData, {
      access: 'public',
      addRandomSuffix: false,
      contentType: file.type || undefined,
    })

    return NextResponse.json({ ok: true, url: res.url, pathname })
  } catch (e: any) {
    console.error('Upload error:', e)
    return NextResponse.json({ 
      error: e?.message || 'Upload failed',
      details: e?.stack || 'No additional details'
    }, { status: 500 })
  }
}


