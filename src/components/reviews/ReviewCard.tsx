import { Quote, Star, UserRound } from 'lucide-react';
import { Review } from '@/types';

export default function ReviewCard({ review }: { review: Review }) {
  const initials = review.name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2);

  return (
    <div className="soft-card scroll-fade-up h-full p-6 md:p-7">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#dff0ea,#f3e8cb)] text-sm font-semibold text-[#456f64]">
            <span className="sr-only">{review.name}</span>
            {initials || <UserRound className="h-5 w-5" strokeWidth={1.8} />}
          </div>
          <div>
            <p className="font-semibold text-[var(--color-foreground)]">{review.name}</p>
            <p className="text-xs uppercase tracking-[0.18em] text-[#739087]">
              {review.service}
            </p>
          </div>
        </div>
        <Quote className="h-5 w-5 text-[#90b9ac]" strokeWidth={1.8} />
      </div>

      <div className="mb-4 flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < review.rating ? 'fill-[#f2c869] text-[#f2c869]' : 'text-[#d8e5df]'
            }`}
            strokeWidth={1.8}
          />
        ))}
      </div>

      <p className="text-sm leading-7 text-[#5d7871] italic">
        &ldquo;{review.text}&rdquo;
      </p>
    </div>
  );
}
