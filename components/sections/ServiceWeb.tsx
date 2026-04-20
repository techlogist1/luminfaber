import Image from 'next/image';
import Link from 'next/link';
import { KenBurns } from '@/components/motion/KenBurns';
import { SectionReveal } from '@/components/motion/SectionReveal';

export function ServiceWeb() {
  return (
    <section
      id="service-web"
      aria-labelledby="service-web-heading"
      className="relative w-full"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 md:min-h-[720px]">
        {/* LEFT — full-bleed image, fills entire column */}
        <div className="relative w-full aspect-[4/5] md:aspect-auto md:h-auto">
          <KenBurns durationSec={12} scaleTo={1.03}>
            <Image
              src="/images/service-web/service-web-FINAL.png"
              alt="Editorial website composition — hand-crafted typography and film-grade imagery"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority={false}
            />
          </KenBurns>
        </div>

        {/* RIGHT — text column */}
        <div className="flex flex-col justify-center gap-8 py-[80px] md:py-[180px] px-5 md:px-20">
          <SectionReveal delay={0}>
            <p className="font-mono text-caption uppercase text-[var(--fg-muted)]">
              01 — WEB
            </p>
          </SectionReveal>

          <SectionReveal delay={0.1}>
            <h2
              id="service-web-heading"
              className="font-serif text-display-m text-[var(--fg)]"
            >
              Websites that feel like something.
            </h2>
          </SectionReveal>

          <SectionReveal delay={0.2}>
            <p className="font-sans text-body-l max-w-[480px] text-[var(--fg)]">
              Bespoke, editorial-grade sites. Hand-crafted typography,
              film-grade imagery, motion that means something. We build in
              Next.js, TypeScript, Tailwind — the modern stack, composed with
              taste.
            </p>
          </SectionReveal>

          <SectionReveal delay={0.3}>
            <p className="font-sans text-body max-w-[480px] text-[var(--fg-muted)]">
              Strategy + brand foundations — Design system + component
              library — Development, launch, ongoing care
            </p>
          </SectionReveal>

          <SectionReveal delay={0.4}>
            <Link
              href="/book"
              className="lf-link-underline font-sans text-[16px] font-medium text-[var(--fg)]"
            >
              Request a custom quotation →
            </Link>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
