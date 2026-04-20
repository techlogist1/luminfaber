import Link from 'next/link';
import { type ComponentProps } from 'react';
import { cn } from '@/lib/utils';

type Props = ComponentProps<typeof Link> & { className?: string };

export function LinkUnderline({ className, children, ...rest }: Props) {
  return (
    <Link {...rest} className={cn('lf-link-underline', className)}>
      {children}
    </Link>
  );
}
