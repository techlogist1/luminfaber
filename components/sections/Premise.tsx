import { Container } from '@/components/ui/Container';
import { SectionReveal } from '@/components/motion/SectionReveal';
import { Typewriter } from '@/components/pretext/Typewriter';
import { CollageObject } from '@/components/premise/CollageObject';
import { InkArrow, Squiggle, AsteriskCluster } from '@/components/premise/SVGMarks';

export function Premise() {
  return (
    <section className="relative w-full py-[80px] md:py-[180px] overflow-hidden">
      <Container className="relative">
        {/* Scattered collage objects — absolutely positioned, z below text (z-0) */}
        <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
          <CollageObject
            src="/images/premise/premise-book-stack.png"
            alt=""
            width={160}
            height={160}
            top="0"
            left="0"
            rotation={-6}
            floatDelayMs={0}
          />
          <CollageObject
            src="/images/premise/premise-whiskey-glass.png"
            alt=""
            width={140}
            height={140}
            top="120px"
            right="40px"
            rotation={5}
            floatDelayMs={400}
          />
          <CollageObject
            src="/images/premise/premise-film-roll.png"
            alt=""
            width={180}
            height={180}
            top="340px"
            left="-30px"
            rotation={-4}
            floatDelayMs={900}
          />
          <CollageObject
            src="/images/premise/premise-wildflower.png"
            alt=""
            width={120}
            height={200}
            top="300px"
            right="120px"
            rotation={3}
            floatDelayMs={1400}
          />
          <CollageObject
            src="/images/premise/premise-toy-car.png"
            alt=""
            width={130}
            height={100}
            top="560px"
            left="44%"
            rotation={-7}
            floatDelayMs={1800}
          />
          <CollageObject
            src="/images/premise/premise-typewriter-key.png"
            alt=""
            width={110}
            height={110}
            top="460px"
            left="18%"
            rotation={6}
            floatDelayMs={2200}
          />
          <CollageObject
            src="/images/premise/premise-compass.png"
            alt=""
            width={100}
            height={100}
            top="720px"
            right="18%"
            rotation={-3}
            floatDelayMs={2600}
          />
          <CollageObject
            src="/images/premise/premise-postage-stamp.png"
            alt=""
            width={80}
            height={80}
            bottom="40px"
            right="12%"
            rotation={8}
            floatDelayMs={3000}
          />
        </div>

        {/* §§§ floating marginalia, left column */}
        <span
          className="hidden md:block absolute left-0 top-[260px] font-mono text-[11px] text-[var(--fg-muted)] z-10"
          aria-hidden
        >
          §§§
        </span>

        {/* Sub-headline */}
        <SectionReveal className="relative z-10">
          <p className="relative max-w-[600px] mb-20 font-italic italic text-[24px] leading-[1.35] text-[var(--accent-terra)]">
            A design agency for companies that care how things look.
            <sup className="ml-2 font-mono not-italic text-[10px] tracking-[0.12em] text-[var(--fg-muted)] align-super">
              P.01
            </sup>
          </p>
        </SectionReveal>

        {/* Ink arrow between sub-headline and headline */}
        <div className="relative z-10 mb-6" aria-hidden>
          <InkArrow />
        </div>

        {/* Main headline with typewriter entrance + squiggle under "look." */}
        <div className="relative z-10 mb-[60px]">
          <Typewriter
            text="We care how things look."
            as="h2"
            className="font-serif text-[clamp(44px,10.5vw,102px)] text-fg leading-[0.95] tracking-[-0.02em] max-w-[900px]"
          />
          <span
            className="absolute left-[4%] md:left-[6%] -bottom-2 md:-bottom-4 z-10"
            aria-hidden
          >
            <Squiggle />
          </span>
        </div>

        {/* Asterisk cluster SVG near body */}
        <div className="relative z-10 mb-4" aria-hidden>
          <AsteriskCluster />
        </div>

        {/* Body */}
        <SectionReveal className="relative z-10">
          <p className="max-w-[600px] font-sans text-[19px] leading-[1.5] text-fg">
            That&apos;s not a tagline — it&apos;s the whole job. Every website we build, every
            automation we ship, every system we design: the bar is{' '}
            <em className="font-italic italic text-[var(--accent-amber-dk)]">actually beautiful</em>.
            We think that&apos;s a higher bar than most agencies set.
          </p>
        </SectionReveal>

        {/* //////// marginalia between body and sign-off */}
        <div
          className="relative z-10 mt-10 font-mono text-[11px] text-[var(--fg-muted)]"
          aria-hidden
        >
          {'//////////'}
        </div>

        {/* Sign-off */}
        <SectionReveal delay={0.1} className="relative z-10">
          <p className="mt-10 font-mono text-caption uppercase text-[var(--fg-muted)]">
            — LUMINFABER, DESIGNERS FIRST, EST. 2026
          </p>
        </SectionReveal>
      </Container>
    </section>
  );
}
