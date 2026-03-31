import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Projects',
  description: 'Browse AppogealTechLabs\' portfolio of 50+ completed projects — from enterprise web applications to mobile apps and scalable API solutions built across East Africa.',
  keywords: ['software portfolio', 'web development projects', 'AppogealTechLabs portfolio', 'Next.js projects', 'mobile app portfolio'],
  alternates: { canonical: 'https://appogealtechlabs.com/projects' },
  openGraph: {
    title: 'Our Projects | AppogealTechLabs',
    description: 'A portfolio of 50+ delivered web and mobile projects — explore our best work.',
    url: 'https://appogealtechlabs.com/projects',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'AppogealTechLabs Projects' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Projects | AppogealTechLabs',
    description: 'Explore 50+ delivered projects from AppogealTechLabs.',
    images: ['/og-image.jpg'],
  },
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
