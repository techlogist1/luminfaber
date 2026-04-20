'use client';

import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react';

type MorphProps = {
  phrases: string[];
  fontSize?: number;
  fontFamily?: string;
  color?: string;
  dwellMs?: number;
  morphMs?: number;
  className?: string;
};

type CharPos = { ch: string; x: number; y: number; w: number };

// Measure per-character positions by rendering each char as an inline-block
// span into an off-DOM measurement node using the real computed font.
function measurePhrase(text: string, font: string, fontSize: number): CharPos[] {
  if (typeof document === 'undefined') return [];
  const host = document.createElement('div');
  host.setAttribute(
    'style',
    `position:absolute;left:-99999px;top:-99999px;white-space:pre;visibility:hidden;
     font-family:${font};font-size:${fontSize}px;letter-spacing:-0.02em;line-height:1;font-weight:400;`,
  );
  const spans: HTMLSpanElement[] = [];
  for (const ch of Array.from(text)) {
    const s = document.createElement('span');
    s.textContent = ch === ' ' ? '\u00A0' : ch;
    s.style.display = 'inline-block';
    host.appendChild(s);
    spans.push(s);
  }
  document.body.appendChild(host);
  const hostRect = host.getBoundingClientRect();
  const out: CharPos[] = spans.map((s, i) => {
    const r = s.getBoundingClientRect();
    return {
      ch: Array.from(text)[i],
      x: r.left - hostRect.left,
      y: r.top - hostRect.top,
      w: r.width,
    };
  });
  document.body.removeChild(host);
  return out;
}

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

// Ease curve for the morph — smooth in/out
const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

export function Morph({
  phrases,
  fontSize = 104,
  fontFamily = 'var(--font-prata)',
  color = '#F5EFE0',
  dwellMs = 4000,
  morphMs = 800,
  className,
}: MorphProps) {
  const wrapRef = useRef<HTMLSpanElement>(null);
  const [index, setIndex] = useState(0);
  const [positions, setPositions] = useState<CharPos[][]>([]);
  const [containerSize, setContainerSize] = useState<{ w: number; h: number }>({ w: 0, h: 0 });
  const [computedSize, setComputedSize] = useState(fontSize);
  const [progress, setProgress] = useState(0); // 0 = src, 1 = tgt
  const [phase, setPhase] = useState<'dwell' | 'morph'>('dwell');
  const reduced = usePrefersReducedMotion();

  // Read computed font-size from wrapper so we can do responsive sizing via CSS.
  useLayoutEffect(() => {
    if (!wrapRef.current) return;
    const cs = window.getComputedStyle(wrapRef.current);
    const parsed = parseFloat(cs.fontSize);
    if (!Number.isNaN(parsed) && parsed > 0) setComputedSize(parsed);
  }, [fontSize]);

  // Recompute positions when phrases, size, or font change.
  useLayoutEffect(() => {
    if (!phrases.length) return;
    const font = fontFamily;
    const all = phrases.map((p) => measurePhrase(p, font, computedSize));
    setPositions(all);
    const maxW = Math.max(...all.map((ps) => (ps.length ? ps[ps.length - 1].x + ps[ps.length - 1].w : 0)));
    setContainerSize({ w: maxW, h: computedSize * 1.1 });
  }, [phrases, fontFamily, computedSize]);

  // Cycle scheduler.
  useEffect(() => {
    if (phrases.length < 2) return;
    let raf = 0;
    let timer: ReturnType<typeof setTimeout> | null = null;
    let cancelled = false;

    const runMorph = (start: number) => {
      setPhase('morph');
      const t0 = performance.now();
      const step = (now: number) => {
        if (cancelled) return;
        const t = Math.min(1, (now - t0) / morphMs);
        setProgress(t);
        if (t < 1) {
          raf = requestAnimationFrame(step);
        } else {
          setIndex((i) => (i + 1) % phrases.length);
          setProgress(0);
          setPhase('dwell');
          timer = setTimeout(() => runMorph(performance.now()), dwellMs);
        }
      };
      raf = requestAnimationFrame(step);
    };

    timer = setTimeout(() => runMorph(performance.now()), dwellMs);
    return () => {
      cancelled = true;
      if (raf) cancelAnimationFrame(raf);
      if (timer) clearTimeout(timer);
    };
  }, [phrases.length, dwellMs, morphMs]);

  // Reduced-motion fallback: opacity crossfade, no per-char motion.
  if (reduced) {
    return (
      <span
        ref={wrapRef}
        className={className}
        style={{
          display: 'inline-block',
          fontFamily,
          fontSize,
          color,
          letterSpacing: '-0.02em',
          lineHeight: 1,
          fontWeight: 400,
        }}
      >
        <span
          key={phrases[index]}
          style={{
            display: 'inline-block',
            animation: 'lf-morph-fade 800ms ease-in-out',
          }}
        >
          {phrases[index]}
        </span>
        <style>{`
          @keyframes lf-morph-fade {
            from { opacity: 0; }
            to   { opacity: 1; }
          }
        `}</style>
      </span>
    );
  }

  const srcIdx = index;
  const tgtIdx = (index + 1) % phrases.length;
  const src = positions[srcIdx] ?? [];
  const tgt = positions[tgtIdx] ?? [];
  const maxLen = Math.max(src.length, tgt.length);

  // While dwelling, keep t = 0 so source is fully visible.
  const t = phase === 'morph' ? easeInOut(progress) : 0;

  return (
    <span
      ref={wrapRef}
      className={className}
      style={{
        position: 'relative',
        display: 'inline-block',
        fontFamily,
        fontSize,
        color,
        letterSpacing: '-0.02em',
        lineHeight: 1,
        fontWeight: 400,
        width: containerSize.w || undefined,
        height: containerSize.h || undefined,
        verticalAlign: 'top',
      }}
      aria-label={phrases[srcIdx]}
    >
      {/* Screen-reader text — only the active phrase */}
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
        {phrases[srcIdx]}
      </span>

      {Array.from({ length: maxLen }).map((_, i) => {
        const s = src[i];
        const g = tgt[i];

        // Index-based matching: char i in src morphs to char i in tgt.
        // If one side is missing (length diff), fade in/out at target side.
        if (s && g) {
          const x = s.x + (g.x - s.x) * t;
          const y = s.y + (g.y - s.y) * t;
          const ch = t < 0.5 ? s.ch : g.ch;
          // Crossfade at the midpoint so char-swap isn't jarring when letters differ.
          const opacity =
            s.ch === g.ch ? 1 : t < 0.5 ? 1 - t * 2 * 0.6 : 0.4 + (t - 0.5) * 2 * 0.6;
          const style: CSSProperties = {
            position: 'absolute',
            left: 0,
            top: 0,
            transform: `translate(${x}px, ${y}px)`,
            opacity,
            willChange: 'transform, opacity',
          };
          return (
            <span key={i} style={style} aria-hidden>
              {ch === ' ' ? '\u00A0' : ch}
            </span>
          );
        }
        if (s && !g) {
          // Char disappears — fade out in place.
          return (
            <span
              key={`s-${i}`}
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                transform: `translate(${s.x}px, ${s.y}px)`,
                opacity: 1 - t,
                willChange: 'opacity',
              }}
              aria-hidden
            >
              {s.ch === ' ' ? '\u00A0' : s.ch}
            </span>
          );
        }
        if (g && !s) {
          // Char appears — fade in at target position.
          return (
            <span
              key={`g-${i}`}
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                transform: `translate(${g.x}px, ${g.y}px)`,
                opacity: t,
                willChange: 'opacity',
              }}
              aria-hidden
            >
              {g.ch === ' ' ? '\u00A0' : g.ch}
            </span>
          );
        }
        return null;
      })}
    </span>
  );
}
