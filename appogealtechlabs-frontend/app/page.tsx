import Hero from '@/components/Hero';
import FeaturedProjects from '@/components/FeaturedProjects';
import ServicesOverview from '@/components/ServicesOverview';
import TestimonialsSlider from '@/components/TestimonialsSlider';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProjects />
      <ServicesOverview />
      <TestimonialsSlider />
      
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
