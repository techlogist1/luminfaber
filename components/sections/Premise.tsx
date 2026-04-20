import { SectionReveal } from '@/components/motion/SectionReveal';
import { InlineRebus } from '@/components/premise/InlineRebus';
import { HandDrawnMark } from '@/components/premise/HandDrawnMark';

export function Premise() {
  return (
    <section className="relative w-full min-h-[100svh] py-[40px] md:py-[100px] px-5 md:px-[60px] bg-[var(--bg)] flex flex-col items-center justify-center">
      {/* Top metadata strip */}
      <SectionReveal>
        <p className="mb-16 md:mb-20 text-center font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--fg-muted)]">
          P.01 — PREMISE · ONE SENTENCE · LUMINFABER EST. 2026
        </p>
      </SectionReveal>

      {/* Nouveau rebus headline — inline images at em-scale + hand-drawn marks */}
      <SectionReveal>
        <h2 className="premise-headline">
          <span style={{ marginRight: '0.1em' }}>We</span>
          <InlineRebus
            src="/images/premise/premise-whiskey-glass.png"
            size="large"
            tilt={-4}
            yOffset="-0.1em"
          />
          <span
            className="wavy-underline"
            style={{ marginLeft: '0.18em', marginRight: '0.12em' }}
          >
            care
            <HandDrawnMark
              variant="wave"
              className="hand-mark"
              width={80}
              height={14}
              stroke={2}
            />
          </span>
          <InlineRebus
            src="/images/premise/premise-compass.png"
            size="medium"
            tilt={6}
            yOffset="-0.25em"
          />
          <span
            className="circled"
            style={{ marginLeft: '0.22em', marginRight: '0.12em' }}
          >
            how
            <HandDrawnMark
              variant="circle"
              className="hand-mark"
              color="var(--accent-terra)"
              stroke={1.5}
              rotate={-3}
            />
          </span>
          <InlineRebus
            src="/images/premise/premise-typewriter-key.png"
            size="small"
            tilt={-7}
            yOffset="0.05em"
          />
          <span style={{ marginLeft: '0.12em', marginRight: '0.08em' }}>things</span>
          <HandDrawnMark
            variant="asterisk"
            width={40}
            height={14}
            color="var(--fg-muted)"
            stroke={1.5}
            rotate={8}
            style={{ marginInline: '0.1em', verticalAlign: 'middle' }}
          />
          <InlineRebus
            src="/images/premise/premise-book-stack.png"
            size="large"
            tilt={3}
            yOffset="-0.05em"
          />
          <span
            className="arrow-above"
            style={{ marginLeft: '0.18em', marginRight: '0.1em' }}
          >
            <em className="terra-italic">look.</em>
            <HandDrawnMark
              variant="arrow"
              className="hand-mark"
              color="var(--accent-terra)"
              stroke={1.5}
              width={40}
              height={36}
            />
          </span>
          <InlineRebus
            src="/images/premise/premise-film-roll.png"
            size="small"
            tilt={-5}
            yOffset="-0.2em"
          />
        </h2>
      </SectionReveal>

      {/* Body paragraph */}
      <SectionReveal delay={0.2}>
        <p className="mt-[100px] md:mt-[120px] max-w-[560px] mx-auto text-center font-sans text-[18px] leading-[1.6] text-[var(--fg)]">
          That&apos;s not a tagline — it&apos;s the whole job. Every website we build,
          every automation we ship, every system we design: the bar is{' '}
          <span className="handwritten-accent" style={{ fontSize: '24px' }}>
            actually
          </span>{' '}
          <em className="amber-italic">beautiful</em>. We think that&apos;s a higher
          bar than most agencies set.
        </p>
      </SectionReveal>

      {/* Sign-off */}
      <SectionReveal delay={0.4}>
        <p className="mt-10 text-center font-mono text-[12px] uppercase tracking-[0.12em] text-[var(--fg-muted)]">
          — LUMINFABER, DESIGNERS FIRST, EST. 2026
        </p>
      </SectionReveal>

      {/* Handwritten signature */}
      <SectionReveal delay={0.5}>
        <p
          className="caveat text-center"
          style={{
            marginTop: '16px',
            fontSize: '18px',
            color: 'var(--accent-terra)',
            transform: 'rotate(-3deg)',
          }}
        >
          written by hand. meant it too.
        </p>
      </SectionReveal>
    </section>
  );
}
