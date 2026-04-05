'use client';

import { useRef, useState } from 'react';
import { Play, Pause, Maximize2 } from 'lucide-react';

interface Props {
  src: string;
  title: string;
  isActive?: boolean;
  playLabel?: string;
}

export default function VideoCard({ src, title, isActive = true, playLabel = 'Tap to play' }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play().catch(() => setPlaying(false));
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  const fullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    videoRef.current?.requestFullscreen?.();
  };

  return (
    <div
      className={`transition-all duration-500 ease-out ${
        isActive ? 'scale-100 opacity-100' : 'scale-[0.88] opacity-40'
      }`}
    >
      <div
        className="relative aspect-[9/16] max-h-[520px] overflow-hidden border border-zinc-800 bg-black cursor-pointer group"
        onClick={toggle}
      >
        <video
          ref={videoRef}
          src={src}
          className="w-full h-full object-contain"
          playsInline
          preload="metadata"
          onEnded={() => setPlaying(false)}
        />

        {/* Play/Pause overlay */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
            playing ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'
          }`}
        >
          <div className="w-16 h-16 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-lg shadow-black/30">
            {playing ? (
              <Pause className="w-6 h-6 text-zinc-900" />
            ) : (
              <Play className="w-6 h-6 text-zinc-900 ml-1" />
            )}
          </div>
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
      <div className="bg-zinc-900 border border-t-0 border-zinc-800 px-5 py-4 flex items-center justify-between">
        <p className="text-sm font-bold text-white">{title}</p>
        <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-600 font-bold">{playLabel}</p>
      </div>
    </div>
  );
}
