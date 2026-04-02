import type { Metadata } from "next";
import { Inter, Poppins, Fira_Code } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/context/ThemeContext";
import { AuthProvider } from "@/context/AuthContext";

// 2.1 Font Families
const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-sans',
  display: 'swap',
});

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const firaCode = Fira_Code({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://appogealtechlabs.com'),
  title: {
    default: 'AppogealTechLabs - Modern Digital Solutions',
    template: '%s | AppogealTechLabs',
  },
  icons: {
    icon: '/MySocialsLogo.png',
    apple: '/MySocialsLogo.png',
  },
  description: 'Cutting-edge web development agency specializing in Next.js, Django, and modern digital solutions. We build scalable, high-performance applications.',
  keywords: ['Web Development', 'Next.js', 'Django', 'React', 'Mobile Apps', 'Software Agency', 'Nairobi'],
  authors: [{ name: 'AppogealTechLabs' }],
  creator: 'AppogealTechLabs',
  publisher: 'AppogealTechLabs',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://appogealtechlabs.com',
    title: 'AppogealTechLabs - Modern Digital Solutions',
    description: 'Cutting-edge web development agency specializing in Next.js and Django applications.',
    siteName: 'AppogealTechLabs',
    images: [
      {
        url: '/og-image.jpg', // Ensure this file exists in public/
        width: 1200,
        height: 630,
        alt: 'AppogealTechLabs',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AppogealTechLabs - Modern Digital Solutions',
    description: 'Cutting-edge web development agency specializing in Next.js and Django applications.',
    images: ['/og-image.jpg'],
    creator: '@Appogealtec58107',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};




import Script from 'next/script';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'AppogealTechLabs',
    url: 'https://appogealtechlabs.com',
    logo: 'https://appogealtechlabs.com/og-image.jpg',
    description: 'Cutting-edge web development agency specializing in Next.js, Node.js, and modern digital solutions.',
    sameAs: [
      'https://twitter.com/Appogealtec58107',
      'https://instagram.com/appogealtechlabs',
      'https://facebook.com/appogealtechlabs'
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+254740886459',
      contactType: 'customer service',
      email: 'hello@appogealtechlabs.com'
    }
  };

  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.variable} ${poppins.variable} ${firaCode.variable} font-sans bg-bg-primary text-text-primary antialiased selection:bg-accent selection:text-bg-primary`} suppressHydrationWarning>
        <Script
          id="org-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider>
          <AuthProvider>
            <Navbar />
            <main className="min-h-screen relative overflow-hidden font-body text-text-secondary">
              {children}
            </main>
            <Footer />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
