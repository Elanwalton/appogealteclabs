'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import api, { endpoints } from '@/lib/api';

export default function TestimonialsCarousel() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [loading, setLoading] = useState(true);

  // Fetch from Firebase backend
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await api.get(endpoints.testimonials);
        setTestimonials(response.data);
      } catch (error) {
        console.error('Failed to load testimonials:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  // Auto-advance carousel
  useEffect(() => {
    if (!isAutoPlaying || testimonials.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handlePrevious = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
    setIsAutoPlaying(false);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  if (loading) {
    return (
      <section className="py-24 relative overflow-hidden bg-bg-primary">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 flex justify-center items-center opacity-50"><div className="w-10 h-10 border-2 border-accent border-t-transparent rounded-full animate-spin"></div></div>
      </section>
    );
  }

  if (testimonials.length === 0) return null;

  return (
    <section className="py-24 relative overflow-hidden bg-bg-primary">
      {/* Background Ornaments */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-accent font-mono text-sm tracking-widest uppercase mb-3 block">Testimonials</span>
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">What Our Clients Say</h2>
          <p className="text-lg text-text-secondary leading-relaxed">
            Don't just take our word for it. Here's what our satisfied clients 
            have to say about working with us.
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-5xl mx-auto">
          
          <div className="absolute top-10 left-10 opacity-10">
            <Quote size={120} className="text-accent" />
          </div>

          <div className="overflow-hidden rounded-3xl bg-[rgba(17,34,64,0.6)] backdrop-blur-xl border border-gray-800 shadow-2xl relative">
            <div 
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={testimonial.id} className="w-full shrink-0 p-8 md:p-16">
                  
                  <div className="flex flex-col md:flex-row gap-10 items-center md:items-start">
                    
                    {/* Image / Avatar */}
                    <div className="shrink-0 relative">
                      <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-gray-800 flex items-center justify-center bg-gray-900 shadow-[0_0_20px_rgba(100,255,218,0.2)]">
                        {testimonial.avatar ? (
                          <img src={testimonial.avatar} alt={testimonial.client_name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center text-3xl font-bold text-text-muted">
                            {testimonial.client_name?.charAt(0) || 'U'}
                          </div>
                        )}
                      </div>
                      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex bg-gray-900 rounded-full px-3 py-1 border border-gray-800 shadow-lg">
                        {[...Array(testimonial.rating || 5)].map((_, i) => (
                          <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />
                        ))}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 text-center md:text-left">
                      <Quote size={40} className="text-accent/40 mb-6 mx-auto md:mx-0" />
                      <blockquote className="text-xl md:text-2xl text-text-primary leading-relaxed font-medium mb-8">
                        "{testimonial.content}"
                      </blockquote>
                      
                      <div className="border-t border-gray-800 pt-6 mt-6 flex flex-col md:flex-row justify-between items-center gap-4">
                        <div>
                          <h4 className="text-lg font-bold text-accent">{testimonial.client_name}</h4>
                          <p className="text-sm text-text-secondary uppercase tracking-wider font-mono mt-1">
                            {testimonial.client_title}{testimonial.client_company ? `, ${testimonial.client_company}` : ''}
                          </p>
                        </div>
                        {testimonial.project && (
                          <div className="hidden md:block px-4 py-2 bg-accent/10 border border-accent/20 rounded-full text-accent text-xs font-mono">
                            {testimonial.project}
                          </div>
                        )}
                      </div>
                    </div>

                  </div>
                </div>
              ))}
            </div>
            
            {/* Navigation Overlays */}
            <button 
              onClick={handlePrevious}
              aria-label="Previous testimonial"
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-gray-900/80 hover:bg-accent border border-gray-700 hover:border-accent text-text-secondary hover:text-bg-primary rounded-full flex items-center justify-center backdrop-blur transition-all z-10 group"
            >
              <ChevronLeft className="group-hover:-translate-x-0.5 transition-transform" />
            </button>
            <button 
              onClick={handleNext}
              aria-label="Next testimonial"
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-gray-900/80 hover:bg-accent border border-gray-700 hover:border-accent text-text-secondary hover:text-bg-primary rounded-full flex items-center justify-center backdrop-blur transition-all z-10 group"
            >
              <ChevronRight className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Carousel Indicators */}
          <div className="flex justify-center items-center gap-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className="p-2 -m-2 group"
                aria-label={`Go to testimonial ${index + 1}`}
              >
                <div className={`transition-all duration-300 rounded-full ${
                  index === currentIndex 
                  ? 'w-10 h-2.5 bg-accent' 
                  : 'w-2.5 h-2.5 bg-gray-700 group-hover:bg-gray-500'
                }`} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
