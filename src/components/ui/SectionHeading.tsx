interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  light?: boolean;
}

export default function SectionHeading({ title, subtitle, light = false }: SectionHeadingProps) {
  return (
    <div className="text-center mb-12">
      <h2 className={`text-2xl md:text-3xl uppercase tracking-[0.15em] font-bold font-display ${light ? 'text-white' : 'text-zinc-900'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-lg ${light ? 'text-zinc-300' : 'text-zinc-500'}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
