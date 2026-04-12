import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { getSupabase } from '@/lib/supabase/server';
import { linkOrCreateLead } from '@/lib/crm/link-lead';

// Same generator used in the admin referral-codes route
function generateCode(name: string): string {
  const prefix = (name || 'CLN')
    .replace(/[^a-zA-Z]/g, '')
    .toUpperCase()
    .slice(0, 5) || 'CLN';
  const digits = Math.floor(1000 + Math.random() * 9000).toString();
  return `${prefix}${digits}`;
}

/**
 * Returns the logged-in portal user's referral code, creating one on the fly
 * if it doesn't exist yet. Idempotent — safe to call on every portal load.
 *
 * Client must send the Supabase access token as `Authorization: Bearer <token>`.
 */
export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const token = authHeader.slice(7);

    // Verify the JWT against Supabase — prevents token forgery
    const authClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    );
    const { data: { user }, error: authError } = await authClient.auth.getUser(token);
    if (authError || !user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = getSupabase();

    // Find or create the lead for this user's email
    const displayName =
      (user.user_metadata?.full_name as string | undefined) ||
      (user.user_metadata?.name as string | undefined) ||
      user.email.split('@')[0];
    const leadId = await linkOrCreateLead({
      name: displayName,
      email: user.email,
      source: 'manual',
    });
    if (!leadId) {
      return NextResponse.json({ error: 'Failed to link customer record.' }, { status: 500 });
    }

    const { data: lead } = await supabase
      .from('inna_leads')
      .select('name, referral_credits')
      .eq('id', leadId)
      .single();

    // Check for an existing code (most recent first)
    const { data: existingCode } = await supabase
      .from('inna_referral_codes')
      .select('*')
      .eq('lead_id', leadId)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (existingCode) {
      return NextResponse.json({
        code: existingCode,
        referral_credits: lead?.referral_credits ?? 0,
      });
    }

    // Generate a unique code with collision retry
    let finalCode = '';
    for (let i = 0; i < 5; i++) {
      const candidate = generateCode(lead?.name || displayName);
      const { data: collision } = await supabase
        .from('inna_referral_codes')
        .select('id')
        .eq('code', candidate)
        .maybeSingle();
      if (!collision) {
        finalCode = candidate;
        break;
      }
    }
    if (!finalCode) {
      return NextResponse.json({ error: 'Could not generate a unique code.' }, { status: 500 });
    }

    const { data: newCode, error: createError } = await supabase
      .from('inna_referral_codes')
      .insert({
        code: finalCode,
        lead_id: leadId,
        discount_percent: 12,
      })
      .select()
      .single();

    if (createError) {
      console.error('Portal code create error:', createError);
      return NextResponse.json({ error: 'Failed to create code.' }, { status: 500 });
    }

    return NextResponse.json({
      code: newCode,
      referral_credits: lead?.referral_credits ?? 0,
    });
  } catch (error) {
    console.error('Portal referral code error:', error);
    return NextResponse.json({ error: 'Failed to load referral code.' }, { status: 500 });
  }
}
