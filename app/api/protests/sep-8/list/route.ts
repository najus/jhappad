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
    const { searchParams } = new URL(req.url)
    const type = (searchParams.get('type') || 'media').toString()
    const status = (searchParams.get('status') || 'approved').toString()

    // For pending list, require admin token
    if (status === 'pending') {
      // Cookie-based admin session - check from request headers
      const cookieHeader = req.headers.get('cookie') || ''
      const isAdmin = cookieHeader.includes('ADMIN_SESSION=1')
      if (!isAdmin) return NextResponse.json({ items: [] })
    }

    const blobMod = await getBlob()
    if (!blobMod) {
      return NextResponse.json({ items: [] })
    }

    const { list } = blobMod

    // Use the correct path structure: protests/sep-8/{type}/{status}/
    const base = `protests/sep-8/${type}/${status}`
    let result = await list({ prefix: base })
  
    const items = result.blobs.map((b) => {
      // Fallback contentType detection based on file extension
      let contentType = (b as any).contentType
      if (!contentType) {
        const extension = b.pathname.split('.').pop()?.toLowerCase()
        switch (extension) {
          case 'jpg':
          case 'jpeg':
            contentType = 'image/jpeg'
            break
          case 'png':
            contentType = 'image/png'
            break
          case 'gif':
            contentType = 'image/gif'
            break
          case 'webp':
            contentType = 'image/webp'
            break
          case 'mp4':
            contentType = 'video/mp4'
            break
          case 'mov':
            contentType = 'video/quicktime'
            break
          case 'avi':
            contentType = 'video/x-msvideo'
            break
          case 'pdf':
            contentType = 'application/pdf'
            break
          default:
            contentType = 'application/octet-stream'
        }
      }
      
      return {
        url: b.url,
        pathname: b.pathname,
        uploadedAt: b.uploadedAt?.toString?.() ?? undefined,
        size: b.size,
        contentType,
        caption: ((b as any).metadata as any)?.caption || undefined,
      }
    })

    return NextResponse.json({ items })
  } catch (error) {
    console.error('List API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}


