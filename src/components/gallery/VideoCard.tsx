'use client';

import { useRef, useState, useEffect } from 'react';
import { Play, Maximize2 } from 'lucide-react';

interface Props {
  src: string;
  title: string;
  playLabel?: string;
}

export default function VideoCard({ src, title, playLabel = 'Tap to play' }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearHideTimer = () => {
    if (hideTimer.current) {
      clearTimeout(hideTimer.current);
      hideTimer.current = null;
    }
  };

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play().catch(() => setPlaying(false));
      setPlaying(true);
      // Show overlay briefly then hide
      setShowOverlay(true);
      clearHideTimer();
      hideTimer.current = setTimeout(() => setShowOverlay(false), 800);
    } else {
      v.pause();
      setPlaying(false);
      setShowOverlay(true);
      clearHideTimer();
    }
  };

  const fullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    videoRef.current?.requestFullscreen?.();
  };

  useEffect(() => {
    return () => clearHideTimer();
  }, []);

  return (
    <div>
      <div
        className="relative aspect-[9/16] overflow-hidden border border-zinc-800 bg-black cursor-pointer group"
        onClick={toggle}
      >
        <video
          ref={videoRef}
          src={src}
          className="w-full h-full object-cover"
          playsInline
          preload="metadata"
          onEnded={() => { setPlaying(false); setShowOverlay(true); }}
        />

        {/* Play overlay — visible when paused, or briefly after play starts */}
        <div
          className="absolute inset-0 flex items-center justify-center transition-opacity duration-500"
          style={{ opacity: showOverlay ? 1 : 0, pointerEvents: showOverlay ? 'auto' : 'none' }}
        >
          {!playing && (
            <div className="w-14 h-14 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-lg shadow-black/30">
              <Play className="w-5 h-5 text-zinc-900 ml-0.5" />
            </div>
          )}
        </div>

        {/* Fullscreen button */}
        <button
          onClick={fullscreen}
          className="absolute bottom-3 right-3 w-8 h-8 bg-black/60 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
          aria-label="Fullscreen"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>

      {/* Title bar */}
      <div className="bg-zinc-900 border border-t-0 border-zinc-800 px-4 py-3 flex items-center justify-between">
        <p className="text-xs font-bold text-white truncate">{title}</p>
        <p className="text-[10px] uppercase tracking-[0.15em] text-zinc-600 font-bold shrink-0 ml-2">{playLabel}</p>
      </div>
    </div>
  );
}
