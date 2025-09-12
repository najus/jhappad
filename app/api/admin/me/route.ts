import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'

export async function GET(req: NextRequest) {
  // Check admin session from request headers
  const cookieHeader = req.headers.get('cookie') || ''
  const isAdmin = cookieHeader.includes('ADMIN_SESSION=1')
  return NextResponse.json({ isAdmin })
}



