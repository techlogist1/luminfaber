import { type SVGProps } from 'react';

// All marks: 2px stroke var(--fg), no fill. Small (~40–100px wide).

export function InkArrow({ className, ...rest }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="72"
      height="24"
      viewBox="0 0 72 24"
      fill="none"
      aria-hidden
      className={className}
      {...rest}
    >
      <path
        d="M3 12 C 16 6, 34 20, 68 12"
        stroke="var(--fg)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M60 6 L 68 12 L 60 18"
        stroke="var(--fg)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Squiggle({ className, ...rest }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="96"
      height="14"
      viewBox="0 0 96 14"
      fill="none"
      aria-hidden
      className={className}
      {...rest}
    >
      <path
        d="M2 8 C 10 2, 18 14, 26 8 S 42 2, 50 8 S 66 14, 74 8 S 88 2, 94 8"
        stroke="var(--fg)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function AsteriskCluster({ className, ...rest }: SVGProps<SVGSVGElement>) {
  // 3 asterisks, each built from 3 crossing strokes.
  const Asterisk = ({ cx, cy, r = 7 }: { cx: number; cy: number; r?: number }) => (
    <g
      stroke="var(--fg)"
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
      transform={`translate(${cx} ${cy})`}
    >
      <line x1={-r} y1="0" x2={r} y2="0" />
      <line x1="0" y1={-r} x2="0" y2={r} />
      <line x1={-r * 0.7} y1={-r * 0.7} x2={r * 0.7} y2={r * 0.7} />
    </g>
  );
  return (
    <svg
      width="64"
      height="22"
      viewBox="0 0 64 22"
      fill="none"
      aria-hidden
      className={className}
      {...rest}
    >
      <Asterisk cx={10} cy={11} />
      <Asterisk cx={32} cy={11} />
      <Asterisk cx={54} cy={11} />
    </svg>
  );
}
