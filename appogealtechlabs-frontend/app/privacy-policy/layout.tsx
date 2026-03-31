import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Read the AppogealTechLabs Privacy Policy to understand how we collect, use, and protect your personal information.',
  alternates: { canonical: 'https://appogealtechlabs.com/privacy-policy' },
  robots: { index: false, follow: false },
};

export default function PrivacyPolicyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
