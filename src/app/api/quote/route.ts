import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  try {
    const { name, email, home_size, cleaning_type, condition, addons, frequency, estimated_total } = await req.json();

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required.' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('inna_quotes')
      .insert({ name, email, home_size, cleaning_type, condition, addons: addons || null, frequency, estimated_total: estimated_total || null })
      .select('id')
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: 'Failed to save quote.' }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: data.id });
  } catch (err) {
    console.error('Quote API error:', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
