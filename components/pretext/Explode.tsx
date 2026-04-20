'use client';

import { useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

type Props = {
  children: string;
  className?: string;
};

type Scatter = { x: number; y: number; rot: number };

// Deterministic pseudo-random so SSR and client agree.
function makeScatter(seed: number): Scatter {
  const r1 = Math.sin(seed * 12.9898) * 43758.5453;
  const r2 = Math.sin(seed * 78.233) * 43758.5453;
  const r3 = Math.sin(seed * 39.345) * 43758.5453;
  const f1 = r1 - Math.floor(r1);
  const f2 = r2 - Math.floor(r2);
  const f3 = r3 - Math.floor(r3);
  return {
    x: (f1 * 2 - 1) * 8, // -8..8 px
    y: (f2 * 2 - 1) * 8, // -8..8 px
    rot: (f3 * 2 - 1) * 15, // -15..15 deg
  };
}

export function Explode({ children, className }: Props) {
  const reduce = useReducedMotion();
  const [hover, setHover] = useState(false);

  const chars = useMemo(() => children.split(''), [children]);
  const scatters = useMemo(() => chars.map((_, i) => makeScatter(i + 1)), [chars]);

  if (reduce) {
    return <span className={className}>{children}</span>;
  }

  return (
    <span
      className={cn('inline-block', className)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
    >
      {chars.map((ch, i) => {
        const isSpace = ch === ' ';
        const s = scatters[i];
        return (
          <motion.span
            key={`${ch}-${i}`}
            aria-hidden={false}
            className="inline-block will-change-transform"
            style={{ whiteSpace: isSpace ? 'pre' : undefined }}
            animate={
              hover
                ? { x: s.x, y: s.y, rotate: s.rot }
                : { x: 0, y: 0, rotate: 0 }
            }
            transition={
              hover
                ? {
                    duration: 0.3,
                    ease: [0.22, 1, 0.36, 1],
                    delay: i * 0.02, // 20ms sequential
                  }
                : {
                    duration: 0.4,
                    ease: [0.22, 1, 0.36, 1],
                  }
            }
          >
            {isSpace ? '\u00A0' : ch}
          </motion.span>
        );
      })}
    </span>
  );
}
