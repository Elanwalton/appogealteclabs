import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Services',
  description: 'Explore AppogealTechLabs\' full range of services — from custom web development and mobile apps to UI/UX design and API integrations. Transparent pricing for every budget.',
  keywords: ['web development services', 'mobile app development', 'UI/UX design', 'software development Kenya', 'Next.js development', 'custom software'],
  alternates: { canonical: 'https://appogealtechlabs.com/services' },
  openGraph: {
    title: 'Our Services | AppogealTechLabs',
    description: 'Custom web apps, mobile apps, UI/UX design and more. Transparent pricing for every business.',
    url: 'https://appogealtechlabs.com/services',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'AppogealTechLabs Services' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Services | AppogealTechLabs',
    description: 'Transparent pricing for world-class web development and design services.',
    images: ['/og-image.jpg'],
  },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
