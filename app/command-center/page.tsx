import Image from 'next/image';
import Link from 'next/link';
import { Wordmark } from '@/components/layout/Wordmark';
import { Nav } from '@/components/layout/Nav';
import { Container } from '@/components/ui/Container';
import { KenBurns } from '@/components/motion/KenBurns';

export default function CommandCenterPage() {
  return (
    <main className="relative min-h-[100svh] w-full bg-[var(--bg)] text-[var(--fg)]">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-10 pt-7">
        <Wordmark color="#F5EFE0" />
        <Nav color="#F5EFE0" />
      </header>

      {/* Atmospheric cropped image */}
      <section className="relative w-full aspect-[21/9] overflow-hidden">
        <KenBurns>
          <Image
            src="/images/service-automation/service-automation-FINAL.png"
            alt=""
            fill
            sizes="100vw"
            priority
            style={{ objectFit: 'cover' }}
          />
        </KenBurns>
      </section>

      {/* Content */}
      <section className="py-[120px] md:py-[160px]">
        <Container>
          <div className="max-w-[780px] flex flex-col gap-8">
            <span className="font-mono text-caption uppercase tracking-[0.12em] text-[var(--fg-muted)]">
              THE COMMAND CENTER
            </span>
            <h1 className="font-serif text-[58px] md:text-display-l leading-[1] tracking-[-0.02em] text-[var(--fg)] m-0">
              We built our own operating system.
            </h1>
            <p className="font-sans text-body-l text-[var(--fg)] max-w-[640px] m-0">
              Every Luminfaber project runs through the Command Center. It&apos;s
              how we ship fast, stay organized, and give you real visibility
              into the work. We use it internally today. You&apos;ll use it too,
              soon.
            </p>
            <div className="pt-4">
              <Link
                href="/"
                className="lf-link-underline font-sans text-[16px] font-medium text-[var(--fg)]"
              >
                ← Back to index
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
