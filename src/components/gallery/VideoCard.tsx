'use client';

import { useRef, useState, useEffect } from 'react';
import { Play, Maximize2, X } from 'lucide-react';

interface Props {
  src: string;
  title: string;
  playLabel?: string;
}

export default function VideoCard({ src, title, playLabel = 'Tap to play' }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const modalVideoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalPlaying, setModalPlaying] = useState(false);
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

  const openModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    videoRef.current?.pause();
    setPlaying(false);
    setShowOverlay(true);
    clearHideTimer();
    setModalOpen(true);
    setModalPlaying(false);
  };

  const closeModal = () => {
    modalVideoRef.current?.pause();
    setModalOpen(false);
    setModalPlaying(false);
  };

  const toggleModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    const v = modalVideoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play().catch(() => setModalPlaying(false));
      setModalPlaying(true);
    } else {
      v.pause();
      setModalPlaying(false);
    }
  };

  useEffect(() => {
    return () => clearHideTimer();
  }, []);

  // Auto-play when modal opens
  useEffect(() => {
    if (modalOpen && modalVideoRef.current) {
      modalVideoRef.current.play()
        .then(() => setModalPlaying(true))
        .catch(() => setModalPlaying(false));
    }
  }, [modalOpen]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [modalOpen]);

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

        {/* Expand button */}
        <button
          onClick={openModal}
          className="absolute bottom-3 right-3 w-8 h-8 bg-black/60 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
          aria-label="Expand video"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>

      {/* Title bar */}
      <div className="bg-zinc-900 border border-t-0 border-zinc-800 px-4 py-3 flex items-center justify-between">
        <p className="text-xs font-bold text-white truncate">{title}</p>
        <p className="text-[10px] uppercase tracking-[0.15em] text-zinc-600 font-bold shrink-0 ml-2">{playLabel}</p>
      </div>

      {/* Video Lightbox Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <button
            onClick={(e) => { e.stopPropagation(); closeModal(); }}
            className="absolute top-4 right-4 w-10 h-10 bg-zinc-800/80 text-white flex items-center justify-center hover:bg-zinc-700 transition-colors z-10"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div
            className="relative max-h-[85vh] aspect-[9/16] cursor-pointer"
            onClick={toggleModal}
          >
            <video
              ref={modalVideoRef}
              src={src}
              className="w-full h-full object-contain"
              playsInline
              onEnded={() => setModalPlaying(false)}
            />

            {/* Play overlay in modal */}
            {!modalPlaying && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-lg shadow-black/30">
                  <Play className="w-6 h-6 text-zinc-900 ml-0.5" />
                </div>
              </div>
            )}
          </div>

          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white text-sm font-bold bg-black/60 backdrop-blur-sm px-4 py-2">
            {title}
          </p>
        </div>
      )}
    </div>
  );
}
