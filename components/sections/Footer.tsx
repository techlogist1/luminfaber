import Image from 'next/image';
import Link from 'next/link';
import { Mail, Twitter, Instagram } from 'lucide-react';
import { Container } from '@/components/ui/Container';

const indexLinks = [
  { label: 'Work', href: '/work' },
  { label: 'Command Center', href: '/command-center' },
  { label: 'Book a call', href: '/book' },
  { label: 'Email', href: 'mailto:hello@luminfaber.com' },
];

export function Footer() {
  return (
    <footer className="relative w-full min-h-[400px] overflow-hidden isolate bg-[var(--bg)]">
      {/* Background texture — z-0 so it sits inside footer's stacking context */}
      <div className="absolute inset-0 z-0" aria-hidden>
        <Image
          src="/images/footer/footer-texture-FINAL.png"
          alt=""
          fill
          sizes="100vw"
          style={{ objectFit: 'cover' }}
        />
      </div>

      {/* 80% cream overlay — z-10, lets ~20% of texture show through */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{ background: 'rgba(245,239,224,0.8)' }}
        aria-hidden
      />

      {/* Content — z-20, always on top */}
      <div className="relative z-20">
        <Container className="py-20 px-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Col 1 — Wordmark */}
            <div className="flex flex-col">
              <span className="font-serif text-[58px] leading-none tracking-[-0.01em] text-[var(--fg)]">
                Luminfaber
              </span>
              <p className="font-sans text-body text-[var(--fg-muted)] mt-4 max-w-[320px]">
                A design agency. Jaipur, India.
              </p>
            </div>

            {/* Col 2 — Index */}
            <div className="flex flex-col gap-4">
              <h3 className="font-mono text-caption uppercase tracking-[0.12em] text-[var(--fg-muted)] m-0">
                INDEX
              </h3>
              <ul className="flex flex-col gap-2 m-0 p-0 list-none">
                {indexLinks.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="lf-link-underline font-sans text-[16px] font-medium text-[var(--fg)]"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3 — Elsewhere */}
            <div className="flex flex-col gap-4">
              <h3 className="font-mono text-caption uppercase tracking-[0.12em] text-[var(--fg-muted)] m-0">
                ELSEWHERE
              </h3>
              <ul className="flex flex-col gap-2 m-0 p-0 list-none">
                <li>
                  <a
                    href="mailto:hello@luminfaber.com"
                    className="lf-link-underline font-sans text-[16px] font-medium text-[var(--fg)] inline-flex items-center gap-2"
                  >
                    <Mail size={16} aria-hidden />
                    <span>hello@luminfaber.com</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://twitter.com/luminfaber"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="lf-link-underline font-sans text-[16px] font-medium text-[var(--fg)] inline-flex items-center gap-2"
                  >
                    <Twitter size={16} aria-hidden />
                    <span>Twitter</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://instagram.com/luminfaber"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="lf-link-underline font-sans text-[16px] font-medium text-[var(--fg)] inline-flex items-center gap-2"
                  >
                    <Instagram size={16} aria-hidden />
                    <span>Instagram</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </Container>

        {/* Bottom strip */}
        <div className="border-t border-[var(--fg-subtle)]/60">
          <Container className="py-4 px-10 flex justify-between items-center">
            <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--fg-muted)]">
              © 2026 Luminfaber
            </span>
            <span className="font-mono italic text-[10px] text-[var(--fg-muted)]">
              Made with care in Jaipur
            </span>
          </Container>
        </div>
      </div>
    </footer>
  );
}
