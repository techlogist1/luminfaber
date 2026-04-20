'use client';

import { useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { KenBurns } from '@/components/motion/KenBurns';
import { Button } from '@/components/ui/Button';
import { Explode } from '@/components/pretext/Explode';
import { ContactForm } from '@/components/ui/ContactForm';

export function CTA() {
  const [formOpen, setFormOpen] = useState(false);
  const reduce = useReducedMotion();

  return (
    <section
      id="cta"
      className="relative min-h-[100svh] w-full overflow-hidden"
      aria-label="Contact"
    >
      {/* Background image + Ken Burns */}
      <KenBurns>
        <Image
          src="/images/cta/contact-FINAL.png"
          alt=""
          fill
          sizes="100vw"
          priority={false}
          style={{ objectFit: 'cover' }}
        />
      </KenBurns>

      {/* Subtle cream dim for text legibility */}
      <div className="absolute inset-0 bg-[var(--bg)]/15 pointer-events-none" aria-hidden />

      {/* Content layer */}
      <div className="relative z-10 min-h-[100svh] flex items-center justify-center px-5 md:px-10 py-24">
        <div className="w-full max-w-[800px] flex flex-col items-start gap-6 text-[#F5EFE0]">
          {/* Eyebrow */}
          <span className="font-mono text-caption uppercase tracking-[0.12em] text-[#F5EFE0]/80">
            START SOMETHING
          </span>

          {/* Headline */}
          <h2 className="font-serif text-[58px] leading-[0.98] tracking-[-0.02em] md:text-display-xl text-[#F5EFE0] m-0">
            Let&apos;s build something beautiful.
          </h2>

          {/* Body */}
          <p className="font-sans text-body-l max-w-[500px] text-[#F5EFE0]/95">
            We take on two new projects a month. If your company cares how it
            looks — and how it works — we&apos;d love to talk.
          </p>

          {/* CTA pill */}
          <div className="pt-2">
            <Button
              variant="pill"
              aria-expanded={formOpen}
              aria-controls="cta-contact-form"
              onClick={() => setFormOpen((v) => !v)}
            >
              <Explode>Start the conversation →</Explode>
            </Button>
          </div>

          {/* Reply caption */}
          <span className="font-mono text-caption uppercase tracking-[0.12em] text-[#F5EFE0]/70">
            USUALLY RESPOND WITHIN 24 HOURS
          </span>

          {/* Form reveal */}
          <AnimatePresence initial={false}>
            {formOpen ? (
              <motion.div
                key="cta-form"
                id="cta-contact-form"
                initial={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
                animate={reduce ? { opacity: 1 } : { opacity: 1, height: 'auto' }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
                transition={{ duration: reduce ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="w-full overflow-hidden"
              >
                <div className="mt-4 w-full max-w-[560px] bg-[var(--bg)] text-[var(--fg)] p-8 md:p-10 rounded-none">
                  <ContactForm />
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
