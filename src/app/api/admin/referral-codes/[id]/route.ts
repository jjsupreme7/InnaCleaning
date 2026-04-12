import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin/auth';
import { getSupabase } from '@/lib/supabase/server';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const unauthorized = await requireAdmin(req);
  if (unauthorized) return unauthorized;

  const { id } = await params;
  const supabase = getSupabase();

  const { data: code, error } = await supabase
    .from('inna_referral_codes')
    .select('*, inna_leads(id, name, email)')
    .eq('id', id)
    .single();

  if (error || !code) {
    return NextResponse.json({ error: 'Code not found.' }, { status: 404 });
  }

  // Also fetch bookings that used this code
  const { data: bookings } = await supabase
    .from('inna_bookings')
    .select('id, name, email, service_type, preferred_date, status, created_at')
    .eq('referral_code_id', id)
    .order('created_at', { ascending: false });

  return NextResponse.json({ code, bookings: bookings ?? [] });
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const unauthorized = await requireAdmin(req);
  if (unauthorized) return unauthorized;

  try {
    const { id } = await params;
    const { active, notes, discount_percent } = await req.json();
    const updates: Record<string, unknown> = {};
    if (typeof active === 'boolean') updates.active = active;
    if (typeof notes === 'string') updates.notes = notes;
    if (typeof discount_percent === 'number') updates.discount_percent = discount_percent;

    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('inna_referral_codes')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: 'Failed to update code.' }, { status: 500 });
    }

    return NextResponse.json({ code: data });
  } catch (error) {
    console.error('Referral code PATCH error:', error);
    return NextResponse.json({ error: 'Failed to update code.' }, { status: 500 });
  }
}
