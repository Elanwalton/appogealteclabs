import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tutorials',
  description: 'Free developer tutorials on Next.js, React, Django, Node.js, and modern web development — written by the AppogealTechLabs engineering team.',
  keywords: ['web development tutorials', 'Next.js tutorial', 'React tutorial', 'free coding guides', 'AppogealTechLabs tutorials'],
  alternates: { canonical: 'https://appogealtechlabs.com/tutorials' },
  openGraph: {
    title: 'Developer Tutorials | AppogealTechLabs',
    description: 'Free, practical tutorials on modern web development from our engineering team.',
    url: 'https://appogealtechlabs.com/tutorials',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'AppogealTechLabs Tutorials' }],
  },
};

export default function TutorialsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
