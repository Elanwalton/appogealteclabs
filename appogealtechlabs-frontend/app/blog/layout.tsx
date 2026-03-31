import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Read the latest articles on web development, UI/UX design, tech trends, and software engineering insights from the AppogealTechLabs team.',
  keywords: ['tech blog', 'web development blog', 'UI/UX articles', 'software engineering', 'Next.js tutorials', 'AppogealTechLabs blog'],
  alternates: { canonical: 'https://appogealtechlabs.com/blog' },
  openGraph: {
    title: 'Blog | AppogealTechLabs',
    description: 'Expert articles on web development, design trends, and modern software engineering.',
    url: 'https://appogealtechlabs.com/blog',
    type: 'website',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'AppogealTechLabs Blog' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | AppogealTechLabs',
    description: 'Expert articles on web development, design, and modern software engineering.',
    images: ['/og-image.jpg'],
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
