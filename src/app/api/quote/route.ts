import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { getSupabase } from '@/lib/supabase/server';
import { linkOrCreateLead } from '@/lib/crm/link-lead';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const NOTIFY_EMAILS = [
  'jjgcallen11@gmail.com',
  'tania1rogovska@gmail.com',
];

const HOME_SIZE_LABELS: Record<string, string> = {
  studio: 'Studio',
  '1bed': '1 Bedroom',
  '2bed': '2 Bedrooms',
  '3bed': '3 Bedrooms',
  '4bed_plus': '4+ Bedrooms',
};

const CLEANING_TYPE_LABELS: Record<string, string> = {
  standard: 'Standard Cleaning',
  deep: 'Deep Cleaning',
  move_in_out: 'Move-In / Move-Out',
  airbnb: 'Airbnb / Short-Term Rental',
};

const CONDITION_LABELS: Record<string, string> = {
  light: 'Light',
  medium: 'Medium',
  heavy: 'Heavy',
};

const FREQUENCY_LABELS: Record<string, string> = {
  one_time: 'One-Time',
  weekly: 'Weekly',
  biweekly: 'Bi-Weekly',
  monthly: 'Monthly',
};

const ADDON_LABELS: Record<string, string> = {
  fridge: 'Inside Fridge',
  oven: 'Inside Oven',
  windows: 'Interior Windows',
  laundry: 'Laundry',
  petHair: 'Pet Hair Removal',
};

export async function POST(req: NextRequest) {
  try {
    const { name, email, home_size, cleaning_type, condition, addons, frequency, estimated_total } = await req.json();

    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required.' }, { status: 400 });
    }

    const leadId = await linkOrCreateLead({ name, email, source: 'quote' });

    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('inna_quotes')
      .insert({ name, email, home_size, cleaning_type, condition, addons: addons || null, frequency, estimated_total: estimated_total || null, lead_id: leadId })
      .select('id')
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: 'Failed to save quote.' }, { status: 500 });
    }

    // Send email notifications
    if (resend) {
      const homeSizeLabel = HOME_SIZE_LABELS[home_size] || home_size;
      const typeLabel = CLEANING_TYPE_LABELS[cleaning_type] || cleaning_type;
      const conditionLabel = CONDITION_LABELS[condition] || condition;
      const frequencyLabel = FREQUENCY_LABELS[frequency] || frequency;
      const selectedAddons = addons
        ? Object.entries(addons)
            .filter(([, v]) => v)
            .map(([k]) => ADDON_LABELS[k] || k)
        : [];
      const addonsText = selectedAddons.length > 0 ? selectedAddons.join(', ') : 'None';
      const priceFormatted = estimated_total ? `$${estimated_total}` : 'N/A';

      // 1. Notification to business owners
      const ownerEmail = resend.emails.send({
        from: 'Inna Cleaning <onboarding@resend.dev>',
        to: NOTIFY_EMAILS,
        subject: `New Quote Request: ${name} — ${typeLabel} (${priceFormatted})`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #dc2626; margin-bottom: 4px;">New Quote Request</h2>
            <p style="color: #666; margin-top: 0;">Someone requested a cleaning quote on the website.</p>
            <hr style="border: none; border-top: 1px solid #e4e4e7; margin: 20px 0;" />
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #888; width: 120px; vertical-align: top;">Name</td>
                <td style="padding: 8px 0; font-weight: bold;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #888; vertical-align: top;">Email</td>
                <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #dc2626;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #888; vertical-align: top;">Home Size</td>
                <td style="padding: 8px 0;">${homeSizeLabel}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #888; vertical-align: top;">Cleaning Type</td>
                <td style="padding: 8px 0;">${typeLabel}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #888; vertical-align: top;">Condition</td>
                <td style="padding: 8px 0;">${conditionLabel}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #888; vertical-align: top;">Frequency</td>
                <td style="padding: 8px 0;">${frequencyLabel}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #888; vertical-align: top;">Add-ons</td>
                <td style="padding: 8px 0;">${addonsText}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #888; vertical-align: top;">Estimated Total</td>
                <td style="padding: 8px 0; font-weight: bold; font-size: 18px; color: #dc2626;">${priceFormatted}</td>
              </tr>
            </table>
            <hr style="border: none; border-top: 1px solid #e4e4e7; margin: 20px 0;" />
            <p style="color: #999; font-size: 12px;">
              Reply directly to <a href="mailto:${email}" style="color: #dc2626;">${email}</a> to follow up with this customer.
            </p>
          </div>
        `,
        replyTo: email,
      });

      // 2. Confirmation to the customer
      const customerEmail = resend.emails.send({
        from: 'Inna Cleaning <onboarding@resend.dev>',
        to: [email],
        subject: `Your Cleaning Quote — ${priceFormatted}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #dc2626; margin-bottom: 4px;">Thanks for your quote request, ${name}!</h2>
            <p style="color: #666; margin-top: 0;">Here's a summary of your estimated cleaning quote.</p>
            <hr style="border: none; border-top: 1px solid #e4e4e7; margin: 20px 0;" />
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #888; width: 120px; vertical-align: top;">Home Size</td>
                <td style="padding: 8px 0;">${homeSizeLabel}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #888; vertical-align: top;">Cleaning Type</td>
                <td style="padding: 8px 0;">${typeLabel}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #888; vertical-align: top;">Condition</td>
                <td style="padding: 8px 0;">${conditionLabel}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #888; vertical-align: top;">Frequency</td>
                <td style="padding: 8px 0;">${frequencyLabel}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #888; vertical-align: top;">Add-ons</td>
                <td style="padding: 8px 0;">${addonsText}</td>
              </tr>
            </table>
            <hr style="border: none; border-top: 1px solid #e4e4e7; margin: 20px 0;" />
            <div style="text-align: center; padding: 16px 0;">
              <p style="font-size: 14px; color: #888; margin-bottom: 4px;">Your Estimated Total</p>
              <p style="font-size: 32px; font-weight: bold; color: #dc2626; margin: 0;">${priceFormatted}</p>
            </div>
            <hr style="border: none; border-top: 1px solid #e4e4e7; margin: 20px 0;" />
            <p style="color: #444; font-size: 14px; line-height: 1.6;">
              This is an estimate based on the details you provided. Final pricing may vary depending on the specific needs of your home. We'll be in touch shortly to confirm the details and schedule your cleaning.
            </p>
            <div style="text-align: center; margin-top: 24px;">
              <a href="https://innacleaning.com/booking" style="display: inline-block; background: #dc2626; color: white; padding: 12px 32px; border-radius: 8px; text-decoration: none; font-weight: bold;">Book Your Cleaning</a>
            </div>
            <hr style="border: none; border-top: 1px solid #e4e4e7; margin: 24px 0;" />
            <p style="color: #999; font-size: 12px; text-align: center;">
              Questions? Reply to this email or DM us on <a href="https://instagram.com/INNAS_CLEANING" style="color: #dc2626;">Instagram</a>.
            </p>
          </div>
        `,
        replyTo: NOTIFY_EMAILS[1],
      });

      const [ownerResult, customerResult] = await Promise.all([ownerEmail, customerEmail]);

      if (ownerResult.error) console.error('Owner email error:', ownerResult.error);
      if (customerResult.error) console.error('Customer email error:', customerResult.error);
    } else {
      console.warn('RESEND_API_KEY not set — skipping quote email notifications');
    }

    return NextResponse.json({ success: true, id: data.id });
  } catch (err) {
    console.error('Quote API error:', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
