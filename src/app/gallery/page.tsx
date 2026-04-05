'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import BeforeAfterCard from '@/components/gallery/BeforeAfterCard';
import VideoCard from '@/components/gallery/VideoCard';
import PhotoGrid from '@/components/gallery/PhotoGrid';
import Button from '@/components/ui/Button';
import { useLanguage } from '@/contexts/LanguageContext';

// Before/After pairs for the slider carousel
const GALLERY_DATA: { beforeImage?: string; afterImage?: string; image?: string }[] = [
  { beforeImage: '/images/gallery/inna/fridge-before.jpg', afterImage: '/images/gallery/inna/fridge-after.jpg' },
  { beforeImage: '/images/gallery/living-before.jpg', afterImage: '/images/gallery/living-after.jpg' },
  { beforeImage: '/images/gallery/exterior-before.jpg', afterImage: '/images/gallery/exterior-after.jpg' },
];

// Showcase photos
const SHOWCASE_PHOTOS = [
  { src: '/images/gallery/inna/toilet-clean.jpg', titleKey: 0 },
  { src: '/images/gallery/inna/tp-fan-fold.jpg', titleKey: 1 },
  { src: '/images/gallery/inna/tp-bow-fold.jpg', titleKey: 2 },
  { src: '/images/gallery/inna/cleaning-equipment.jpg', titleKey: 3 },
  { src: '/images/gallery/inna/bathroom-touches.jpg', titleKey: 4 },
  { src: '/images/gallery/inna/leather-cleaning.jpg', titleKey: 5 },
];

// Video clips
const VIDEOS = [
  { src: '/videos/gallery/clip-01.mp4', titleKey: 0 },
  { src: '/videos/gallery/clip-02.mp4', titleKey: 1 },
  { src: '/videos/gallery/clip-03.mp4', titleKey: 2 },
  { src: '/videos/gallery/clip-04.mp4', titleKey: 3 },
  { src: '/videos/gallery/clip-05.mp4', titleKey: 4 },
  { src: '/videos/gallery/clip-06.mp4', titleKey: 5 },
  { src: '/videos/gallery/clip-07.mp4', titleKey: 6 },
  { src: '/videos/gallery/clip-08.mp4', titleKey: 7 },
  { src: '/videos/gallery/clip-09.mp4', titleKey: 8 },
  { src: '/videos/gallery/clip-10.mp4', titleKey: 9 },
];

export default function GalleryPage() {
  const { t } = useLanguage();
  const g = t.gallery;

  // --- Before/After carousel state ---
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const baCount = g.beforeAfterItems.length;

  const scrollToIndex = useCallback((index: number) => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const cards = container.children;
    if (!cards[index]) return;
    const card = cards[index] as HTMLElement;
    const scrollLeft = card.offsetLeft - (container.clientWidth - card.offsetWidth) / 2;
    container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
  }, []);

  const goTo = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(baCount - 1, index));
    setActiveIndex(clamped);
    scrollToIndex(clamped);
  }, [baCount, scrollToIndex]);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const handleScroll = () => {
      const center = container.scrollLeft + container.clientWidth / 2;
      let closest = 0;
      let closestDist = Infinity;
      Array.from(container.children).forEach((child, i) => {
        const el = child as HTMLElement;
        const elCenter = el.offsetLeft + el.offsetWidth / 2;
        const dist = Math.abs(center - elCenter);
        if (dist < closestDist) { closestDist = dist; closest = i; }
      });
      setActiveIndex(closest);
    };
    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(activeIndex - 1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); goTo(activeIndex + 1); }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, goTo]);

  // --- Video carousel state ---
  const videoScrollRef = useRef<HTMLDivElement>(null);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const videoCount = VIDEOS.length;

  const scrollVideoToIndex = useCallback((index: number) => {
    if (!videoScrollRef.current) return;
    const container = videoScrollRef.current;
    const cards = container.children;
    if (!cards[index]) return;
    const card = cards[index] as HTMLElement;
    const scrollLeft = card.offsetLeft - (container.clientWidth - card.offsetWidth) / 2;
    container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
  }, []);

  const goToVideo = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(videoCount - 1, index));
    setActiveVideoIndex(clamped);
    scrollVideoToIndex(clamped);
  }, [videoCount, scrollVideoToIndex]);

  useEffect(() => {
    const container = videoScrollRef.current;
    if (!container) return;
    const handleScroll = () => {
      const center = container.scrollLeft + container.clientWidth / 2;
      let closest = 0;
      let closestDist = Infinity;
      Array.from(container.children).forEach((child, i) => {
        const el = child as HTMLElement;
        const elCenter = el.offsetLeft + el.offsetWidth / 2;
        const dist = Math.abs(center - elCenter);
        if (dist < closestDist) { closestDist = dist; closest = i; }
      });
      setActiveVideoIndex(closest);
    };
    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="py-16 md:py-24 overflow-hidden">
      {/* ───── Before & After Section ───── */}
      <div className="text-center mb-12 px-4">
        <p className="text-xs uppercase tracking-[0.3em] font-bold text-red-600 mb-3">{g.title}</p>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">{g.subtitle}</h1>
        <p className="text-zinc-500 text-sm max-w-md mx-auto">
          {g.dragHint}
        </p>
      </div>

      <div className="relative">
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide px-[calc(50vw-280px)] md:px-[calc(50vw-340px)] lg:px-[calc(50vw-380px)] pb-4"
          style={{ scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {g.beforeAfterItems.map((title, i) => (
            <div key={title} className="shrink-0 w-[560px] md:w-[680px] lg:w-[760px]" style={{ scrollSnapAlign: 'center' }}>
              <BeforeAfterCard
                title={title}
                image={GALLERY_DATA[i]?.image}
                beforeImage={GALLERY_DATA[i]?.beforeImage}
                afterImage={GALLERY_DATA[i]?.afterImage}
                before={g.before}
                after={g.after}
                isActive={i === activeIndex}
              />
            </div>
          ))}
        </div>

        <button onClick={() => goTo(activeIndex - 1)} disabled={activeIndex === 0}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-zinc-900/80 backdrop-blur border border-zinc-800 text-white flex items-center justify-center hover:bg-zinc-800 transition-colors disabled:opacity-20 disabled:cursor-default z-10"
          aria-label="Previous">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M12 4L6 10L12 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <button onClick={() => goTo(activeIndex + 1)} disabled={activeIndex === baCount - 1}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-zinc-900/80 backdrop-blur border border-zinc-800 text-white flex items-center justify-center hover:bg-zinc-800 transition-colors disabled:opacity-20 disabled:cursor-default z-10"
          aria-label="Next">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M8 4L14 10L8 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>

      {/* Dots */}
      <div className="flex items-center justify-center gap-2 mt-8">
        {g.beforeAfterItems.map((_, i) => (
          <button key={i} onClick={() => goTo(i)}
            className={`transition-all duration-300 ${i === activeIndex ? 'w-8 h-1.5 bg-red-600' : 'w-1.5 h-1.5 bg-zinc-700 hover:bg-zinc-500'}`}
            aria-label={`Go to slide ${i + 1}`} />
        ))}
      </div>
      <div className="text-center mt-4">
        <span className="text-zinc-600 text-xs font-bold tabular-nums">
          {String(activeIndex + 1).padStart(2, '0')} / {String(baCount).padStart(2, '0')}
        </span>
      </div>

      {/* ───── Showcase Photos Section ───── */}
      <div className="mt-24 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-[0.3em] font-bold text-red-600 mb-3">{g.photosTitle}</p>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">{g.photosSubtitle}</h2>
        </div>
        <PhotoGrid
          photos={SHOWCASE_PHOTOS.map((p) => ({
            src: p.src,
            title: g.photoItems[p.titleKey] || '',
          }))}
        />
      </div>

      {/* ───── Video Section ───── */}
      <div className="mt-24">
        <div className="text-center mb-10 px-4">
          <p className="text-xs uppercase tracking-[0.3em] font-bold text-red-600 mb-3">{g.videosTitle}</p>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">{g.videosSubtitle}</h2>
        </div>

        <div className="relative">
          <div
            ref={videoScrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide px-[calc(50vw-160px)] md:px-[calc(50vw-180px)] pb-4"
            style={{ scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {VIDEOS.map((video, i) => (
              <div key={video.src} className="shrink-0 w-[320px] md:w-[360px]" style={{ scrollSnapAlign: 'center' }}>
                <VideoCard
                  src={video.src}
                  title={g.videoItems[video.titleKey] || `Clip ${i + 1}`}
                  isActive={i === activeVideoIndex}
                />
              </div>
            ))}
          </div>

          <button onClick={() => goToVideo(activeVideoIndex - 1)} disabled={activeVideoIndex === 0}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-zinc-900/80 backdrop-blur border border-zinc-800 text-white flex items-center justify-center hover:bg-zinc-800 transition-colors disabled:opacity-20 disabled:cursor-default z-10"
            aria-label="Previous video">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M12 4L6 10L12 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <button onClick={() => goToVideo(activeVideoIndex + 1)} disabled={activeVideoIndex === videoCount - 1}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-zinc-900/80 backdrop-blur border border-zinc-800 text-white flex items-center justify-center hover:bg-zinc-800 transition-colors disabled:opacity-20 disabled:cursor-default z-10"
            aria-label="Next video">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M8 4L14 10L8 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>

        {/* Video dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {VIDEOS.map((_, i) => (
            <button key={i} onClick={() => goToVideo(i)}
              className={`transition-all duration-300 ${i === activeVideoIndex ? 'w-8 h-1.5 bg-red-600' : 'w-1.5 h-1.5 bg-zinc-700 hover:bg-zinc-500'}`}
              aria-label={`Go to video ${i + 1}`} />
          ))}
        </div>
        <div className="text-center mt-4">
          <span className="text-zinc-600 text-xs font-bold tabular-nums">
            {String(activeVideoIndex + 1).padStart(2, '0')} / {String(videoCount).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center mt-16 px-4">
        <p className="text-zinc-500 text-sm mb-6">{g.ctaText}</p>
        <Button href="/quote" variant="primary" size="lg">
          {g.getQuote}
        </Button>
      </div>
    </section>
  );
}
