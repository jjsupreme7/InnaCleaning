import { Review } from '@/types';
import BorderBeam from '@/components/ui/BorderBeam';

export default function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="relative theme-transition border shadow-sm rounded-xl p-6" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--card-border)' }}>
      <BorderBeam />
      {/* Decorative quote mark */}
      <div className="absolute top-4 right-4 text-4xl font-display leading-none opacity-10" style={{ color: 'var(--text-primary)' }} aria-hidden="true">
        &ldquo;
      </div>
      <div className="flex gap-1 mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg
            key={i}
            className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : ''}`}
            style={i >= review.rating ? { color: 'var(--card-border)' } : undefined}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <p className="text-sm leading-relaxed mb-4 italic" style={{ color: 'var(--text-secondary)' }}>
        &ldquo;{review.text}&rdquo;
      </p>
      <div>
        <p className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>{review.name}</p>
        <p className="text-xs uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>{review.service}</p>
      </div>
    </div>
  );
}
