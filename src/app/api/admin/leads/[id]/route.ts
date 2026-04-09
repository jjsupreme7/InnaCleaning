import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin/auth';
import { getSupabase } from '@/lib/supabase/server';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const unauthorized = await requireAdmin(req);
  if (unauthorized) return unauthorized;

  try {
    const { id } = await params;
    const supabase = getSupabase();

    const [leadRes, bookingsRes, quotesRes, contactsRes, notesRes] = await Promise.all([
      supabase.from('inna_leads').select('*').eq('id', id).single(),
      supabase.from('inna_bookings').select('*').eq('lead_id', id).order('created_at', { ascending: false }),
      supabase.from('inna_quotes').select('*').eq('lead_id', id).order('created_at', { ascending: false }),
      supabase.from('inna_contacts').select('*').eq('lead_id', id).order('created_at', { ascending: false }),
      supabase.from('inna_lead_notes').select('*').eq('lead_id', id).order('created_at', { ascending: false }),
    ]);

    if (leadRes.error || !leadRes.data) {
      return NextResponse.json({ error: 'Lead not found.' }, { status: 404 });
    }

    return NextResponse.json({
      lead: leadRes.data,
      bookings: bookingsRes.data ?? [],
      quotes: quotesRes.data ?? [],
      contacts: contactsRes.data ?? [],
      notes: notesRes.data ?? [],
    });
  } catch (error) {
    console.error('Admin lead detail error:', error);
    return NextResponse.json({ error: 'Failed to fetch lead.' }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const unauthorized = await requireAdmin(req);
  if (unauthorized) return unauthorized;

  try {
    const { id } = await params;
    const body = await req.json();
    const supabase = getSupabase();

    const allowed = ['status', 'name', 'phone', 'address', 'tags'];
    const updates: Record<string, unknown> = {};
    for (const key of allowed) {
      if (key in body) updates[key] = body[key];
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: 'No valid fields to update.' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('inna_leads')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: 'Failed to update lead.' }, { status: 500 });
    }

    return NextResponse.json({ lead: data });
  } catch (error) {
    console.error('Admin lead update error:', error);
    return NextResponse.json({ error: 'Failed to update lead.' }, { status: 500 });
  }
}
