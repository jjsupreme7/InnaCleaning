import { Review } from '@/types';
import { Star } from 'lucide-react';

export default function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="bg-white border border-stone-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex gap-1 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${i < review.rating ? 'text-amber-400 fill-amber-400' : 'text-stone-200 fill-stone-200'}`}
          />
        ))}
      </div>
      <p className="text-stone-600 text-sm leading-relaxed mb-5 italic">
        &ldquo;{review.text}&rdquo;
      </p>
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-bold text-sm">
          {review.name.charAt(0)}
        </div>
        <div>
          <p className="font-semibold text-stone-800 text-sm">{review.name}</p>
          <p className="text-stone-400 text-xs">{review.service}</p>
        </div>
      </div>
    </div>
  );
}
