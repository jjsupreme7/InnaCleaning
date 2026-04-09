import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { supabase } from '@/lib/supabase';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const NOTIFY_EMAILS = [
  'jjgcallen11@gmail.com',
  'tania1rogovska@gmail.com',
];

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required.' }, { status: 400 });
    }

    // Save to Supabase (skip lead linking for now)
    const { error: dbError } = await supabase
      .from('inna_contacts')
      .insert({ name, email, message });

    if (dbError) {
      console.error('Supabase error:', dbError);
      // Don't fail the whole request — still send emails
    }

    // Send email notifications to both addresses
    if (!resend) {
      console.warn('RESEND_API_KEY not set — skipping email notification');
      return NextResponse.json({ success: true });
    }

    const { error: emailError } = await resend.emails.send({
      from: 'Inna Cleaning <onboarding@resend.dev>',
      to: NOTIFY_EMAILS,
      subject: `New Contact Form: ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #dc2626; margin-bottom: 4px;">New Contact Form Submission</h2>
          <p style="color: #666; margin-top: 0;">From the Inna Cleaning website</p>
          <hr style="border: none; border-top: 1px solid #e4e4e7; margin: 20px 0;" />
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #888; width: 80px; vertical-align: top;">Name</td>
              <td style="padding: 8px 0; font-weight: bold;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #888; vertical-align: top;">Email</td>
              <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #dc2626;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #888; vertical-align: top;">Message</td>
              <td style="padding: 8px 0;">${message.replace(/\n/g, '<br>')}</td>
            </tr>
          </table>
          <hr style="border: none; border-top: 1px solid #e4e4e7; margin: 20px 0;" />
          <p style="color: #999; font-size: 12px;">
            Reply directly to <a href="mailto:${email}" style="color: #dc2626;">${email}</a> to respond to this inquiry.
          </p>
        </div>
      `,
      replyTo: email,
    });

    if (emailError) {
      console.error('Resend error:', emailError);
      return NextResponse.json({ error: 'Failed to send notification.' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Contact API error:', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
