import Link from 'next/link';
import { Wordmark } from '@/components/layout/Wordmark';
import { Nav } from '@/components/layout/Nav';
import { Container } from '@/components/ui/Container';
import { SectionReveal } from '@/components/motion/SectionReveal';

type Case = {
  name: string;
  summary: string;
};

const cases: Case[] = [
  {
    name: 'Northfield Studio',
    summary: 'Brand system + e-commerce. 38% lift in AOV. Ongoing care.',
  },
  {
    name: 'Paper & Ink Ltd.',
    summary: 'Editorial platform rebuild. 2× organic traffic. Launched in 9 weeks.',
  },
  {
    name: 'Forest & Field Co.',
    summary: 'D2C site + AI product recommender. 4× conversion lift.',
  },
];

export default function WorkPage() {
  return (
    <main className="relative min-h-[100svh] w-full bg-[var(--bg)] text-[var(--fg)]">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-10 pt-7">
        <Wordmark />
        <Nav />
      </header>

      {/* Hero header */}
      <section className="pt-[160px] md:pt-[200px] pb-[120px]">
        <Container>
          <span className="font-mono text-caption uppercase tracking-[0.12em] text-[var(--fg-muted)]">
            WORK
          </span>
          <h1 className="mt-4 font-serif text-[58px] md:text-display-l leading-[1] tracking-[-0.02em] text-[var(--fg)] m-0">
            Selected work.
          </h1>
        </Container>
      </section>

      {/* Cases */}
      <section className="pb-[180px]">
        <Container>
          <div className="flex flex-col gap-[120px]">
            {cases.map((c) => (
              <SectionReveal key={c.name}>
                <article className="flex flex-col gap-6">
                  <div
                    className="aspect-video w-full bg-[var(--fg-subtle)]/25 border border-dashed border-[var(--fg-subtle)]"
                    aria-label={`${c.name} case study placeholder`}
                  />
                  <h2 className="font-serif text-display-m leading-[1.05] tracking-[-0.02em] text-[var(--fg)] m-0">
                    {c.name}
                  </h2>
                  <p className="font-sans text-body-l max-w-[640px] text-[var(--fg-muted)] m-0">
                    {c.summary}
                  </p>
                  <Link
                    href="#"
                    className="lf-link-underline font-sans text-[16px] font-medium text-[var(--fg)] self-start"
                  >
                    Read the case →
                  </Link>
                </article>
              </SectionReveal>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
