interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  light?: boolean;
}

export default function SectionHeading({ title, subtitle, light = false }: SectionHeadingProps) {
  return (
    <div className="mx-auto mb-14 max-w-3xl text-center scroll-fade-up">
      <div
        className={`mx-auto mb-5 h-px w-20 ${
          light ? 'bg-white/45' : 'bg-[#8ab8ab]'
        }`}
      />
      <h2
        className={`font-serif text-4xl leading-none md:text-5xl ${
          light ? 'text-white' : 'text-[var(--color-foreground)]'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-base leading-8 md:text-lg ${
            light ? 'text-white/80' : 'text-[#64827a]'
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
