import Image from 'next/image';
import { KenBurns } from '@/components/motion/KenBurns';
import { Wordmark } from '@/components/layout/Wordmark';
import { Nav } from '@/components/layout/Nav';
import { Morph } from '@/components/pretext/Morph';

const CREAM = '#F5EFE0';

export function Hero() {
  return (
    <section className="relative h-[95svh] w-full overflow-hidden">
      {/* Ken Burns background — hero is full-bleed, so start pre-zoomed to avoid edge seams */}
      <KenBurns durationSec={14} startScale={1.08} scaleTo={1.12}>
        <Image
          src="/images/hero/hero-FINAL.png"
          alt=""
          fill
          priority
          quality={90}
          sizes="100vw"
          style={{ objectFit: 'cover' }}
        />
      </KenBurns>

      {/* Top-left wordmark */}
      <div className="absolute top-7 left-9 z-20">
        <Wordmark color={CREAM} />
      </div>

      {/* Top-right nav */}
      <div className="absolute top-7 right-9 z-20">
        <Nav color={CREAM} />
      </div>

      {/* Centered morph — responsive via CSS; Morph reads computed font-size. */}
      <div className="absolute inset-0 z-10 flex items-center justify-center px-5">
        <div
          className="font-serif leading-none text-[clamp(44px,11vw,104px)]"
          style={{ letterSpacing: '-0.02em', color: CREAM }}
        >
          <Morph
            phrases={['You dream.', 'We build.']}
            fontFamily="var(--font-prata), serif"
            color={CREAM}
            dwellMs={2500}
            morphMs={800}
          />
        </div>
      </div>
    </section>
  );
}
