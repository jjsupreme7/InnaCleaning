import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin/auth';
import { getSupabase } from '@/lib/supabase/server';

// Readable code: first 5 letters of name + 4 random digits (e.g., SARAH4271)
function generateCode(name: string): string {
  const prefix = (name || 'CLN')
    .replace(/[^a-zA-Z]/g, '')
    .toUpperCase()
    .slice(0, 5) || 'CLN';
  const digits = Math.floor(1000 + Math.random() * 9000).toString();
  return `${prefix}${digits}`;
}

export async function GET(req: Request) {
  const unauthorized = await requireAdmin(req);
  if (unauthorized) return unauthorized;

  const supabase = getSupabase();
  const { data, error } = await supabase
    .from('inna_referral_codes')
    .select('id, code, lead_id, discount_percent, max_uses, uses_count, active, notes, created_at, inna_leads(name, email)')
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: 'Failed to load referral codes.' }, { status: 500 });
  }

  return NextResponse.json({ codes: data });
}

export async function POST(req: Request) {
  const unauthorized = await requireAdmin(req);
  if (unauthorized) return unauthorized;

  try {
    const { lead_id, code, discount_percent, notes } = await req.json();

    if (!lead_id) {
      return NextResponse.json({ error: 'Missing lead_id.' }, { status: 400 });
    }

    const supabase = getSupabase();

    // Look up the lead to get their name for code generation
    const { data: lead, error: leadError } = await supabase
      .from('inna_leads')
      .select('id, name')
      .eq('id', lead_id)
      .single();

    if (leadError || !lead) {
      return NextResponse.json({ error: 'Customer not found.' }, { status: 404 });
    }

    // Generate code if not provided, retry on collision
    let finalCode = (code || '').trim().toUpperCase();
    if (!finalCode) {
      for (let i = 0; i < 5; i++) {
        const candidate = generateCode(lead.name);
        const { data: existing } = await supabase
          .from('inna_referral_codes')
          .select('id')
          .eq('code', candidate)
          .maybeSingle();
        if (!existing) {
          finalCode = candidate;
          break;
        }
      }
      if (!finalCode) {
        return NextResponse.json({ error: 'Could not generate a unique code.' }, { status: 500 });
      }
    }

    const { data, error } = await supabase
      .from('inna_referral_codes')
      .insert({
        code: finalCode,
        lead_id,
        discount_percent: discount_percent ?? 12,
        notes: notes || null,
      })
      .select('*, inna_leads(name, email)')
      .single();

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json({ error: 'That code already exists.' }, { status: 409 });
      }
      console.error('Create referral code error:', error);
      return NextResponse.json({ error: 'Failed to create code.' }, { status: 500 });
    }

    return NextResponse.json({ code: data });
  } catch (error) {
    console.error('Referral code POST error:', error);
    return NextResponse.json({ error: 'Failed to create code.' }, { status: 500 });
  }
}
