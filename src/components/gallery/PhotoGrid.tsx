'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

interface Photo {
  src: string;
  title: string;
}

interface Props {
  photos: Photo[];
}

export default function PhotoGrid({ photos }: Props) {
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
        {photos.map((photo, i) => (
          <button
            key={photo.src}
            onClick={() => setLightbox(i)}
            className="group relative aspect-square overflow-hidden border border-zinc-800 bg-zinc-900 cursor-pointer"
          >
            <img
              src={photo.src}
              alt={photo.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="text-xs font-bold text-white">{photo.title}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-4 right-4 w-10 h-10 bg-zinc-800/80 text-white flex items-center justify-center hover:bg-zinc-700 transition-colors z-10"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <img
            src={photos[lightbox].src}
            alt={photos[lightbox].title}
            className="max-w-full max-h-[85vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white text-sm font-bold bg-black/60 backdrop-blur-sm px-4 py-2">
            {photos[lightbox].title}
          </p>
        </div>
      )}
    </>
  );
}
