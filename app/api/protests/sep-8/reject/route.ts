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

    const { del } = blobMod

    // Delete the pending file
    await del(pathname)

    return NextResponse.json({ ok: true })
  } catch (e: any) {
    console.error('Reject error:', e)
    return NextResponse.json({ error: e?.message || 'Rejection failed' }, { status: 500 })
  }
}
