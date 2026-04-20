import { type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export function Container({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('mx-auto w-full max-w-container px-5 md:px-10', className)}
      {...props}
    />
  );
}
