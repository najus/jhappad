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
export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  try {
    // Check admin authentication
    const cookieHeader = req.headers.get('cookie') || ''
    const isAdmin = cookieHeader.includes('ADMIN_SESSION=1')
    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const blobMod = await getBlob()
    if (!blobMod) {
      return NextResponse.json({ error: 'Blob SDK not available' }, { status: 503 })
    }

    const { list } = blobMod

    // List all files with different prefixes to see what's actually there
    const prefixes = [
      'protest/',
      'protests/',
      'protests/sep-8/',
      'protest/pending/',
      'protest/approved/',
      'protests/sep-8/protest/',
      'protests/sep-8/genz/',
    ]

    const results: any = {}

    for (const prefix of prefixes) {
      try {
        const result = await list({ prefix })
        results[prefix] = {
          count: result.blobs.length,
          paths: result.blobs.map(b => b.pathname)
        }
      } catch (e: any) {
        results[prefix] = { error: e?.message || 'Unknown error' }
      }
    }

    return NextResponse.json({ results })
  } catch (e: any) {
    console.error('Debug error:', e)
    return NextResponse.json({ error: e?.message || 'Debug failed' }, { status: 500 })
  }
}
