interface Props {
  title: string;
  image: string;
}

export default function BeforeAfterCard({ title, image }: Props) {
  return (
    <div className="soft-card scroll-fade-up overflow-hidden">
      <div className="grid grid-cols-2">
        <div className="group relative aspect-square overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
            style={{
              backgroundImage: `url(${image})`,
              filter: 'grayscale(1) saturate(0.55) brightness(0.88)',
            }}
          />
          <span className="absolute left-4 top-4 rounded-full bg-white/74 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[#536e66]">
            Before
          </span>
        </div>
        <div className="group relative aspect-square overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
            style={{ backgroundImage: `url(${image})` }}
          />
          <span className="absolute left-4 top-4 rounded-full bg-[#edf5ee]/84 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[#467968]">
            After
          </span>
        </div>
      </div>
      <div className="p-5">
        <p className="text-lg font-semibold text-[var(--color-foreground)]">{title}</p>
        <p className="mt-2 text-sm leading-7 text-[#67827b]">
          Illustrative stock preview with a muted-to-fresh treatment.
        </p>
      </div>
    </div>
  );
}
