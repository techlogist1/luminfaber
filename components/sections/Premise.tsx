import { SectionReveal } from '@/components/motion/SectionReveal';
import { InlineRebus } from '@/components/premise/InlineRebus';

export function Premise() {
  return (
    <section className="relative w-full min-h-[100svh] py-[40px] md:py-[100px] px-5 md:px-[60px] bg-[var(--bg)] flex flex-col items-center justify-center">
      {/* Top metadata strip */}
      <SectionReveal>
        <p className="mb-16 md:mb-20 text-center font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--fg-muted)]">
          P.01 — PREMISE · ONE SENTENCE · LUMINFABER EST. 2026
        </p>
      </SectionReveal>

      {/* Nouveau rebus headline — inline images at em-scale */}
      <SectionReveal>
        <h2 className="premise-headline">
          We{' '}
          <InlineRebus
            src="/images/premise/premise-whiskey-glass.png"
            size="large"
            rotate={-4}
          />{' '}
          care{' '}
          <InlineRebus
            src="/images/premise/premise-compass.png"
            size="medium"
            rotate={6}
          />{' '}
          how{' '}
          <InlineRebus
            src="/images/premise/premise-typewriter-key.png"
            size="small"
            rotate={-8}
          />{' '}
          things{' '}
          <InlineRebus
            src="/images/premise/premise-book-stack.png"
            size="large"
            rotate={3}
          />{' '}
          <em className="terra-italic">look.</em>{' '}
          <InlineRebus
            src="/images/premise/premise-film-roll.png"
            size="small"
            rotate={-5}
          />
        </h2>
      </SectionReveal>

      {/* Body paragraph — counterweight below the massive headline */}
      <SectionReveal delay={0.2}>
        <p className="mt-[100px] md:mt-[120px] max-w-[560px] mx-auto text-center font-sans text-[18px] leading-[1.6] text-[var(--fg)]">
          That&apos;s not a tagline — it&apos;s the whole job. Every website we build,
          every automation we ship, every system we design: the bar is{' '}
          <em className="amber-italic">actually beautiful</em>. We think that&apos;s
          a higher bar than most agencies set.
        </p>
      </SectionReveal>

      {/* Sign-off */}
      <SectionReveal delay={0.4}>
        <p className="mt-10 text-center font-mono text-[12px] uppercase tracking-[0.12em] text-[var(--fg-muted)]">
          — LUMINFABER, DESIGNERS FIRST, EST. 2026
        </p>
      </SectionReveal>
    </section>
  );
}
