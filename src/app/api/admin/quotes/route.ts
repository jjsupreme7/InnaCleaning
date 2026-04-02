import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin/auth';
import { getSupabase } from '@/lib/supabase/server';

export async function GET(req: Request) {
  const unauthorized = await requireAdmin(req);
  if (unauthorized) return unauthorized;

  try {
    const { data, error } = await getSupabase()
      .from('inna_quotes')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return NextResponse.json({ quotes: data });
  } catch (error) {
    console.error('Admin quotes error:', error);
    return NextResponse.json({ error: 'Failed to fetch quotes.' }, { status: 500 });
  }
}
