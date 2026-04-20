'use client';

import { useEffect, useRef, useState } from 'react';

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const shouldEnable = fine.matches && !reduce.matches;
    if (!shouldEnable) return;

    setEnabled(true);
    document.documentElement.classList.add('lf-cursor-on');

    let rx = window.innerWidth / 2;
    let ry = window.innerHeight / 2;
    let tx = rx;
    let ty = ry;
    let rafId = 0;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${tx - 6}px, ${ty - 6}px, 0)`;
      }
    };

    const loop = () => {
      rx += (tx - rx) * 0.18;
      ry += (ty - ry) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${rx - 20}px, ${ry - 20}px, 0)`;
      }
      rafId = requestAnimationFrame(loop);
    };

    const onHoverToggle = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const interactive = !!target?.closest('a, button, [role="button"], input, textarea, label');
      ringRef.current?.setAttribute('data-hover', interactive ? 'true' : 'false');
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onHoverToggle, { passive: true });
    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onHoverToggle);
      cancelAnimationFrame(rafId);
      document.documentElement.classList.remove('lf-cursor-on');
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[100] h-3 w-3 rounded-full"
        style={{ background: 'var(--accent-amber)', willChange: 'transform' }}
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[100] h-10 w-10 rounded-full transition-[width,height,margin] duration-200"
        style={{
          border: '0.5px solid var(--fg)',
          mixBlendMode: 'difference',
          willChange: 'transform',
        }}
      />
    </>
  );
}
