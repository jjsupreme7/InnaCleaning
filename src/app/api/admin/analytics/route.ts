import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin/auth';
import { getAnalyticsData } from '@/lib/analytics/ga4';

export async function GET(req: Request) {
  const unauthorized = await requireAdmin(req);
  if (unauthorized) return unauthorized;

  try {
    const { searchParams } = new URL(req.url);
    const range = searchParams.get('range') || '30d';

    if (!['7d', '30d', '90d'].includes(range)) {
      return NextResponse.json({ error: 'Invalid range.' }, { status: 400 });
    }

    const data = await getAnalyticsData(range as '7d' | '30d' | '90d');
    return NextResponse.json(data);
  } catch (error) {
    console.error('Admin analytics error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics data.' },
      { status: 500 }
    );
  }
}
