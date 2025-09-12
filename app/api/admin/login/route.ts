import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json()
    const expected = process.env.ADMIN_PASSWORD || process.env.ADMIN_TOKEN
    if (!expected) {
      return NextResponse.json({ error: 'Server not configured' }, { status: 500 })
    }
    if (!password || password !== expected) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }
    const res = NextResponse.json({ ok: true })
    // Simple flag cookie; short TTL can be adjusted
    res.cookies.set('ADMIN_SESSION', '1', {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 8, // 8 hours
    })
    return res
  } catch (e: any) {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 })
  }
}



