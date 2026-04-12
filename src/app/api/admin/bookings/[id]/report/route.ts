import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin/auth';
import { getSupabase } from '@/lib/supabase/server';

interface ReportBody {
  completed_tasks: string[];
  photos: string[];
  notes?: string | null;
}

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const unauthorized = await requireAdmin(req);
  if (unauthorized) return unauthorized;

  try {
    const { id: bookingId } = await params;
    const body = (await req.json()) as ReportBody;

    if (!Array.isArray(body.completed_tasks) || !Array.isArray(body.photos)) {
      return NextResponse.json({ error: 'Invalid payload.' }, { status: 400 });
    }

    const supabase = getSupabase();

    // Upsert the report (one per booking thanks to the unique constraint on booking_id)
    const { data: report, error: reportError } = await supabase
      .from('inna_cleaning_reports')
      .upsert(
        {
          booking_id: bookingId,
          completed_tasks: body.completed_tasks,
          photos: body.photos,
          notes: body.notes || null,
          completed_at: new Date().toISOString(),
        },
        { onConflict: 'booking_id' },
      )
      .select()
      .single();

    if (reportError) {
      console.error('Report upsert error:', reportError);
      return NextResponse.json({ error: 'Failed to save report.' }, { status: 500 });
    }

    // Mark the booking completed
    const { error: bookingError } = await supabase
      .from('inna_bookings')
      .update({ status: 'completed' })
      .eq('id', bookingId);

    if (bookingError) {
      console.error('Booking status update error:', bookingError);
      return NextResponse.json({ error: 'Report saved but failed to mark booking complete.' }, { status: 500 });
    }

    return NextResponse.json({ report });
  } catch (error) {
    console.error('Report save error:', error);
    return NextResponse.json({ error: 'Failed to save report.' }, { status: 500 });
  }
}

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const unauthorized = await requireAdmin(req);
  if (unauthorized) return unauthorized;

  try {
    const { id: bookingId } = await params;
    const supabase = getSupabase();

    const { data, error } = await supabase
      .from('inna_cleaning_reports')
      .select('*')
      .eq('booking_id', bookingId)
      .maybeSingle();

    if (error) {
      return NextResponse.json({ error: 'Failed to load report.' }, { status: 500 });
    }

    return NextResponse.json({ report: data });
  } catch (error) {
    console.error('Report load error:', error);
    return NextResponse.json({ error: 'Failed to load report.' }, { status: 500 });
  }
}
