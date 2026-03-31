import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Frequently asked questions about AppogealTechLabs — our development process, project timelines, pricing, technologies, and how to get started.',
  keywords: ['AppogealTechLabs FAQ', 'web development questions', 'software agency FAQ', 'how to hire developers'],
  alternates: { canonical: 'https://appogealtechlabs.com/faq' },
  openGraph: {
    title: 'Frequently Asked Questions | AppogealTechLabs',
    description: 'Everything you need to know about working with AppogealTechLabs.',
    url: 'https://appogealtechlabs.com/faq',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'AppogealTechLabs FAQ' }],
  },
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return children;
}
