import { Container } from '@/components/ui/Container';
import { SectionReveal } from '@/components/motion/SectionReveal';
import { cn } from '@/lib/utils';
import { type CSSProperties } from 'react';

// --- Collage placeholder data --------------------------------------------------
// Each rectangle: size, rotation, plus a desktop absolute position on the
// collage stage. Mobile renders a simplified stacked version (no rotation,
// uniform max-width).
type Placeholder = {
  id: string;
  w: number;
  h: number;
  top: string;
  left: string;
  rotate: number;
  washi?: 'left' | 'right' | 'both';
};

const placeholders: Placeholder[] = [
  { id: 'p1', w: 280, h: 200, top: '2%',  left: '4%',  rotate: -4, washi: 'left' },
  { id: 'p2', w: 180, h: 240, top: '0%',  left: '34%', rotate: 3 },
  { id: 'p3', w: 420, h: 280, top: '6%',  left: '56%', rotate: -2, washi: 'right' },
  { id: 'p4', w: 220, h: 300, top: '36%', left: '2%',  rotate: 5 },
  { id: 'p5', w: 260, h: 180, top: '54%', left: '34%', rotate: -6, washi: 'both' },
  { id: 'p6', w: 200, h: 260, top: '42%', left: '76%', rotate: 2 },
  { id: 'p7', w: 340, h: 240, top: '78%', left: '10%', rotate: 4, washi: 'left' },
  { id: 'p8', w: 180, h: 200, top: '82%', left: '66%', rotate: -3 },
];

type NameCard = {
  id: string;
  name: string;
  role: string;
  tagline: string;
  top: string;
  left: string;
  rotate: number;
  dim?: boolean;
};

const nameCards: NameCard[] = [
  {
    id: 'lokavya',
    name: 'Lokavya',
    role: 'BUILDER · TECHNICAL',
    tagline:
      'Writes the code. Designs the systems. The one making things exist.',
    top: '22%',
    left: '24%',
    rotate: -2,
  },
  {
    id: 'raghav',
    name: 'Raghav',
    role: 'STRATEGY · SALES',
    tagline:
      'Runs the conversations. Shapes the strategy. Makes sure we build the right things.',
    top: '46%',
    left: '52%',
    rotate: 1,
  },
  {
    id: 'bhomik',
    name: 'Bhomik',
    role: 'OPERATIONS',
    tagline:
      'Keeps the wheels turning. Handles the details everyone forgets.',
    top: '70%',
    left: '34%',
    rotate: -1,
    dim: true,
  },
];

// Washi tape corner — a small translucent cream rectangle rotated 45-ish.
function WashiTape({ side }: { side: 'tl' | 'tr' }) {
  const base: CSSProperties = {
    position: 'absolute',
    top: '-6px',
    width: '48px',
    height: '14px',
    background: 'rgba(237, 227, 204, 0.7)',
    pointerEvents: 'none',
  };
  const positioned: CSSProperties =
    side === 'tl'
      ? { ...base, left: '-10px', transform: 'rotate(-38deg)' }
      : { ...base, right: '-10px', transform: 'rotate(38deg)' };
  return <span aria-hidden="true" style={positioned} />;
}

// A dashed-border placeholder "digicam" rectangle. Two render modes:
// - mobile (default): static block in flow, no rotation, uniform width.
// - desktop (md+): absolute-positioned with rotation + true pixel size.
function PlaceholderRect({ p, mode }: { p: Placeholder; mode: 'mobile' | 'desktop' }) {
  if (mode === 'mobile') {
    return (
      <div
        className="relative mx-auto flex w-full max-w-[320px] items-center justify-center border border-dashed border-[var(--fg-subtle)] bg-[var(--bg)]"
        style={{ aspectRatio: `${p.w} / ${p.h}` }}
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--fg-muted)]">
          DIGICAM PHOTO — PLACEHOLDER
        </span>
      </div>
    );
  }

  const style: CSSProperties = {
    position: 'absolute',
    top: p.top,
    left: p.left,
    width: `${p.w}px`,
    height: `${p.h}px`,
    transform: `rotate(${p.rotate}deg)`,
  };

  return (
    <div
      className="flex items-center justify-center border border-dashed border-[var(--fg-subtle)] bg-[var(--bg)]"
      style={style}
    >
      {(p.washi === 'left' || p.washi === 'both') && <WashiTape side="tl" />}
      {(p.washi === 'right' || p.washi === 'both') && <WashiTape side="tr" />}
      <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--fg-muted)]">
        DIGICAM PHOTO — PLACEHOLDER
      </span>
    </div>
  );
}

// A name card. Same two modes.
function NameCardBlock({
  card,
  mode,
  revealDelay,
}: {
  card: NameCard;
  mode: 'mobile' | 'desktop';
  revealDelay: number;
}) {
  const content = (
    <div className={cn('flex flex-col gap-2', card.dim && 'opacity-70')}>
      <h3 className="font-serif text-[38px] leading-[1.05] text-[var(--fg)]">
        {card.name}
      </h3>
      <p className="font-mono text-[12px] uppercase tracking-[0.12em] text-[var(--fg-muted)]">
        {card.role}
      </p>
      <p className="font-sans text-[16px] leading-[1.6] text-[var(--fg-muted)] max-w-[280px]">
        {card.tagline}
      </p>
    </div>
  );

  if (mode === 'mobile') {
    return (
      <div className="mx-auto w-full max-w-[320px]">
        <SectionReveal delay={revealDelay} amount={0.15}>
          {content}
        </SectionReveal>
      </div>
    );
  }

  const style: CSSProperties = {
    position: 'absolute',
    top: card.top,
    left: card.left,
    width: '320px',
    transform: `rotate(${card.rotate}deg)`,
  };

  return (
    <div style={style}>
      <SectionReveal delay={revealDelay} amount={0.15}>
        {content}
      </SectionReveal>
    </div>
  );
}

export function WhoWeAre() {
  return (
    <section
      id="who-we-are"
      aria-labelledby="who-we-are-heading"
      className="relative min-h-[120vh] py-[80px] md:py-[180px]"
    >
      <Container className="relative">
        {/* Top block */}
        <div className="flex flex-col gap-6 md:max-w-[640px]">
          <SectionReveal delay={0}>
            <p className="font-mono text-caption uppercase text-[var(--fg-muted)]">
              THE PEOPLE
            </p>
          </SectionReveal>

          <SectionReveal delay={0.1}>
            <h2
              id="who-we-are-heading"
              className="font-serif text-display-l text-[var(--fg)]"
            >
              Three people, based in Jaipur.
            </h2>
          </SectionReveal>

          <SectionReveal delay={0.2}>
            <p className="font-sans text-body-l max-w-[500px] text-[var(--fg-muted)]">
              A small studio. A long attention span. One conversation from
              idea to ship.
            </p>
          </SectionReveal>
        </div>

        {/* --- Mobile collage: stacked, interleaved, no rotation --- */}
        <div className="mt-16 flex flex-col gap-10 md:hidden">
          <PlaceholderRect p={placeholders[0]!} mode="mobile" />
          <PlaceholderRect p={placeholders[1]!} mode="mobile" />
          <NameCardBlock card={nameCards[0]!} mode="mobile" revealDelay={0} />
          <PlaceholderRect p={placeholders[2]!} mode="mobile" />
          <PlaceholderRect p={placeholders[3]!} mode="mobile" />
          <NameCardBlock card={nameCards[1]!} mode="mobile" revealDelay={0.1} />
          <PlaceholderRect p={placeholders[4]!} mode="mobile" />
          <PlaceholderRect p={placeholders[5]!} mode="mobile" />
          <NameCardBlock card={nameCards[2]!} mode="mobile" revealDelay={0.2} />
          <PlaceholderRect p={placeholders[6]!} mode="mobile" />
          <PlaceholderRect p={placeholders[7]!} mode="mobile" />
        </div>

        {/* --- Desktop collage: absolute stage with rotations + overlap --- */}
        <div className="relative mt-24 hidden min-h-[1100px] md:block">
          {placeholders.map((p) => (
            <PlaceholderRect key={p.id} p={p} mode="desktop" />
          ))}
          {nameCards.map((card, i) => (
            <NameCardBlock
              key={card.id}
              card={card}
              mode="desktop"
              revealDelay={i * 0.1}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
