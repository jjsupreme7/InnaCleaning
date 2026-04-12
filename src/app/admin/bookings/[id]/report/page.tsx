'use client';

import { useEffect, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { services } from '@/data/services';
import { Check, Camera, X, ArrowLeft, Loader2 } from 'lucide-react';

interface Booking {
  id: string;
  name: string;
  email: string;
  address: string;
  service_type: string;
  preferred_date: string;
  preferred_time: string;
  status: string;
}

export default function CleaningReportPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const bookingId = params.id;

  const [booking, setBooking] = useState<Booking | null>(null);
  const [checklist, setChecklist] = useState<string[]>([]);
  const [checkedTasks, setCheckedTasks] = useState<Set<string>>(new Set());
  const [photos, setPhotos] = useState<string[]>([]);
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function load() {
      try {
        const [bookingRes, reportRes] = await Promise.all([
          fetch(`/api/admin/bookings/${bookingId}`),
          fetch(`/api/admin/bookings/${bookingId}/report`),
        ]);

        const bookingData = await bookingRes.json();
        if (!bookingRes.ok) {
          setError(bookingData.error || 'Failed to load booking.');
          return;
        }

        const b: Booking = bookingData.booking;
        setBooking(b);

        // Build checklist from the service type's includes
        const svc = services.find((s) => s.id === b.service_type);
        setChecklist(svc?.includes ?? []);

        // If a report already exists, pre-populate the form
        if (reportRes.ok) {
          const reportData = await reportRes.json();
          if (reportData.report) {
            setCheckedTasks(new Set(reportData.report.completed_tasks ?? []));
            setPhotos(reportData.report.photos ?? []);
            setNotes(reportData.report.notes ?? '');
          }
        }
      } catch {
        setError('Failed to load booking.');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [bookingId]);

  const toggleTask = (task: string) => {
    setCheckedTasks((prev) => {
      const next = new Set(prev);
      if (next.has(task)) next.delete(task);
      else next.add(task);
      return next;
    });
  };

  const toggleAll = () => {
    if (checkedTasks.size === checklist.length) {
      setCheckedTasks(new Set());
    } else {
      setCheckedTasks(new Set(checklist));
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setError('');

    try {
      for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append('file', file);
        const res = await fetch(`/api/admin/bookings/${bookingId}/report/photos`, {
          method: 'POST',
          body: formData,
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data.error || 'Upload failed.');
          break;
        }
        setPhotos((prev) => [...prev, data.url]);
      }
    } catch {
      setError('Upload failed.');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const removePhoto = (url: string) => {
    setPhotos((prev) => prev.filter((p) => p !== url));
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');
    try {
      const res = await fetch(`/api/admin/bookings/${bookingId}/report`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          completed_tasks: Array.from(checkedTasks),
          photos,
          notes: notes.trim() || null,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Save failed.');
        return;
      }
      router.push('/admin/bookings');
    } catch {
      setError('Save failed.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-60">
        <Loader2 className="w-6 h-6 text-red-500 animate-spin" />
      </div>
    );
  }

  if (!booking) {
    return (
      <div>
        <Link href="/admin/bookings" className="text-zinc-400 text-sm hover:text-white">← Back to bookings</Link>
        <p className="text-red-400 text-sm mt-4">{error || 'Booking not found.'}</p>
      </div>
    );
  }

  const allChecked = checkedTasks.size === checklist.length && checklist.length > 0;

  return (
    <div className="max-w-2xl">
      <Link href="/admin/bookings" className="inline-flex items-center gap-1.5 text-zinc-400 text-sm hover:text-white mb-4">
        <ArrowLeft className="w-4 h-4" />
        Back to bookings
      </Link>

      <h1 className="text-2xl font-bold text-white mb-1">Cleaning Report</h1>
      <p className="text-zinc-500 text-sm mb-6">
        {booking.name} — {booking.preferred_date} at {booking.preferred_time}
      </p>

      {/* Booking summary */}
      <div className="bg-zinc-900 border border-zinc-800 p-4 mb-6">
        <p className="text-xs uppercase tracking-widest font-bold text-zinc-600 mb-1">Address</p>
        <p className="text-zinc-300 text-sm mb-3">{booking.address}</p>
        <p className="text-xs uppercase tracking-widest font-bold text-zinc-600 mb-1">Service</p>
        <p className="text-zinc-300 text-sm capitalize">{booking.service_type.replace('_', ' ')}</p>
      </div>

      {/* Checklist */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm uppercase tracking-widest font-bold text-zinc-400">Checklist</h2>
          <button
            type="button"
            onClick={toggleAll}
            className="text-xs text-red-400 hover:text-red-300 font-bold uppercase tracking-wider"
          >
            {allChecked ? 'Uncheck all' : 'Check all'}
          </button>
        </div>
        <div className="space-y-2">
          {checklist.length === 0 && (
            <p className="text-zinc-500 text-sm">No checklist available for this service type.</p>
          )}
          {checklist.map((task) => {
            const checked = checkedTasks.has(task);
            return (
              <button
                key={task}
                type="button"
                onClick={() => toggleTask(task)}
                className={`w-full flex items-start gap-3 p-3 border text-left transition-colors ${
                  checked
                    ? 'bg-red-950/20 border-red-900/50'
                    : 'bg-zinc-900 border-zinc-800 hover:border-zinc-700'
                }`}
              >
                <div
                  className={`shrink-0 w-5 h-5 rounded border flex items-center justify-center mt-0.5 ${
                    checked ? 'bg-red-600 border-red-600' : 'border-zinc-600'
                  }`}
                >
                  {checked && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
                </div>
                <span className={`text-sm ${checked ? 'text-white' : 'text-zinc-300'}`}>{task}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Photos */}
      <div className="mb-6">
        <h2 className="text-sm uppercase tracking-widest font-bold text-zinc-400 mb-3">Photos (optional)</h2>
        <div className="grid grid-cols-3 gap-2 mb-3">
          {photos.map((url) => (
            <div key={url} className="relative aspect-square bg-zinc-900 border border-zinc-800 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={url} alt="Cleaning photo" className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => removePhoto(url)}
                className="absolute top-1 right-1 w-6 h-6 bg-black/70 text-white flex items-center justify-center hover:bg-red-600 transition-colors"
                aria-label="Remove photo"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          multiple
          onChange={handleFileChange}
          className="hidden"
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="w-full flex items-center justify-center gap-2 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 p-4 text-zinc-300 text-sm font-bold uppercase tracking-wider transition-colors disabled:opacity-50"
        >
          {uploading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Uploading…
            </>
          ) : (
            <>
              <Camera className="w-4 h-4" /> Add photo
            </>
          )}
        </button>
      </div>

      {/* Notes */}
      <div className="mb-6">
        <h2 className="text-sm uppercase tracking-widest font-bold text-zinc-400 mb-3">Notes (optional)</h2>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={4}
          placeholder="Any extra notes for the customer…"
          className="w-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-sm p-3 focus:outline-none focus:border-red-600 resize-none"
        />
      </div>

      {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

      <button
        type="button"
        onClick={handleSave}
        disabled={saving || uploading}
        className="w-full bg-red-600 hover:bg-red-700 text-white text-sm font-bold uppercase tracking-widest py-4 transition-colors disabled:opacity-50"
      >
        {saving ? 'Saving…' : 'Save & Mark Complete'}
      </button>
    </div>
  );
}
