import { Wordmark } from '@/components/layout/Wordmark';
import { Nav } from '@/components/layout/Nav';
import { Container } from '@/components/ui/Container';

export default function BookPage() {
  return (
    <main className="relative min-h-[100svh] w-full bg-[var(--bg)] text-[var(--fg)]">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-10 pt-7">
        <Wordmark />
        <Nav />
      </header>

      {/* Heading */}
      <section className="pt-[160px] md:pt-[200px] pb-12">
        <Container>
          <h1 className="font-serif text-[58px] md:text-display-l leading-[1] tracking-[-0.02em] text-[var(--fg)] text-center m-0">
            Let&apos;s talk.
          </h1>
        </Container>
      </section>

      {/* Cal.com iframe */}
      <section className="pb-[120px]">
        <Container>
          <div className="w-full">
            {/* eslint-disable-next-line @next/next/no-img-element -- intentional third-party iframe */}
            <iframe
              src="https://cal.com/luminfaber/30min"
              title="Book a 30-min call"
              loading="lazy"
              className="w-full border-0"
              style={{ height: '800px' }}
            />
          </div>
        </Container>
      </section>
    </main>
  );
}
