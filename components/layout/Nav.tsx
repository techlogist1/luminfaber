import Link from 'next/link';
import { cn } from '@/lib/utils';

type Props = {
  className?: string;
  color?: string;
};

const links = [
  { label: 'Index', href: '/work' },
  { label: 'Work', href: '/work' },
  { label: 'Book a call', href: '/book' },
];

export function Nav({ className, color }: Props) {
  return (
    <nav
      className={cn('font-serif text-[15px] leading-none', className)}
      style={color ? { color } : undefined}
      aria-label="Primary"
    >
      {/* Desktop — 3 links */}
      <ul className="hidden md:flex items-center gap-7">
        {links.map((l) => (
          <li key={l.href + l.label}>
            <Link href={l.href} className="lf-link-underline">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
      {/* Mobile — "Book a call" only. Deliberate editorial choice, not a hamburger. */}
      <ul className="flex md:hidden">
        <li>
          <Link href="/book" className="lf-link-underline">
            Book a call
          </Link>
        </li>
      </ul>
    </nav>
  );
}
