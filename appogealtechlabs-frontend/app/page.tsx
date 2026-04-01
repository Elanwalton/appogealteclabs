import Hero from '@/components/Hero';
import FeaturedProjects from '@/components/FeaturedProjects';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

// Lazy load below-the-fold components to reduce initial JS payload
const ServicesOverview = dynamic(() => import('@/components/ServicesOverview'), { ssr: true });
const TestimonialsCarousel = dynamic(() => import('@/components/TestimonialsCarousel'), { ssr: true });
import Script from 'next/script';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AppogealTechLabs | Modern Software & Agency Solutions',
  description: 'Top-tier digital agency delivering advanced Next.js, Django, and mobile app solutions. Partner with AppogealTechLabs to scale your business online.',
  openGraph: {
    title: 'AppogealTechLabs | Modern Software & Agency Solutions',
    description: 'Top-tier digital agency delivering advanced Next.js, Django, and mobile app solutions. Partner with AppogealTechLabs to scale your business online.',
    url: 'https://appogealtechlabs.com',
  }
};


export default function Home() {
  return (
    <>
      <Script
        id="website-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'AppogealTechLabs',
            url: 'https://appogealtechlabs.com',
            potentialAction: {
              '@type': 'SearchAction',
              target: 'https://appogealtechlabs.com/search?q={search_term_string}',
              'query-input': 'required name=search_term_string'
            }
          })
        }}
      />
      <Hero />
      <FeaturedProjects />
      <ServicesOverview />
      <TestimonialsCarousel />
      
      {/* Final CTA Section */}
      <section className="py-32 bg-bg-primary relative overflow-hidden">
        {/* Background Gradients */}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-accent/5 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <span className="text-accent font-mono mb-4 block">What's Next?</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-text-primary">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-text-secondary mb-10 max-w-2xl mx-auto leading-relaxed">
            Let's discuss how we can help you achieve your goals with modern technology.
            We are currently accepting new projects.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/contact"
              className="px-8 py-4 bg-accent/10 border border-accent text-accent rounded hover:bg-accent/20 transition-all font-mono font-medium flex items-center justify-center group"
            >
              Get in Touch
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/services"
              className="px-8 py-4 bg-bg-secondary text-text-primary rounded hover:bg-bg-tertiary transition-all font-medium border border-transparent hover:border-text-muted"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
