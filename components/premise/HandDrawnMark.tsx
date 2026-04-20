import type { CSSProperties } from 'react';

type Variant = 'wave' | 'circle' | 'asterisk' | 'arrow';

type Props = {
  variant: Variant;
  width?: number;
  height?: number;
  color?: string;
  stroke?: number;
  rotate?: number;
  className?: string;
  style?: CSSProperties;
};

export function HandDrawnMark({
  variant,
  width,
  height,
  color = 'currentColor',
  stroke = 2,
  rotate = 0,
  className,
  style,
}: Props) {
  const common: CSSProperties = {
    display: 'inline-block',
    transform: `rotate(${rotate}deg)`,
    transformOrigin: 'center',
    overflow: 'visible',
    ...style,
  };

  if (variant === 'wave') {
    const w = width ?? 80;
    const h = height ?? 14;
    return (
      <svg
        className={className}
        style={common}
        width={w}
        height={h}
        viewBox="0 0 80 14"
        fill="none"
        aria-hidden
      >
        <path
          d="M1 8 C 8 2, 16 12, 24 7 S 40 3, 48 9 C 56 13, 64 4, 72 8 L 79 7"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (variant === 'circle') {
    const w = width ?? 120;
    const h = height ?? 60;
    return (
      <svg
        className={className}
        style={common}
        width={w}
        height={h}
        viewBox="0 0 120 60"
        fill="none"
        aria-hidden
      >
        <path
          d="M 60 4 C 24 3, 6 16, 5 30 C 4 46, 28 57, 62 56 C 96 55, 115 45, 116 29 C 117 16, 96 5, 62 5"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    );
  }

  if (variant === 'asterisk') {
    const w = width ?? 40;
    const h = height ?? 14;
    return (
      <svg
        className={className}
        style={common}
        width={w}
        height={h}
        viewBox="0 0 40 14"
        fill="none"
        aria-hidden
      >
        <g stroke={color} strokeWidth={stroke} strokeLinecap="round">
          <path d="M 7 7 L 13 3" />
          <path d="M 7 7 L 13 11" />
          <path d="M 7 7 L 14 7" />
          <path d="M 26 7 L 33 4" />
          <path d="M 26 7 L 32 11" />
          <path d="M 26 7 L 34 8" />
        </g>
      </svg>
    );
  }

  // arrow — wavy descending arrow
  const w = width ?? 44;
  const h = height ?? 40;
  return (
    <svg
      className={className}
      style={common}
      width={w}
      height={h}
      viewBox="0 0 44 40"
      fill="none"
      aria-hidden
    >
      <path
        d="M 6 4 C 10 10, 18 8, 20 14 C 22 22, 12 24, 18 32 L 22 38"
        stroke={color}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M 15 32 L 22 38 L 28 30"
        stroke={color}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
