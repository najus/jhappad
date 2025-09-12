import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    
    if (!id) {
      return NextResponse.json({ error: 'Politician ID required' }, { status: 400 })
    }

    // For now, return a simple response
    // In the future, this could fetch specific politician data
    return NextResponse.json({ 
      id,
      message: 'Politician API endpoint - functionality to be implemented'
    })
  } catch (error) {
    console.error('Politician API error:', error)
    return NextResponse.json({ 
      error: 'Failed to fetch politician data' 
    }, { status: 500 })
  }
}
