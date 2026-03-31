import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Case Studies',
  description: 'In-depth case studies from AppogealTechLabs showcasing how we solved complex technical challenges and delivered measurable results for our clients.',
  keywords: ['software case studies', 'web development case studies', 'tech success stories', 'AppogealTechLabs results'],
  alternates: { canonical: 'https://appogealtechlabs.com/case-studies' },
  openGraph: {
    title: 'Case Studies | AppogealTechLabs',
    description: 'How we solved real problems for real clients — in-depth case studies.',
    url: 'https://appogealtechlabs.com/case-studies',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'AppogealTechLabs Case Studies' }],
  },
};

export default function CaseStudiesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
