'use client';

import Image from 'next/image';
import { useEffect, useState, type CSSProperties } from 'react';

type Props = {
  src: string;
  alt: string;
  width: number;
  height: number;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  rotation?: number; // deg
  floatDelayMs?: number;
  zIndex?: number;
  className?: string;
};

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return reduced;
}

export function CollageObject({
  src,
  alt,
  width,
  height,
  top,
  left,
  right,
  bottom,
  rotation = 0,
  floatDelayMs = 0,
  zIndex = 0,
  className,
}: Props) {
  const reduced = usePrefersReducedMotion();

  // Use a stable 7s duration, slightly varied by delay modulo to prevent sync.
  const durationSec = 6 + ((Math.abs(floatDelayMs) % 2000) / 1000); // 6s - 8s

  const wrapperStyle: CSSProperties = {
    position: 'absolute',
    top,
    left,
    right,
    bottom,
    width,
    height,
    zIndex,
    transform: `rotate(${rotation}deg)`,
    pointerEvents: 'none',
  };

  const innerStyle: CSSProperties = reduced
    ? { width: '100%', height: '100%' }
    : {
        width: '100%',
        height: '100%',
        animation: `lf-collage-float ${durationSec}s ease-in-out ${floatDelayMs}ms infinite`,
        willChange: 'transform',
      };

  return (
    <div style={wrapperStyle} className={className} aria-hidden>
      <div style={innerStyle}>
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes={`${width}px`}
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
      </div>
      <style>{`
        @keyframes lf-collage-float {
          0%, 100% { transform: translateY(-2px); }
          50%      { transform: translateY(2px); }
        }
        @media (prefers-reduced-motion: reduce) {
          [data-lf-collage] > div { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
