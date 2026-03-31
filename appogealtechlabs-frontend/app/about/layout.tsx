import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Meet the team behind AppogealTechLabs — a passionate group of developers, designers, and strategists building digital solutions that drive business growth across East Africa.',
  keywords: ['AppogealTechLabs team', 'East Africa tech agency', 'Nairobi software developers', 'about AppogealTechLabs'],
  alternates: { canonical: 'https://appogealtechlabs.com/about' },
  openGraph: {
    title: 'About Us | AppogealTechLabs',
    description: 'Meet the passionate team behind AppogealTechLabs, dedicated to building exceptional digital solutions.',
    url: 'https://appogealtechlabs.com/about',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'AppogealTechLabs Team' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us | AppogealTechLabs',
    description: 'Meet the team building digital excellence across East Africa.',
    images: ['/og-image.jpg'],
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
