import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin/auth';
import { getSupabase } from '@/lib/supabase/server';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const unauthorized = await requireAdmin(req);
  if (unauthorized) return unauthorized;

  try {
    const { id } = await params;
    const supabase = getSupabase();

    const { data, error } = await supabase
      .from('inna_bookings')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      return NextResponse.json({ error: 'Booking not found.' }, { status: 404 });
    }

    return NextResponse.json({ booking: data });
  } catch (error) {
    console.error('Admin booking fetch error:', error);
    return NextResponse.json({ error: 'Failed to load booking.' }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const unauthorized = await requireAdmin(req);
  if (unauthorized) return unauthorized;

  try {
    const { id } = await params;
    const { status } = await req.json();

    const validStatuses = ['pending', 'confirmed', 'completed', 'canceled'];
    if (!status || !validStatuses.includes(status)) {
      return NextResponse.json({ error: 'Invalid status.' }, { status: 400 });
    }

    const supabase = getSupabase();

    const { data, error } = await supabase
      .from('inna_bookings')
      .update({ status })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: 'Failed to update booking.' }, { status: 500 });
    }

    return NextResponse.json({ booking: data });
  } catch (error) {
    console.error('Admin booking update error:', error);
    return NextResponse.json({ error: 'Failed to update booking.' }, { status: 500 });
  }
}
