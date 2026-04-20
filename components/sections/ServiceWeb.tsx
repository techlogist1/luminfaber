import Image from 'next/image';
import Link from 'next/link';
import { KenBurns } from '@/components/motion/KenBurns';
import { SectionReveal } from '@/components/motion/SectionReveal';

export function ServiceWeb() {
  return (
    <section
      id="service-web"
      aria-labelledby="service-web-heading"
      className="relative w-full bg-[var(--bg)] px-5 md:px-20 py-[60px] md:py-[80px] md:min-h-[100svh] flex items-center"
    >
      <div className="poster-frame w-full relative">
        {/* Top metadata row */}
        <div className="hidden md:flex justify-between items-center mb-8 poster-metadata">
          <span>LUMINFABER / SERVICE 01 — WEB / EDITORIAL GRADE</span>
          <span>§01 · PRESENT DAY · LUMINFABER.COM</span>
        </div>
        <div className="md:hidden mb-6 poster-metadata text-center">
          LUMINFABER / §01 — WEB
        </div>

        {/* Left vertical rail (desktop) */}
        <span
          className="hidden md:block vertical-rail absolute"
          style={{ left: 18, top: '50%', transform: 'translateY(-50%) rotate(180deg)' }}
          aria-hidden
        >
          BESPOKE · EDITORIAL GRADE · NEXT.JS · TYPESCRIPT · TAILWIND
        </span>

        {/* Mobile horizontal rail */}
        <div className="md:hidden mb-4 poster-metadata text-center">
          BESPOKE · EDITORIAL GRADE · NEXT.JS · TS · TAILWIND
        </div>

        {/* Eyebrow */}
        <SectionReveal delay={0}>
          <p className="poster-metadata mb-6 md:mb-10">01 — WEB</p>
        </SectionReveal>

        {/* Composition area — headline + photo overlap via absolute positioning on desktop */}
        <div className="relative md:min-h-[62vh] md:h-[520px] lg:h-[580px]">
          {/* Anchor photo — lower right on desktop, stacked on mobile */}
          <div className="relative md:absolute md:bottom-0 md:right-0 md:w-[42%] w-full aspect-[4/5] poster-anchor-shadow overflow-hidden order-2 md:order-none mt-10 md:mt-0">
            <KenBurns durationSec={14} scaleTo={1.03}>
              <Image
                src="/images/service-web/service-web-FINAL.png"
                alt="Editorial website composition — hand-crafted typography and film-grade imagery"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
                priority={false}
              />
            </KenBurns>
          </div>

          {/* Massive headline — top left, overlaps photo on desktop */}
          <SectionReveal
            delay={0.1}
            className="md:absolute md:top-0 md:left-0 md:right-[20%] relative order-1 md:order-none"
          >
            <h2
              id="service-web-heading"
              className="poster-headline"
              style={{ position: 'relative', zIndex: 2 }}
            >
              Websites that feel
              <br />
              like <em className="terra-italic">something.</em>
            </h2>
          </SectionReveal>
        </div>

        {/* Body copy — left side, below composition */}
        <div className="mt-10 md:mt-12 md:max-w-[44%] flex flex-col gap-7">
          <SectionReveal delay={0.2}>
            <p className="font-sans text-[17px] leading-[1.55] text-[var(--fg)] max-w-[420px]">
              Bespoke, editorial-grade sites. Hand-crafted typography,
              film-grade imagery, motion that means something.
            </p>
          </SectionReveal>

          <SectionReveal delay={0.3}>
            <p className="font-sans text-[15px] leading-[1.55] text-[var(--fg-muted)] max-w-[420px]">
              Strategy + brand foundations — Design system + component
              library — Development, launch, ongoing care
            </p>
          </SectionReveal>

          <SectionReveal delay={0.4}>
            <Link
              href="/book"
              className="lf-link-underline font-sans text-[15px] font-medium text-[var(--fg)] self-start"
            >
              Request a custom quotation →
            </Link>
          </SectionReveal>
        </div>

        {/* Bottom metadata row */}
        <div className="hidden md:grid grid-cols-3 items-center mt-12 poster-metadata">
          <span className="text-left">FIG. 01 — THE WEB SERVICE</span>
          <span className="text-center">N° 01 OF 02</span>
          <span className="text-right">HAND-CRAFTED · NOT ASSEMBLED</span>
        </div>
        <div className="md:hidden mt-8 poster-metadata text-center">
          FIG. 01 · N° 01 OF 02 · HAND-CRAFTED
        </div>
      </div>
    </section>
  );
}
