import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin/auth';
import { getSupabase } from '@/lib/supabase/server';

export async function GET(req: Request) {
  const unauthorized = await requireAdmin(req);
  if (unauthorized) return unauthorized;

  try {
    const supabase = getSupabase();

    const [contacts, bookings, quotes, users] = await Promise.all([
      supabase.from('inna_contacts').select('id, created_at', { count: 'exact' }),
      supabase.from('inna_bookings').select('id, created_at', { count: 'exact' }),
      supabase.from('inna_quotes').select('id, created_at', { count: 'exact' }),
      supabase.auth.admin.listUsers(),
    ]);

    return NextResponse.json({
      contacts: contacts.count ?? 0,
      bookings: bookings.count ?? 0,
      quotes: quotes.count ?? 0,
      users: users.data?.users?.length ?? 0,
    });
  } catch (error) {
    console.error('Admin stats error:', error);
    return NextResponse.json({ error: 'Failed to fetch stats.' }, { status: 500 });
  }
}
