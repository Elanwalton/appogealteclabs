import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with AppogealTechLabs. Whether you have a project idea, a question, or want to start a partnership — our team is ready to help.',
  keywords: ['contact AppogealTechLabs', 'hire developers Kenya', 'software agency contact', 'web development quotes'],
  alternates: { canonical: 'https://appogealtechlabs.com/contact' },
  openGraph: {
    title: 'Contact Us | AppogealTechLabs',
    description: 'Reach out to start your next project with AppogealTechLabs.',
    url: 'https://appogealtechlabs.com/contact',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Contact AppogealTechLabs' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us | AppogealTechLabs',
    description: 'Start your next digital project with AppogealTechLabs.',
    images: ['/og-image.jpg'],
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
