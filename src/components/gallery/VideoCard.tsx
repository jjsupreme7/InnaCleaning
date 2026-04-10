'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { Play, Pause, Maximize2, X, Volume2, VolumeX } from 'lucide-react';

interface Props {
  src: string;
  title: string;
  poster?: string;
  playLabel?: string;
  accentColor?: string;
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
}

export default function VideoCard({ src, title, poster, playLabel = 'Tap to play', accentColor = '#dc2626' }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const modalVideoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const modalProgressRef = useRef<HTMLDivElement>(null);

  // Inline player state
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [hoverProgress, setHoverProgress] = useState<number | null>(null);
  const [seeking, setSeeking] = useState(false);
  const controlsTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalPlaying, setModalPlaying] = useState(false);
  const [modalMuted, setModalMuted] = useState(false);
  const [modalCurrentTime, setModalCurrentTime] = useState(0);
  const [modalDuration, setModalDuration] = useState(0);
  const [modalShowControls, setModalShowControls] = useState(true);
  const [modalHoverProgress, setModalHoverProgress] = useState<number | null>(null);
  const [modalSeeking, setModalSeeking] = useState(false);
  const modalControlsTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
  const modalProgress = modalDuration > 0 ? (modalCurrentTime / modalDuration) * 100 : 0;

  // --- Controls auto-hide ---
  const scheduleHideControls = useCallback((isModal = false) => {
    const timer = isModal ? modalControlsTimer : controlsTimer;
    const setter = isModal ? setModalShowControls : setShowControls;
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setter(false), 2500);
  }, []);

  const revealControls = useCallback((isModal = false) => {
    const setter = isModal ? setModalShowControls : setShowControls;
    setter(true);
    const isPlaying = isModal ? modalPlaying : playing;
    if (isPlaying) scheduleHideControls(isModal);
  }, [playing, modalPlaying, scheduleHideControls]);

  // --- Inline player ---
  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play().catch(() => setPlaying(false));
      setPlaying(true);
      scheduleHideControls();
    } else {
      v.pause();
      setPlaying(false);
      setShowControls(true);
      if (controlsTimer.current) clearTimeout(controlsTimer.current);
    }
  };

  const handleTimeUpdate = () => {
    if (!seeking && videoRef.current) setCurrentTime(videoRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) setDuration(videoRef.current.duration);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const bar = progressRef.current;
    const v = videoRef.current;
    if (!bar || !v) return;
    const rect = bar.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    v.currentTime = pct * duration;
    setCurrentTime(v.currentTime);
  };

  const handleProgressHover = (e: React.MouseEvent<HTMLDivElement>) => {
    const bar = progressRef.current;
    if (!bar) return;
    const rect = bar.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    setHoverProgress(pct * 100);
  };

  // --- Modal player ---
  const openModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    videoRef.current?.pause();
    setPlaying(false);
    setShowControls(true);
    if (controlsTimer.current) clearTimeout(controlsTimer.current);
    setModalOpen(true);
    setModalPlaying(false);
    setModalShowControls(true);
  };

  const closeModal = () => {
    modalVideoRef.current?.pause();
    setModalOpen(false);
    setModalPlaying(false);
    if (modalControlsTimer.current) clearTimeout(modalControlsTimer.current);
  };

  const toggleModalPlay = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const v = modalVideoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play().catch(() => setModalPlaying(false));
      setModalPlaying(true);
      scheduleHideControls(true);
    } else {
      v.pause();
      setModalPlaying(false);
      setModalShowControls(true);
      if (modalControlsTimer.current) clearTimeout(modalControlsTimer.current);
    }
  };

  const handleModalTimeUpdate = () => {
    if (!modalSeeking && modalVideoRef.current) setModalCurrentTime(modalVideoRef.current.currentTime);
  };

  const handleModalLoadedMetadata = () => {
    if (modalVideoRef.current) setModalDuration(modalVideoRef.current.duration);
  };

  const handleModalProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const bar = modalProgressRef.current;
    const v = modalVideoRef.current;
    if (!bar || !v) return;
    const rect = bar.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    v.currentTime = pct * modalDuration;
    setModalCurrentTime(v.currentTime);
  };

  const handleModalProgressHover = (e: React.MouseEvent<HTMLDivElement>) => {
    const bar = modalProgressRef.current;
    if (!bar) return;
    const rect = bar.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    setModalHoverProgress(pct * 100);
  };

  // Auto-play modal on open
  useEffect(() => {
    if (modalOpen && modalVideoRef.current) {
      modalVideoRef.current.play()
        .then(() => {
          setModalPlaying(true);
          scheduleHideControls(true);
        })
        .catch(() => setModalPlaying(false));
    }
  }, [modalOpen, scheduleHideControls]);

  // Lock body scroll on modal
  useEffect(() => {
    if (modalOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [modalOpen]);

  // Cleanup timers
  useEffect(() => {
    return () => {
      if (controlsTimer.current) clearTimeout(controlsTimer.current);
      if (modalControlsTimer.current) clearTimeout(modalControlsTimer.current);
    };
  }, []);

  // --- Shared controls bar renderer ---
  const renderControls = (opts: {
    isPlaying: boolean;
    isMuted: boolean;
    time: number;
    dur: number;
    prog: number;
    hover: number | null;
    show: boolean;
    barRef: React.RefObject<HTMLDivElement | null>;
    onToggle: (e?: React.MouseEvent) => void;
    onMute: (e: React.MouseEvent) => void;
    onProgressClick: (e: React.MouseEvent<HTMLDivElement>) => void;
    onProgressHover: (e: React.MouseEvent<HTMLDivElement>) => void;
    onProgressLeave: () => void;
    onExpand?: (e: React.MouseEvent) => void;
    onMouseMove: () => void;
  }) => (
    <div
      className={`absolute bottom-0 left-0 right-0 transition-opacity duration-300 ${opts.show ? 'opacity-100' : 'opacity-0'}`}
      style={{ pointerEvents: opts.show ? 'auto' : 'none' }}
      onMouseMove={opts.onMouseMove}
    >
      <div className="bg-gradient-to-t from-black/80 via-black/40 to-transparent pt-10 pb-3 px-3">
        {/* Progress bar */}
        <div
          ref={opts.barRef}
          className="group/bar relative h-1 rounded-full cursor-pointer mb-2.5 transition-all hover:h-1.5"
          style={{ background: 'rgba(255,255,255,0.2)' }}
          onClick={opts.onProgressClick}
          onMouseMove={opts.onProgressHover}
          onMouseLeave={opts.onProgressLeave}
        >
          {/* Hover preview */}
          {opts.hover !== null && (
            <div
              className="absolute top-0 left-0 h-full rounded-full"
              style={{ width: `${opts.hover}%`, background: 'rgba(255,255,255,0.15)' }}
            />
          )}
          {/* Played */}
          <div
            className="absolute top-0 left-0 h-full rounded-full transition-[width] duration-75"
            style={{ width: `${opts.prog}%`, background: accentColor }}
          />
          {/* Scrubber dot */}
          <div
            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full opacity-0 group-hover/bar:opacity-100 transition-opacity"
            style={{ left: `${opts.prog}%`, transform: `translate(-50%, -50%)`, background: accentColor }}
          />
        </div>

        {/* Controls row */}
        <div className="flex items-center gap-3">
          <button
            onClick={(e) => { e.stopPropagation(); opts.onToggle(); }}
            className="text-white hover:text-white/80 transition-colors"
            aria-label={opts.isPlaying ? 'Pause' : 'Play'}
          >
            {opts.isPlaying
              ? <Pause className="w-4 h-4" fill="currentColor" />
              : <Play className="w-4 h-4 ml-0.5" fill="currentColor" />
            }
          </button>

          <span className="text-[11px] text-white/70 font-mono tabular-nums">
            {formatTime(opts.time)} / {formatTime(opts.dur)}
          </span>

          <div className="flex-1" />

          <button
            onClick={opts.onMute}
            className="text-white/70 hover:text-white transition-colors"
            aria-label={opts.isMuted ? 'Unmute' : 'Mute'}
          >
            {opts.isMuted
              ? <VolumeX className="w-4 h-4" />
              : <Volume2 className="w-4 h-4" />
            }
          </button>

          {opts.onExpand && (
            <button
              onClick={opts.onExpand}
              className="text-white/70 hover:text-white transition-colors"
              aria-label="Fullscreen"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {/* Inline card */}
      <div
        className="relative aspect-[9/16] rounded-xl overflow-hidden bg-black cursor-pointer group shadow-lg shadow-black/20"
        onClick={togglePlay}
        onMouseMove={() => revealControls()}
        onMouseLeave={() => { if (playing) scheduleHideControls(); }}
      >
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          className="w-full h-full object-cover"
          playsInline
          muted={muted}
          preload="metadata"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={() => { setPlaying(false); setShowControls(true); }}
        />

        {/* Center play button — only when paused */}
        {!playing && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center border border-white/10 shadow-lg">
              <Play className="w-5 h-5 text-white ml-0.5" fill="white" />
            </div>
          </div>
        )}

        {/* Custom controls */}
        {renderControls({
          isPlaying: playing,
          isMuted: muted,
          time: currentTime,
          dur: duration,
          prog: progress,
          hover: hoverProgress,
          show: showControls,
          barRef: progressRef,
          onToggle: togglePlay,
          onMute: (e) => { e.stopPropagation(); setMuted(!muted); if (videoRef.current) videoRef.current.muted = !muted; },
          onProgressClick: handleProgressClick,
          onProgressHover: handleProgressHover,
          onProgressLeave: () => setHoverProgress(null),
          onExpand: openModal,
          onMouseMove: () => revealControls(),
        })}
      </div>

      {/* Title bar */}
      <div
        className="theme-transition border border-t-0 rounded-b-xl px-4 py-3"
        style={{ background: 'var(--bg-elevated)', borderColor: 'var(--card-border)' }}
      >
        <p className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>{title}</p>
      </div>

      {/* Fullscreen modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <button
            onClick={(e) => { e.stopPropagation(); closeModal(); }}
            className="absolute top-4 right-4 w-10 h-10 rounded-lg bg-zinc-800/80 text-white flex items-center justify-center hover:bg-zinc-700 transition-colors z-10"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div
            className="relative max-h-[85vh] aspect-[9/16] rounded-xl overflow-hidden cursor-pointer shadow-2xl"
            onClick={(e) => { e.stopPropagation(); toggleModalPlay(); }}
            onMouseMove={() => revealControls(true)}
            onMouseLeave={() => { if (modalPlaying) scheduleHideControls(true); }}
          >
            <video
              ref={modalVideoRef}
              src={src}
              poster={poster}
              className="w-full h-full object-contain bg-black"
              playsInline
              muted={modalMuted}
              onTimeUpdate={handleModalTimeUpdate}
              onLoadedMetadata={handleModalLoadedMetadata}
              onEnded={() => { setModalPlaying(false); setModalShowControls(true); }}
            />

            {/* Center play button in modal */}
            {!modalPlaying && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center border border-white/10 shadow-lg">
                  <Play className="w-6 h-6 text-white ml-0.5" fill="white" />
                </div>
              </div>
            )}

            {/* Modal controls */}
            {renderControls({
              isPlaying: modalPlaying,
              isMuted: modalMuted,
              time: modalCurrentTime,
              dur: modalDuration,
              prog: modalProgress,
              hover: modalHoverProgress,
              show: modalShowControls,
              barRef: modalProgressRef,
              onToggle: () => toggleModalPlay(),
              onMute: (e) => { e.stopPropagation(); setModalMuted(!modalMuted); if (modalVideoRef.current) modalVideoRef.current.muted = !modalMuted; },
              onProgressClick: handleModalProgressClick,
              onProgressHover: handleModalProgressHover,
              onProgressLeave: () => setModalHoverProgress(null),
              onMouseMove: () => revealControls(true),
            })}
          </div>

          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white text-sm font-bold bg-black/60 backdrop-blur-sm px-4 py-2 rounded-lg">
            {title}
          </p>
        </div>
      )}
    </div>
  );
}
