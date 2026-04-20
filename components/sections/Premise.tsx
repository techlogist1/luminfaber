import { Container } from '@/components/ui/Container';
import { SectionReveal } from '@/components/motion/SectionReveal';
import { Typewriter } from '@/components/pretext/Typewriter';
import { CollageObject } from '@/components/premise/CollageObject';
import { InkArrow, Squiggle, AsteriskCluster } from '@/components/premise/SVGMarks';

export function Premise() {
  return (
    <section className="relative w-full py-[80px] md:py-[180px] overflow-hidden">
      <Container className="relative">
        {/* BEHIND layer — z-0, sits below the headline wrapper (z-10) */}
        <div className="pointer-events-none absolute inset-0 z-0 hidden md:block" aria-hidden>
          <CollageObject
            src="/images/premise/premise-book-stack.png"
            alt=""
            width={170}
            height={170}
            top="220px"
            left="2%"
            rotation={-8}
            floatDelayMs={0}
          />
          <CollageObject
            src="/images/premise/premise-film-roll.png"
            alt=""
            width={140}
            height={140}
            top="300px"
            left="31%"
            rotation={-4}
            floatDelayMs={900}
          />
          <CollageObject
            src="/images/premise/premise-compass.png"
            alt=""
            width={120}
            height={120}
            top="260px"
            left="58%"
            rotation={-3}
            floatDelayMs={2600}
          />
          <CollageObject
            src="/images/premise/premise-dried-orange.png"
            alt=""
            width={110}
            height={110}
            top="380px"
            left="76%"
            rotation={7}
            floatDelayMs={1100}
          />
          <CollageObject
            src="/images/premise/premise-ink-bottle.png"
            alt=""
            width={96}
            height={120}
            top="150px"
            left="52%"
            rotation={-5}
            floatDelayMs={1600}
          />
          <CollageObject
            src="/images/premise/premise-camera-lens.png"
            alt=""
            width={130}
            height={130}
            top="390px"
            left="12%"
            rotation={9}
            floatDelayMs={2100}
          />
        </div>

        {/* FRONT layer — z-20, clipped to headline zone so body paragraph stays readable */}
        <div className="pointer-events-none absolute inset-0 z-20 hidden md:block" aria-hidden>
          <CollageObject
            src="/images/premise/premise-whiskey-glass.png"
            alt=""
            width={100}
            height={100}
            top="230px"
            left="24%"
            rotation={4}
            floatDelayMs={400}
          />
          <CollageObject
            src="/images/premise/premise-typewriter-key.png"
            alt=""
            width={72}
            height={72}
            top="290px"
            left="48%"
            rotation={-10}
            floatDelayMs={2200}
          />
          <CollageObject
            src="/images/premise/premise-toy-car.png"
            alt=""
            width={92}
            height={72}
            top="170px"
            left="64%"
            rotation={-6}
            floatDelayMs={1800}
          />
          <CollageObject
            src="/images/premise/premise-postage-stamp.png"
            alt=""
            width={68}
            height={68}
            top="180px"
            left="42%"
            rotation={12}
            floatDelayMs={3000}
          />
          <CollageObject
            src="/images/premise/premise-wildflower.png"
            alt=""
            width={88}
            height={150}
            top="110px"
            left="8%"
            rotation={-3}
            floatDelayMs={1400}
          />
          <CollageObject
            src="/images/premise/premise-film-negative.png"
            alt=""
            width={140}
            height={60}
            top="340px"
            left="54%"
            rotation={-4}
            floatDelayMs={2800}
          />
        </div>

        {/* Mobile — 3 objects in margins, keep headline readable */}
        <div className="md:hidden pointer-events-none absolute inset-0 z-0" aria-hidden>
          <CollageObject
            src="/images/premise/premise-book-stack.png"
            alt=""
            width={90}
            height={90}
            top="60px"
            right="-10px"
            rotation={-6}
            floatDelayMs={0}
          />
          <CollageObject
            src="/images/premise/premise-whiskey-glass.png"
            alt=""
            width={70}
            height={70}
            top="420px"
            right="4%"
            rotation={8}
            floatDelayMs={600}
          />
          <CollageObject
            src="/images/premise/premise-wildflower.png"
            alt=""
            width={65}
            height={110}
            top="280px"
            left="-10px"
            rotation={-4}
            floatDelayMs={1200}
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
