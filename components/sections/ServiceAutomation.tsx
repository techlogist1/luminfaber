import Image from 'next/image';
import Link from 'next/link';
import { KenBurns } from '@/components/motion/KenBurns';
import { SectionReveal } from '@/components/motion/SectionReveal';

export function ServiceAutomation() {
  return (
    <section
      id="service-automation"
      aria-labelledby="service-automation-heading"
      className="relative w-full bg-[var(--bg)] px-5 md:px-20 py-[60px] md:py-[80px] md:min-h-[100svh] flex items-center"
    >
      <div className="poster-frame w-full relative">
        {/* Top metadata row — mirrored */}
        <div className="hidden md:flex justify-between items-center mb-8 poster-metadata">
          <span>§02 · PRESENT DAY · PIPELINES</span>
          <span>LUMINFABER / SERVICE 02 — AUTOMATION / OPERATOR GRADE</span>
        </div>
        <div className="md:hidden mb-6 poster-metadata text-center">
          LUMINFABER / §02 — AUTOMATION
        </div>

        {/* Right vertical rail (desktop) */}
        <span
          className="hidden md:block vertical-rail absolute"
          style={{ right: 18, top: '50%', transform: 'translateY(-50%) rotate(0deg)' }}
          aria-hidden
        >
          WORKFLOW · AI PIPELINES · DASHBOARDS · OPERATOR TOOLS
        </span>

        <div className="md:hidden mb-4 poster-metadata text-center">
          WORKFLOW · AI · DASHBOARDS · OPERATOR TOOLS
        </div>

        {/* Eyebrow — right-aligned */}
        <SectionReveal delay={0}>
          <p className="poster-metadata mb-6 md:mb-10 md:text-right">02 — AUTOMATION</p>
        </SectionReveal>

        {/* Composition area — mirror of ServiceWeb */}
        <div className="relative md:min-h-[62vh] md:h-[520px] lg:h-[580px]">
          {/* Anchor photo — lower LEFT on desktop */}
          <div className="relative md:absolute md:bottom-0 md:left-0 md:w-[42%] w-full aspect-[4/5] poster-anchor-shadow overflow-hidden order-2 md:order-none mt-10 md:mt-0">
            <KenBurns durationSec={14} scaleTo={1.03}>
              <Image
                src="/images/service-automation/service-automation-FINAL.png"
                alt="Automation pipeline composition — operator tools, dashboards, and data flow"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
                priority={false}
              />
            </KenBurns>
          </div>

          {/* Massive headline — top right, overlaps photo on desktop */}
          <SectionReveal
            delay={0.1}
            className="md:absolute md:top-0 md:right-0 md:left-[20%] relative order-1 md:order-none"
          >
            <h2
              id="service-automation-heading"
              className="poster-headline md:text-right"
              style={{ position: 'relative', zIndex: 2 }}
            >
              Pipelines that do the
              <br />
              <em className="terra-italic">work.</em>
            </h2>
          </SectionReveal>
        </div>

        {/* Body copy — right side, below composition */}
        <div className="mt-10 md:mt-12 md:max-w-[44%] md:ml-auto flex flex-col gap-7 md:items-end md:text-right">
          <SectionReveal delay={0.2}>
            <p className="font-sans text-[17px] leading-[1.55] text-[var(--fg)] max-w-[420px]">
              We build custom AI automations, internal tools, and data
              pipelines. Your team stops doing the boring parts. The good
              work compounds.
            </p>
          </SectionReveal>

          <SectionReveal delay={0.3}>
            <p className="font-sans text-[15px] leading-[1.55] text-[var(--fg-muted)] max-w-[420px]">
              Workflow automation, custom built — AI pipelines with real
              reliability — Internal dashboards + operator tools
            </p>
          </SectionReveal>

          <SectionReveal delay={0.4}>
            <Link
              href="/book"
              className="lf-link-underline font-sans text-[15px] font-medium text-[var(--fg)]"
            >
              Request a custom quotation →
            </Link>
          </SectionReveal>
        </div>

        {/* Bottom metadata */}
        <div className="hidden md:grid grid-cols-3 items-center mt-12 poster-metadata">
          <span className="text-left">FIG. 02 — THE AUTOMATION SERVICE</span>
          <span className="text-center">N° 02 OF 02</span>
          <span className="text-right">YOUR TEAM COMPOUNDS</span>
        </div>
        <div className="md:hidden mt-8 poster-metadata text-center">
          FIG. 02 · N° 02 OF 02 · YOUR TEAM COMPOUNDS
        </div>
      </div>
    </section>
  );
}
