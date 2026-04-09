import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin/auth';
import { getSupabase } from '@/lib/supabase/server';

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const unauthorized = await requireAdmin(req);
  if (unauthorized) return unauthorized;

  try {
    const { id } = await params;
    const { content, type } = await req.json();

    if (!content) {
      return NextResponse.json({ error: 'Note content is required.' }, { status: 400 });
    }

    const supabase = getSupabase();

    const { data, error } = await supabase
      .from('inna_lead_notes')
      .insert({
        lead_id: id,
        content,
        type: type || 'note',
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: 'Failed to save note.' }, { status: 500 });
    }

    return NextResponse.json({ note: data });
  } catch (error) {
    console.error('Admin note error:', error);
    return NextResponse.json({ error: 'Failed to save note.' }, { status: 500 });
  }
}
