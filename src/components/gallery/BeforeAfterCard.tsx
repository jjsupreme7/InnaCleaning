'use client';

import { useState, useRef, useCallback } from 'react';

interface Props {
  title: string;
  /** When real photos exist, pass beforeImage + afterImage. Otherwise just pass image and filters simulate the transformation. */
  image?: string;
  beforeImage?: string;
  afterImage?: string;
  before: string;
  after: string;
  isActive: boolean;
  dragLabel?: string;
}

export default function BeforeAfterCard({ title, image, beforeImage, afterImage, before, after, isActive, dragLabel = 'Drag to compare' }: Props) {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  // If separate before/after images provided, use them. Otherwise use single image with filters.
  const hasRealPair = Boolean(beforeImage && afterImage);
  const beforeSrc = beforeImage || image || '';
  const afterSrc = afterImage || image || '';

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(pct);
  }, []);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    isDragging.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    updatePosition(e.clientX);
  }, [updatePosition]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current) return;
    updatePosition(e.clientX);
  }, [updatePosition]);

  const handlePointerUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  return (
    <div
      className={`transition-all duration-500 ease-out ${
        isActive ? 'scale-100 opacity-100' : 'scale-[0.88] opacity-40'
      }`}
    >
      <div
        ref={containerRef}
        className="relative aspect-[4/3] rounded-xl overflow-hidden cursor-col-resize select-none border"
      style={{ borderColor: 'var(--card-border)' }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        {/* After layer (bottom — clean/bright) */}
        <div className="absolute inset-0">
          <img
            src={afterSrc}
            alt={`${title} - ${after}`}
            className="w-full h-full object-cover"
            style={hasRealPair ? undefined : { filter: 'brightness(1.08) saturate(1.2) contrast(1.05)' }}
            draggable={false}
          />
        </div>

        {/* Before layer (top — dirty/dingy, clipped from left) */}
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
        >
          <img
            src={beforeSrc}
            alt={`${title} - ${before}`}
            className="w-full h-full object-cover"
            style={hasRealPair ? undefined : { filter: 'grayscale(0.5) sepia(0.35) brightness(0.55) contrast(0.85)' }}
            draggable={false}
          />
          {/* Warm dingy overlay for simulated before */}
          {!hasRealPair && (
            <div className="absolute inset-0 bg-gradient-to-br from-amber-900/25 via-transparent to-stone-900/20" />
          )}
        </div>

        {/* Slider line */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white z-10 pointer-events-none"
          style={{ left: `${sliderPos}%`, transform: 'translateX(-50%)' }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-lg shadow-black/30">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M7 4L3 10L7 16" stroke="#18181b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M13 4L17 10L13 16" stroke="#18181b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* Labels */}
        <div className="absolute top-4 left-4 z-10">
          <span className="bg-black/60 backdrop-blur-sm text-white text-[10px] uppercase tracking-[0.2em] font-bold px-3 py-1.5">
            {before}
          </span>
        </div>
        <div className="absolute top-4 right-4 z-10">
          <span className="bg-white/80 backdrop-blur-sm text-zinc-900 text-[10px] uppercase tracking-[0.2em] font-bold px-3 py-1.5">
            {after}
          </span>
        </div>
      </div>

      {/* Title bar */}
      <div className="theme-transition border border-t-0 rounded-b-xl px-5 py-4 flex items-center justify-between" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--card-border)' }}>
        <p className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{title}</p>
        <p className="text-[10px] uppercase tracking-[0.2em] font-bold" style={{ color: 'var(--text-faint)' }}>{dragLabel}</p>
      </div>
    </div>
  );
}
