import Image from 'next/image';
import Link from 'next/link';
import { KenBurns } from '@/components/motion/KenBurns';
import { SectionReveal } from '@/components/motion/SectionReveal';

export function ServiceAutomation() {
  return (
    <section
      id="service-automation"
      aria-labelledby="service-automation-heading"
      className="relative w-full"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 md:min-h-[720px]">
        {/* LEFT — text column (desktop). On mobile, text renders AFTER image via order. */}
        <div className="order-2 md:order-1 flex flex-col justify-center gap-8 py-[80px] md:py-[180px] px-5 md:px-20">
          <SectionReveal delay={0}>
            <p className="font-mono text-caption uppercase text-[var(--fg-muted)]">
              02 — AUTOMATION
            </p>
          </SectionReveal>

          <SectionReveal delay={0.1}>
            <h2
              id="service-automation-heading"
              className="font-serif text-display-m text-[var(--fg)]"
            >
              Pipelines that do the work.
            </h2>
          </SectionReveal>

          <SectionReveal delay={0.2}>
            <p className="font-sans text-body-l max-w-[480px] text-[var(--fg)]">
              We build custom AI automations, internal tools, and data
              pipelines. Your team stops doing the boring parts. The good
              work compounds.
            </p>
          </SectionReveal>

          <SectionReveal delay={0.3}>
            <p className="font-sans text-body max-w-[480px] text-[var(--fg-muted)]">
              Workflow automation, custom built — AI pipelines with real
              reliability — Internal dashboards + operator tools
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

        {/* RIGHT — full-bleed image, fills entire column */}
        <div className="order-1 md:order-2 relative w-full aspect-[4/5] md:aspect-auto md:h-auto">
          <KenBurns durationSec={12} scaleTo={1.03}>
            <Image
              src="/images/service-automation/service-automation-FINAL.png"
              alt="Automation pipeline composition — operator tools, dashboards, and data flow"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority={false}
            />
          </KenBurns>
        </div>
      </div>
    </section>
  );
}
