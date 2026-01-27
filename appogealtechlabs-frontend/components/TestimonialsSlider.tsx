'use client';

import { useEffect, useState } from 'react';
import api, { endpoints } from '@/lib/api';
import type { Testimonial } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, User, Quote } from 'lucide-react';

export default function TestimonialsSlider() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await api.get(endpoints.testimonials);
        setTestimonials(response.data.slice(0, 5));
      } catch (error) {
        console.error('Failed to fetch testimonials:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  useEffect(() => {
    if (testimonials.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  if (loading || testimonials.length === 0) return null;

  const current = testimonials[currentIndex];

  return (
    <section className="py-32 max-w-5xl mx-auto px-6">
      <div className="text-center mb-16">
         <span className="text-accent font-mono text-sm tracking-wider uppercase">04. Testimonials</span>
         <h2 className="text-h2 font-bold text-text-primary mt-3">What They Say</h2>
      </div>

      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            className="glass-medium p-8 md:p-14 relative"
          >
             {/* Quote Icon Background */}
             <div className="absolute top-8 left-8 text-accent/10">
               <Quote size={80} fill="currentColor" />
             </div>
            
            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
               {/* Client Photo */}
               <div className="flex-shrink-0">
                  {current.client_photo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={current.client_photo} alt={current.client_name} className="w-24 h-24 rounded-full object-cover border-2 border-accent shadow-[0_0_20px_rgba(100,255,218,0.3)]" />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-bg-tertiary flex items-center justify-center border-2 border-accent/50 text-accent shadow-[0_0_20px_rgba(100,255,218,0.1)]">
                      <User size={40} />
                    </div>
                  )}
               </div>

               <div className="text-center md:text-left flex-grow">
                  <div className="flex justify-center md:justify-start gap-1 mb-6 text-accent">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={18} fill={i < current.rating ? "currentColor" : "none"} className={i < current.rating ? "text-accent" : "text-bg-tertiary"} />
                    ))}
                  </div>
                  
                  <blockquote className="text-xl md:text-2xl text-text-primary mb-6 italic leading-relaxed font-body">
                    "{current.testimonial_text}"
                  </blockquote>

                  <div>
                    <div className="font-bold text-text-primary text-lg">{current.client_name}</div>
                    <div className="text-sm text-text-secondary font-mono mt-1">
                      {current.client_position}
                      {current.company_name && <span className="text-accent"> @ {current.company_name}</span>}
                    </div>
                  </div>
               </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Dots */}
        <div className="flex justify-center mt-10 gap-3">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'w-8 bg-accent shadow-[0_0_10px_rgba(100,255,218,0.5)]' : 'w-2 bg-text-secondary/30 hover:bg-text-secondary'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
