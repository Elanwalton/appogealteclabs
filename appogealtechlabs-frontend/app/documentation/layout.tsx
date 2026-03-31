import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Documentation',
  description: 'Official technical documentation for AppogealTechLabs tools, APIs, and integrations. Everything you need to build with our platform.',
  keywords: ['AppogealTechLabs docs', 'API documentation', 'developer documentation', 'technical guides'],
  alternates: { canonical: 'https://appogealtechlabs.com/documentation' },
  openGraph: {
    title: 'Documentation | AppogealTechLabs',
    description: 'Technical documentation for AppogealTechLabs APIs and tools.',
    url: 'https://appogealtechlabs.com/documentation',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'AppogealTechLabs Documentation' }],
  },
};

export default function DocumentationLayout({ children }: { children: React.ReactNode }) {
  return children;
}
