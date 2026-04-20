'use client';

import { type CSSProperties, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Props = {
  children: ReactNode;
  durationSec?: number;
  scaleTo?: number;
  className?: string;
  style?: CSSProperties;
};

export function KenBurns({ children, durationSec = 14, scaleTo = 1.04, className, style }: Props) {
  return (
    <div
      className={cn('absolute inset-0 overflow-hidden', className)}
      style={
        {
          ...style,
          ['--kb-duration' as string]: `${durationSec}s`,
          ['--kb-scale' as string]: `${scaleTo}`,
        } as CSSProperties
      }
    >
      <div className="absolute inset-0 lf-kenburns">{children}</div>
      <style>{`
        @keyframes lf-kenburns-kf {
          from { transform: scale(1); }
          to   { transform: scale(var(--kb-scale, 1.04)); }
        }
        .lf-kenburns {
          animation: lf-kenburns-kf var(--kb-duration, 14s) ease-in-out infinite alternate;
          will-change: transform;
        }
        @media (prefers-reduced-motion: reduce) {
          .lf-kenburns { animation: none !important; transform: none !important; }
        }
      `}</style>
    </div>
  );
}
