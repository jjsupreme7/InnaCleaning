interface Props {
  title: string;
  index: number;
}

export default function BeforeAfterCard({ title, index }: Props) {
  const colors = [
    { before: 'from-amber-100 to-amber-200', after: 'from-sky-100 to-sky-200' },
    { before: 'from-stone-100 to-stone-200', after: 'from-emerald-100 to-emerald-200' },
    { before: 'from-orange-100 to-orange-200', after: 'from-blue-100 to-blue-200' },
    { before: 'from-yellow-100 to-yellow-200', after: 'from-teal-100 to-teal-200' },
  ];
  const color = colors[index % colors.length];

  return (
    <div className="rounded-sm border border-gray-100 overflow-hidden hover:shadow-lg hover:shadow-gray-100 transition-all duration-300 group">
      <div className="grid grid-cols-2">
        <div className={`aspect-square bg-gradient-to-br ${color.before} flex flex-col items-center justify-center relative`}>
          <svg className="w-8 h-8 text-black/10 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="text-[10px] uppercase tracking-widest font-bold text-black/25">Before</span>
        </div>
        <div className={`aspect-square bg-gradient-to-br ${color.after} flex flex-col items-center justify-center relative`}>
          <svg className="w-8 h-8 text-black/10 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
          <span className="text-[10px] uppercase tracking-widest font-bold text-black/25">After</span>
        </div>
      </div>
      <div className="p-4 bg-white">
        <p className="text-sm font-bold text-slate-800">{title}</p>
      </div>
    </div>
  );
}
