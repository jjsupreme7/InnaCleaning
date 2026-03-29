interface Props {
  title: string;
  index: number;
}

export default function BeforeAfterCard({ title, index }: Props) {
  // Placeholder cards with gradient backgrounds since we don't have real photos yet
  const colors = [
    { before: 'from-amber-200 to-amber-300', after: 'from-sky-200 to-sky-300' },
    { before: 'from-stone-200 to-stone-300', after: 'from-emerald-200 to-emerald-300' },
    { before: 'from-orange-200 to-orange-300', after: 'from-blue-200 to-blue-300' },
    { before: 'from-yellow-200 to-yellow-300', after: 'from-teal-200 to-teal-300' },
  ];
  const color = colors[index % colors.length];

  return (
    <div className="border border-gray-100">
      <div className="grid grid-cols-2">
        <div className={`aspect-square bg-gradient-to-br ${color.before} flex items-center justify-center`}>
          <span className="text-xs uppercase tracking-widest font-bold text-black/30">Before</span>
        </div>
        <div className={`aspect-square bg-gradient-to-br ${color.after} flex items-center justify-center`}>
          <span className="text-xs uppercase tracking-widest font-bold text-black/30">After</span>
        </div>
      </div>
      <div className="p-4">
        <p className="text-sm font-bold text-slate-800">{title}</p>
      </div>
    </div>
  );
}
