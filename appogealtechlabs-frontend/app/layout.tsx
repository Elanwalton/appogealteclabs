import type { Metadata } from "next";
import { Inter, Poppins, Fira_Code } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
  title: "Appogealtechlabs - Modern Digital Solutions",
  description: "Cutting-edge web development agency specializing in Next.js and Django applications.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${poppins.variable} ${firaCode.variable} font-sans bg-bg-primary text-text-primary antialiased selection:bg-accent selection:text-bg-primary`}>
        <Navbar />
        <main className="min-h-screen relative overflow-hidden font-body text-text-secondary">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
