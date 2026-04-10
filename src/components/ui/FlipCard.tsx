'use client';

import { useState, useCallback } from 'react';

interface FlipCardProps {
  front: React.ReactNode;
  back: React.ReactNode;
  trigger?: 'hover' | 'click';
  direction?: 'horizontal' | 'vertical';
  duration?: number;
  perspective?: number;
  className?: string;
}

export default function FlipCard({
  front,
  back,
  trigger = 'hover',
  direction = 'horizontal',
  duration = 600,
  perspective = 1000,
  className = '',
}: FlipCardProps) {
  const [flipped, setFlipped] = useState(false);

  const handleClick = useCallback(() => {
    if (trigger === 'click') setFlipped((f) => !f);
  }, [trigger]);

  const rotateAxis = direction === 'horizontal' ? 'rotateY' : 'rotateX';
  const frontTransform = flipped ? `${rotateAxis}(180deg)` : `${rotateAxis}(0deg)`;
  const backTransform = flipped ? `${rotateAxis}(0deg)` : `${rotateAxis}(-180deg)`;

  return (
    <div
      className={`group ${className}`}
      style={{ perspective: `${perspective}px` }}
      onClick={handleClick}
      onMouseEnter={trigger === 'hover' ? () => setFlipped(true) : undefined}
      onMouseLeave={trigger === 'hover' ? () => setFlipped(false) : undefined}
    >
      <div className="relative w-full h-full" style={{ transformStyle: 'preserve-3d' }}>
        {/* Front */}
        <div
          className="absolute inset-0"
          style={{
            backfaceVisibility: 'hidden',
            transform: frontTransform,
            transition: `transform ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
          }}
        >
          {front}
        </div>

        {/* Back */}
        <div
          className="absolute inset-0"
          style={{
            backfaceVisibility: 'hidden',
            transform: backTransform,
            transition: `transform ${duration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
          }}
        >
          {back}
        </div>
      </div>
    </div>
  );
}
