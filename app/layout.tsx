import type { Metadata } from 'next';
import { prata, ebGaramond, switzer, fragmentMono } from '@/lib/fonts';
import { GrainOverlay } from '@/components/layout/GrainOverlay';
import { CustomCursor } from '@/components/layout/CustomCursor';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://luminfaber.com'),
  title: 'Luminfaber — A design agency for companies that care how things look',
  description:
    'We build editorial-grade websites and AI automations. Jaipur-based, global. Two-week projects, ongoing partnerships.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Luminfaber',
    description: 'A design agency for companies that care how things look.',
    url: 'https://luminfaber.com',
    siteName: 'Luminfaber',
    locale: 'en_US',
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${prata.variable} ${ebGaramond.variable} ${switzer.variable} ${fragmentMono.variable}`}
    >
      <body>
        {children}
        <GrainOverlay />
        <CustomCursor />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Luminfaber',
              url: 'https://luminfaber.com',
              description: 'A design agency for companies that care how things look.',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Jaipur',
                addressCountry: 'IN',
              },
            }),
          }}
        />
      </body>
    </html>
  );
}
