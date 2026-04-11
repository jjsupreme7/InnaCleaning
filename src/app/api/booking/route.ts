import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { getSupabase } from '@/lib/supabase/server';
import { linkOrCreateLead } from '@/lib/crm/link-lead';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const NOTIFY_EMAILS = [
  'jjgcallen11@gmail.com',
  // 'tania1rogovska@gmail.com', // TODO: re-enable once custom domain is set up in Resend
];

const SERVICE_LABELS: Record<string, string> = {
  standard: 'Standard Cleaning',
  deep: 'Deep Cleaning',
  move_in_out: 'Move-In / Move-Out',
  airbnb: 'Airbnb / Short-Term Rental',
};

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

    // Send email notifications
    if (resend) {
      const serviceLabel = SERVICE_LABELS[service_type] || service_type;
      const dateFormatted = new Date(preferred_date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });

      // 1. Notification to business owners
      const ownerEmail = resend.emails.send({
        from: 'Inna Cleaning <onboarding@resend.dev>',
        to: NOTIFY_EMAILS,
        subject: `New Booking: ${name} — ${serviceLabel} on ${dateFormatted}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #dc2626; margin-bottom: 4px;">New Booking Request</h2>
            <p style="color: #666; margin-top: 0;">Someone booked a cleaning on the website.</p>
            <hr style="border: none; border-top: 1px solid #e4e4e7; margin: 20px 0;" />
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; color: #888; width: 120px;">Name</td><td style="padding: 8px 0; font-weight: bold;">${name}</td></tr>
              <tr><td style="padding: 8px 0; color: #888;">Phone</td><td style="padding: 8px 0;"><a href="tel:${phone}" style="color: #dc2626;">${phone}</a></td></tr>
              <tr><td style="padding: 8px 0; color: #888;">Email</td><td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #dc2626;">${email}</a></td></tr>
              <tr><td style="padding: 8px 0; color: #888;">Address</td><td style="padding: 8px 0;">${address}</td></tr>
              <tr><td style="padding: 8px 0; color: #888;">Service</td><td style="padding: 8px 0;">${serviceLabel}</td></tr>
              <tr><td style="padding: 8px 0; color: #888;">Date</td><td style="padding: 8px 0; font-weight: bold;">${dateFormatted}</td></tr>
              <tr><td style="padding: 8px 0; color: #888;">Time</td><td style="padding: 8px 0;">${preferred_time}</td></tr>
              ${notes ? `<tr><td style="padding: 8px 0; color: #888;">Notes</td><td style="padding: 8px 0;">${notes}</td></tr>` : ''}
            </table>
            <hr style="border: none; border-top: 1px solid #e4e4e7; margin: 20px 0;" />
            <p style="color: #999; font-size: 12px;">Reply directly to <a href="mailto:${email}" style="color: #dc2626;">${email}</a> to confirm this booking.</p>
          </div>
        `,
        replyTo: email,
      });

      // 2. Confirmation to the customer
      const customerEmail = resend.emails.send({
        from: 'Inna Cleaning <onboarding@resend.dev>',
        to: [email],
        subject: `Booking Confirmed — ${serviceLabel} on ${dateFormatted}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #dc2626; margin-bottom: 4px;">Thanks for booking, ${name}!</h2>
            <p style="color: #666; margin-top: 0;">Here are your booking details.</p>
            <hr style="border: none; border-top: 1px solid #e4e4e7; margin: 20px 0;" />
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; color: #888; width: 120px;">Service</td><td style="padding: 8px 0;">${serviceLabel}</td></tr>
              <tr><td style="padding: 8px 0; color: #888;">Date</td><td style="padding: 8px 0; font-weight: bold;">${dateFormatted}</td></tr>
              <tr><td style="padding: 8px 0; color: #888;">Time</td><td style="padding: 8px 0;">${preferred_time}</td></tr>
              <tr><td style="padding: 8px 0; color: #888;">Address</td><td style="padding: 8px 0;">${address}</td></tr>
            </table>
            <hr style="border: none; border-top: 1px solid #e4e4e7; margin: 20px 0;" />
            <p style="color: #444; font-size: 14px; line-height: 1.6;">
              We'll confirm your appointment shortly. If you need to make changes, reply to this email or DM us on <a href="https://instagram.com/INNAS_CLEANING" style="color: #dc2626;">Instagram</a>.
            </p>
            <hr style="border: none; border-top: 1px solid #e4e4e7; margin: 24px 0;" />
            <p style="color: #999; font-size: 12px; text-align: center;">Inna Cleaning — Professional Home Cleaning in Seattle</p>
          </div>
        `,
        replyTo: NOTIFY_EMAILS[0],
      });

      const [ownerResult, customerResult] = await Promise.all([ownerEmail, customerEmail]);
      if (ownerResult.error) console.error('Owner email error:', ownerResult.error);
      if (customerResult.error) console.error('Customer email error:', customerResult.error);
    } else {
      console.warn('RESEND_API_KEY not set — skipping booking email notifications');
    }

    return NextResponse.json({ success: true, id: data.id });
  } catch (err) {
    console.error('Booking API error:', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
