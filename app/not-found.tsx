import Link from 'next/link';
import { Wordmark } from '@/components/layout/Wordmark';

export default function NotFound() {
  return (
    <main className="relative min-h-[100svh] bg-[var(--bg)] text-fg">
      <header className="absolute inset-x-0 top-0 z-40 flex items-start justify-between px-5 pt-6 md:px-10 md:pt-7">
        <Wordmark />
      </header>

      <section className="flex min-h-[100svh] items-center justify-center px-5 md:px-10">
        <div className="flex max-w-xl flex-col gap-6">
          <p className="font-mono text-caption uppercase text-[var(--fg-muted)]">404 — PAGE NOT FOUND</p>
          <h1 className="font-serif text-display-l text-fg">This page doesn&rsquo;t exist. Yet.</h1>
          <p className="font-sans text-body-l text-[var(--fg-muted)]">
            You might&rsquo;ve followed an old link. Or we haven&rsquo;t built that page.
          </p>
          <Link href="/" className="font-sans text-[16px] text-fg lf-link-underline">
            ← Back to home
          </Link>
        </div>
      </section>
    </main>
  );
}
