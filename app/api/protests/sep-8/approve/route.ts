import { NextRequest, NextResponse } from 'next/server'

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
    // Check admin authentication
    const cookieHeader = req.headers.get('cookie') || ''
    const isAdmin = cookieHeader.includes('ADMIN_SESSION=1')
    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { pathname } = await req.json()
    if (!pathname) {
      return NextResponse.json({ error: 'Pathname required' }, { status: 400 })
    }

    const blobMod = await getBlob()
    if (!blobMod) {
      return NextResponse.json({ error: 'Blob SDK not available' }, { status: 503 })
    }

    const { put, del, head } = blobMod

    // Extract the type and filename from the pending path
    // Expected format: protests/sep-8/{type}/pending/{filename}
    const pathParts = pathname.split('/')
    if (pathParts.length < 5 || pathParts[3] !== 'pending') {
      return NextResponse.json({ error: 'Invalid pathname format' }, { status: 400 })
    }

    const type = pathParts[2] // genz or protest
    const filename = pathParts.slice(4).join('/') // everything after pending/
    const approvedPathname = `protests/sep-8/${type}/approved/${filename}`

    // Get the file info from the pending location
    const fileInfo = await head(pathname)
    if (!fileInfo) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 })
    }

    // Download the file content
    const response = await fetch(fileInfo.url)
    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to download file' }, { status: 500 })
    }
    
    const fileBuffer = await response.arrayBuffer()
    const file = new File([fileBuffer], filename, { type: fileInfo.contentType || 'application/octet-stream' })

    // Upload to approved location
    await put(approvedPathname, file, {
      access: 'public',
      addRandomSuffix: false,
      contentType: fileInfo.contentType || undefined,
      metadata: fileInfo.metadata || undefined,
    })
    
    // Delete the pending file
    await del(pathname)

    return NextResponse.json({ ok: true, newPathname: approvedPathname })
  } catch (e: any) {
    console.error('Approve error:', e)
    return NextResponse.json({ error: e?.message || 'Approval failed' }, { status: 500 })
  }
}
