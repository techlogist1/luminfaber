'use client';

import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type Variant = 'pill' | 'link' | 'editorial';

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
  if (variant === 'editorial') {
    return (
      <button
        ref={ref}
        className={cn(
          'group relative inline-flex items-center justify-center px-9 py-[16px]',
          'font-sans text-[15px] font-medium tracking-[0.02em]',
          'text-[#F5EFE0] bg-transparent',
          'border border-[rgba(245,239,224,0.55)]',
          'transition-colors duration-300 ease-out',
          'hover:border-[rgba(245,239,224,0.95)] hover:bg-[rgba(245,239,224,0.06)]',
          'focus-visible:outline-none focus-visible:border-[#F5EFE0] focus-visible:bg-[rgba(245,239,224,0.1)]',
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
