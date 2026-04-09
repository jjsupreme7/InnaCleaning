import { getSupabase } from '@/lib/supabase/server';

interface LeadInput {
  name: string;
  email: string;
  phone?: string | null;
  address?: string | null;
  source: 'booking' | 'quote' | 'contact' | 'manual';
}

export async function linkOrCreateLead(input: LeadInput): Promise<string | null> {
  const supabase = getSupabase();
  const email = input.email.toLowerCase().trim();

  try {
    const { data: existing } = await supabase
      .from('inna_leads')
      .select('id')
      .eq('email', email)
      .single();

    if (existing) {
      const updates: Record<string, string> = {};
      if (input.phone) updates.phone = input.phone;
      if (input.address) updates.address = input.address;

      if (Object.keys(updates).length > 0) {
        await supabase.from('inna_leads').update(updates).eq('id', existing.id);
      }

      return existing.id;
    }

    const { data: created } = await supabase
      .from('inna_leads')
      .insert({
        name: input.name,
        email,
        phone: input.phone || null,
        address: input.address || null,
        source: input.source,
        status: 'new_lead',
      })
      .select('id')
      .single();

    return created?.id ?? null;
  } catch {
    console.error('Failed to link/create lead for:', email);
    return null;
  }
}
