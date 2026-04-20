'use client';

import { createElement, useEffect, useRef, useState, type JSX } from 'react';
import { cn } from '@/lib/utils';

type TypewriterProps = {
  text: string;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  staggerMs?: number;
  durationMs?: number;
  threshold?: number;
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

export function Typewriter({
  text,
  className,
  as = 'span',
  staggerMs = 50,
  durationMs = 200,
  threshold = 0.3,
}: TypewriterProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [triggered, setTriggered] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || triggered) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setTriggered(true);
            io.disconnect();
            break;
          }
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, triggered]);

  const chars = Array.from(text);

  // Group chars into words so inline-block letters don't break mid-word at line wrap.
  type Word = { start: number; chars: string[] };
  const words: Word[] = [];
  {
    let buf: string[] = [];
    let start = 0;
    for (let i = 0; i < chars.length; i++) {
      const ch = chars[i];
      if (ch === ' ') {
        if (buf.length) {
          words.push({ start, chars: buf });
          buf = [];
        }
        words.push({ start: i, chars: [ch] });
        start = i + 1;
      } else {
        if (buf.length === 0) start = i;
        buf.push(ch);
      }
    }
    if (buf.length) words.push({ start, chars: buf });
  }

  const children = reduced ? (
    // Reduced motion: opacity fade-up on the whole element, no per-char stagger.
    <span
      style={{
        display: 'inline',
        opacity: triggered ? 1 : 0,
        transform: triggered ? 'translateY(0)' : 'translateY(4px)',
        transition: `opacity ${durationMs}ms ease-out, transform ${durationMs}ms ease-out`,
      }}
    >
      {text}
    </span>
  ) : (
    <>
      {/* SR-only fallback so screen readers read the full string in one breath */}
      <span
        style={{
          position: 'absolute',
          width: 1,
          height: 1,
          overflow: 'hidden',
          clip: 'rect(0 0 0 0)',
          whiteSpace: 'nowrap',
        }}
      >
        {text}
      </span>
      <span aria-hidden>
        {words.map((word, wi) => {
          const isSpaceWord = word.chars.length === 1 && word.chars[0] === ' ';
          if (isSpaceWord) {
            const i = word.start;
            return (
              <span
                key={`s-${wi}`}
                style={{
                  display: 'inline',
                  whiteSpace: 'normal',
                  opacity: triggered ? 1 : 0,
                  transition: `opacity ${durationMs}ms ease-out ${i * staggerMs}ms`,
                }}
              >
                {' '}
              </span>
            );
          }
          return (
            <span
              key={`w-${wi}`}
              style={{ display: 'inline-block', whiteSpace: 'nowrap' }}
            >
              {word.chars.map((ch, ci) => {
                const i = word.start + ci;
                return (
                  <span
                    key={ci}
                    style={{
                      display: 'inline-block',
                      opacity: triggered ? 1 : 0,
                      transform: triggered ? 'translateY(0)' : 'translateY(4px)',
                      transition: `opacity ${durationMs}ms ease-out ${i * staggerMs}ms, transform ${durationMs}ms ease-out ${i * staggerMs}ms`,
                      willChange: 'opacity, transform',
                    }}
                  >
                    {ch}
                  </span>
                );
              })}
            </span>
          );
        })}
      </span>
    </>
  );

  return createElement(
    as,
    {
      ref: ref as React.RefObject<never>,
      className: cn(className),
      style: { position: 'relative' },
    },
    children,
  );
}
