import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin/auth';
import { getSupabase } from '@/lib/supabase/server';

export async function GET(req: Request) {
  const unauthorized = await requireAdmin(req);
  if (unauthorized) return unauthorized;

  try {
    const supabase = getSupabase();
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    let query = supabase
      .from('inna_leads')
      .select('*')
      .order('updated_at', { ascending: false });

    if (status) {
      query = query.eq('status', status);
    }

    if (search) {
      query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%`);
    }

    const statuses = ['new_lead', 'contacted', 'quote_sent', 'follow_up', 'booked', 'lost'] as const;

    const [leadsRes, ...countResults] = await Promise.all([
      query,
      ...statuses.map((s) =>
        supabase.from('inna_leads').select('id', { count: 'exact', head: true }).eq('status', s)
      ),
    ]);

    const counts: Record<string, number> = {};
    statuses.forEach((s, i) => {
      counts[s] = countResults[i].count ?? 0;
    });

    return NextResponse.json({
      leads: leadsRes.data ?? [],
      counts,
    });
  } catch (error) {
    console.error('Admin leads error:', error);
    return NextResponse.json({ error: 'Failed to fetch leads.' }, { status: 500 });
  }
}
