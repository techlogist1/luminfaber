import { Hero } from '@/components/sections/Hero';
import { Premise } from '@/components/sections/Premise';
import { ServiceWeb } from '@/components/sections/ServiceWeb';
import { ServiceAutomation } from '@/components/sections/ServiceAutomation';
import { WhoWeAre } from '@/components/sections/WhoWeAre';
import { CTA } from '@/components/sections/CTA';
import { Footer } from '@/components/sections/Footer';

export default function Home() {
  return (
    <main className="relative bg-[var(--bg)] text-fg">
      <Hero />
      <Premise />
      <ServiceWeb />
      <ServiceAutomation />
      <WhoWeAre />
      <CTA />
      <Footer />
    </main>
  );
}
