import { NextRequest, NextResponse } from 'next/server'
import { Redis } from '@upstash/redis'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// Initialize Redis client
const redis = new Redis({
  url: process.env.REDIS_KV_REST_API_URL!,
  token: process.env.REDIS_KV_REST_API_TOKEN!,
})

// Debug logging (remove in production)
console.log('Redis URL:', process.env.REDIS_KV_REST_API_URL ? 'Set' : 'Not set')
console.log('Redis Token:', process.env.REDIS_KV_REST_API_TOKEN ? 'Set' : 'Not set')

// Key prefix for view counts in Redis
const VIEW_COUNT_PREFIX = 'view_count:'

export async function POST(req: NextRequest) {
  try {
    const { pathname } = await req.json()
    
    if (!pathname) {
      return NextResponse.json({ error: 'Pathname required' }, { status: 400 })
    }

    // Use atomic increment operation in Redis
    const key = `${VIEW_COUNT_PREFIX}${pathname}`
    const newViewCount = await redis.incr(key)
    
    return NextResponse.json({ 
      success: true, 
      viewCount: newViewCount,
      pathname 
    })
  } catch (error) {
    console.error('View counter error:', error)
    return NextResponse.json({ 
      error: 'Failed to update view count' 
    }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const pathname = searchParams.get('pathname')
    
    if (!pathname) {
      return NextResponse.json({ error: 'Pathname required' }, { status: 400 })
    }

    // Get view count from Redis
    const key = `${VIEW_COUNT_PREFIX}${pathname}`
    const viewCount = await redis.get<number>(key) || 0
    
    return NextResponse.json({ 
      viewCount,
      pathname 
    })
  } catch (error) {
    console.error('View counter error:', error)
    return NextResponse.json({ 
      error: 'Failed to get view count' 
    }, { status: 500 })
  }
}
