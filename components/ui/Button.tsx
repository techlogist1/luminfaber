'use client';

import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type Variant = 'pill' | 'link';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
};

export const Button = forwardRef<HTMLButtonElement, Props>(function Button(
  { variant = 'pill', className, children, ...rest },
  ref,
) {
  if (variant === 'link') {
    return (
      <button
        ref={ref}
        className={cn(
          'font-sans text-[16px] font-medium text-fg lf-link-underline',
          className,
        )}
        {...rest}
      >
        {children}
      </button>
    );
  }
  return (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center rounded-full px-9 py-[18px]',
        'bg-[var(--accent-amber)] text-fg font-sans text-[16px] font-medium',
        'transition-[transform,box-shadow] duration-200 ease-out',
        'hover:-translate-y-[1px] hover:shadow-[0_6px_14px_rgba(232,168,73,0.22)]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-amber-dk)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]',
        'shadow-[0_4px_8px_rgba(232,168,73,0.2)]',
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
});
