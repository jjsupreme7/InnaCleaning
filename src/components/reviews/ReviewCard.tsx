import { Review } from '@/types';

export default function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="bg-white rounded-sm border border-gray-100 p-7 hover:shadow-lg hover:shadow-gray-100 transition-all duration-300 relative">
      {/* Quote mark */}
      <div className="absolute top-4 right-5 text-sky-100 text-5xl font-serif leading-none select-none">&ldquo;</div>

      <div className="flex gap-1 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg
            key={i}
            className={`w-4 h-4 ${i < review.rating ? 'text-amber-400' : 'text-gray-200'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <p className="text-gray-600 text-sm leading-relaxed mb-5 italic relative z-10">
        &ldquo;{review.text}&rdquo;
      </p>
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center text-white text-xs font-bold">
          {review.name.charAt(0)}
        </div>
        <div>
          <p className="font-bold text-slate-800 text-sm">{review.name}</p>
          <p className="text-gray-400 text-xs uppercase tracking-widest">{review.service}</p>
        </div>
      </div>
    </div>
  );
}
