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
  rotate?: number;
};

export function InlineRebus({ src, alt = '', size = 'medium', rotate = 0 }: Props) {
  const imgStyle: CSSProperties = {
    display: 'inline-block',
    height: SIZE_EM[size],
    width: 'auto',
    verticalAlign: 'middle',
    marginInline: '0.12em',
    transform: `translateY(-0.1em) rotate(${rotate}deg)`,
  };

  return (
    <span className="inline-rebus" aria-hidden>
      <Image
        src={src}
        alt={alt}
        width={240}
        height={240}
        sizes="240px"
        style={imgStyle}
        priority={false}
      />
    </span>
  );
}
