import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Read the AppogealTechLabs Terms of Service — the rules and guidelines governing use of our website and services.',
  alternates: { canonical: 'https://appogealtechlabs.com/terms' },
  robots: { index: false, follow: false },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
