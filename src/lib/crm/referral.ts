import { getSupabase } from '@/lib/supabase/server';

export interface UseReferralCodeResult {
  codeId: string;
  leadId: string;
  discountPercent: number;
  reachedMax: boolean;
}

/**
 * Validate a referral code, atomically increment its use count, and deactivate
 * it if it hit the max uses. Returns null if the code doesn't exist, isn't
 * active, or has already been fully used.
 *
 * Also adds `max_uses` reward credits to the referrer's lead when the code
 * hits its cap.
 */
export async function validateAndUseReferralCode(code: string): Promise<UseReferralCodeResult | null> {
  const supabase = getSupabase();
  const normalized = code.trim().toUpperCase();

  // Look up the code
  const { data: referral, error } = await supabase
    .from('inna_referral_codes')
    .select('id, lead_id, discount_percent, max_uses, uses_count, active')
    .eq('code', normalized)
    .maybeSingle();

  if (error || !referral || !referral.active) return null;
  if (referral.uses_count >= referral.max_uses) return null;

  const newCount = referral.uses_count + 1;
  const reachedMax = newCount >= referral.max_uses;

  // Increment and (if we hit max) deactivate the code
  const { error: updateError } = await supabase
    .from('inna_referral_codes')
    .update({
      uses_count: newCount,
      active: !reachedMax,
    })
    .eq('id', referral.id);

  if (updateError) return null;

  // If the code just hit max, reward the referrer with `max_uses` credits
  if (reachedMax) {
    const { data: referrer } = await supabase
      .from('inna_leads')
      .select('referral_credits')
      .eq('id', referral.lead_id)
      .single();

    const currentCredits = referrer?.referral_credits ?? 0;
    await supabase
      .from('inna_leads')
      .update({ referral_credits: currentCredits + referral.max_uses })
      .eq('id', referral.lead_id);
  }

  return {
    codeId: referral.id,
    leadId: referral.lead_id,
    discountPercent: referral.discount_percent,
    reachedMax,
  };
}

/**
 * If the given lead has reward credits remaining, consume one and return true.
 * Used by the booking API to mark a booking as a reward-redeemed booking.
 */
export async function consumeReferralRewardCredit(leadId: string): Promise<boolean> {
  const supabase = getSupabase();

  const { data: lead } = await supabase
    .from('inna_leads')
    .select('referral_credits')
    .eq('id', leadId)
    .single();

  if (!lead || lead.referral_credits <= 0) return false;

  const { error } = await supabase
    .from('inna_leads')
    .update({ referral_credits: lead.referral_credits - 1 })
    .eq('id', leadId);

  return !error;
}
