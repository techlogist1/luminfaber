import Link from 'next/link';
import { cn } from '@/lib/utils';

type Props = {
  className?: string;
  color?: string;
  href?: string;
};

export function Wordmark({ className, color, href = '/' }: Props) {
  return (
    <Link
      href={href}
      className={cn('font-serif text-[22px] leading-none tracking-tight', className)}
      style={color ? { color } : undefined}
      aria-label="Luminfaber — home"
    >
      Luminfaber
    </Link>
  );
}
