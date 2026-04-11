'use client';

import { useCallback, useRef } from 'react';
import BorderBeam from '@/components/ui/BorderBeam';

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export default function GlowCard({ children, className = '', style }: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--glow-x', `${e.clientX - rect.left}px`);
    card.style.setProperty('--glow-y', `${e.clientY - rect.top}px`);
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`glow-card ${className}`}
      style={style}
    >
      <BorderBeam />
      {children}
    </div>
  );
}
