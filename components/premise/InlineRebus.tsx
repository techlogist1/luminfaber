import Image from 'next/image';
import type { CSSProperties } from 'react';

type Size = 'small' | 'medium' | 'large';

const SIZE_EM: Record<Size, string> = {
  small: '0.7em',
  medium: '0.95em',
  large: '1.25em',
};

type Props = {
  src: string;
  alt?: string;
  size?: Size;
  tilt?: number;
  yOffset?: string;
};

export function InlineRebus({
  src,
  alt = '',
  size = 'medium',
  tilt = 0,
  yOffset = '-0.1em',
}: Props) {
  const wrapperStyle: CSSProperties = {
    display: 'inline-block',
    lineHeight: 0,
    transform: `translateY(${yOffset}) rotate(${tilt}deg)`,
    transformOrigin: 'center',
  };

  const imgStyle: CSSProperties = {
    display: 'inline-block',
    height: SIZE_EM[size],
    width: 'auto',
    verticalAlign: 'middle',
    marginInline: '0.12em',
  };

  return (
    <span className="inline-rebus" style={wrapperStyle} aria-hidden>
      <Image
        src={src}
        alt={alt}
        width={240}
        height={240}
        sizes="240px"
        style={imgStyle}
        className="inline-rebus-img"
        priority={false}
      />
    </span>
  );
}
