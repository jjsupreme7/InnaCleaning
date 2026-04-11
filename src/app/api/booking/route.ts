import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase/server';
import { linkOrCreateLead } from '@/lib/crm/link-lead';

export async function POST(req: NextRequest) {
  try {
    const { name, phone, email, address, service_type, preferred_date, preferred_time, notes } = await req.json();

    if (!name || !phone || !email || !address || !service_type || !preferred_date || !preferred_time) {
      return NextResponse.json({ error: 'All required fields must be filled out.' }, { status: 400 });
    }

    const leadId = await linkOrCreateLead({ name, email, phone, address, source: 'booking' });

    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('inna_bookings')
      .insert({ name, phone, email, address, service_type, preferred_date, preferred_time, notes: notes || null, lead_id: leadId })
      .select('id')
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: 'Failed to save booking.' }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: data.id });
  } catch (err) {
    console.error('Booking API error:', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
