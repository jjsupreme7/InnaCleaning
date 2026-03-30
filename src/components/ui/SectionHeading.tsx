interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  light?: boolean;
}

export default function SectionHeading({ title, subtitle, light = false }: SectionHeadingProps) {
  return (
    <div className="text-center mb-14">
      <h2 className={`text-2xl md:text-3xl uppercase tracking-[0.15em] font-bold ${light ? 'text-white' : 'text-slate-800'}`}>
        {title}
      </h2>
      <div className={`mt-4 mx-auto w-12 h-0.5 ${light ? 'bg-white/40' : 'bg-sky-500'}`} />
      {subtitle && (
        <p className={`mt-4 text-lg ${light ? 'text-gray-300' : 'text-gray-500'}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
