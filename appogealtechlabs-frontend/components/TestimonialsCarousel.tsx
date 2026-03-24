'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "David Kimani",
    position: "CEO",
    company: "TechFlow Solutions",
    image: "/testimonials/david-kimani.jpg",
    rating: 5,
    text: "Appogealtechlabs transformed our outdated system into a modern, efficient platform. Their attention to detail and technical expertise exceeded our expectations. The team delivered on time and within budget.",
    project: "Custom ERP System",
    logo: "/companies/techflow-logo.svg"
  },
  {
    id: 2,
    name: "Sarah Wanjiku",
    position: "Founder & Director",
    company: "Bloom Fashion Kenya",
    image: "/testimonials/sarah-wanjiku.jpg",
    rating: 5,
    text: "Working with Appogealtechlabs was a game-changer for our e-commerce business. They built a beautiful, fast, and user-friendly platform that increased our sales by 250% in just three months. Highly recommended!",
    project: "E-commerce Platform",
    logo: "/companies/bloom-logo.svg"
  },
  {
    id: 3,
    name: "Michael Odhiambo",
    position: "CTO",
    company: "FinEdge Analytics",
    image: "/testimonials/michael-odhiambo.jpg",
    rating: 5,
    text: "The level of professionalism and technical knowledge was outstanding. They not only built what we asked for but suggested improvements that made our product even better. True partners in innovation.",
    project: "Financial Dashboard",
    logo: "/companies/finedge-logo.svg"
  },
  {
    id: 4,
    name: "Grace Mutua",
    position: "Marketing Director",
    company: "Urban Living Properties",
    image: "/testimonials/grace-mutua.jpg",
    rating: 5,
    text: "Our new website is absolutely stunning! The design is modern, the functionality is seamless, and our clients love it. The team was responsive, creative, and delivered beyond expectations.",
    project: "Real Estate Website",
    logo: "/companies/urban-logo.svg"
  },
  {
    id: 5,
    name: "James Mwangi",
    position: "Operations Manager",
    company: "Cargo Express East Africa",
    image: "/testimonials/james-mwangi.jpg",
    rating: 5,
    text: "The logistics platform they developed has streamlined our entire operation. Real-time tracking, automated reporting, and an intuitive interface - everything we needed and more. Exceptional work!",
    project: "Logistics Management System",
    logo: "/companies/cargo-logo.svg"
  },
  {
    id: 6,
    name: "Linda Achieng",
    position: "Head of Digital",
    company: "EduBright Academy",
    image: "/testimonials/linda-achieng.jpg",
    rating: 5,
    text: "Our e-learning platform is now one of the best in the region. The team understood our vision perfectly and created a solution that our students and teachers absolutely love. Worth every shilling!",
    project: "E-Learning Platform",
    logo: "/companies/edubright-logo.svg"
  }
];

export default function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-advance carousel
  useEffect(() => {
    if (!isAutoPlaying) return;
    
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

  return (
    <section className="testimonials-section">
      <div className="testimonials-container">
        
        {/* Section Header */}
        <div className="section-header">
          <span className="section-label">Testimonials</span>
          <h2 className="section-title">What Our Clients Say</h2>
          <p className="section-description">
            Don&apos;t just take our word for it. Here&apos;s what our satisfied clients 
            have to say about working with us.
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="testimonials-carousel">
          
          {/* Background Decoration */}
          <div className="carousel-decoration">
            <Quote className="quote-icon quote-left" />
            <Quote className="quote-icon quote-right" />
          </div>

          {/* Main Carousel Content */}
          <div className="carousel-wrapper">
            
            {/* Previous Button */}
            <button 
              className="carousel-nav carousel-nav-prev"
              onClick={handlePrevious}
              aria-label="Previous testimonial"
            >
              <ChevronLeft />
            </button>

            {/* Testimonial Cards Container */}
            <div className="testimonials-track">
              {testimonials.map((testimonial, index) => {
                const isActive = index === currentIndex;
                const isPrev = index === (currentIndex - 1 + testimonials.length) % testimonials.length;
                const isNext = index === (currentIndex + 1) % testimonials.length;
                
                let positionClass = 'testimonial-card-hidden';
                if (isActive) positionClass = 'testimonial-card-active';
                else if (isPrev) positionClass = 'testimonial-card-prev';
                else if (isNext) positionClass = 'testimonial-card-next';

                return (
                  <div 
                    key={testimonial.id}
                    className={`testimonial-card ${positionClass}`}
                  >
                    {/* Company Logo */}
                    <div className="testimonial-logo">
                      <img 
                        src={testimonial.logo} 
                        alt={`${testimonial.company} logo`}
                      />
                    </div>

                    {/* Rating Stars */}
                    <div className="testimonial-rating">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="star-filled" />
                      ))}
                    </div>

                    {/* Testimonial Text */}
                    <blockquote className="testimonial-text">
                      &quot;{testimonial.text}&quot;
                    </blockquote>

                    {/* Project Tag */}
                    <div className="testimonial-project">
                      Project: {testimonial.project}
                    </div>

                    {/* Client Info */}
                    <div className="testimonial-client">
                      <div className="client-avatar">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.name}
                        />
                      </div>
                      <div className="client-info">
                        <h4 className="client-name">{testimonial.name}</h4>
                        <p className="client-position">
                          {testimonial.position}
                        </p>
                        <p className="client-company">
                          {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Next Button */}
            <button 
              className="carousel-nav carousel-nav-next"
              onClick={handleNext}
              aria-label="Next testimonial"
            >
              <ChevronRight />
            </button>
          </div>

          {/* Carousel Indicators (Dots) */}
          <div className="carousel-indicators">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`indicator-dot ${index === currentIndex ? 'active' : ''}`}
                onClick={() => handleDotClick(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          {/* Carousel Controls Info */}
          <div className="carousel-info">
            <span className="carousel-counter">
              {currentIndex + 1} / {testimonials.length}
            </span>
            <button 
              className="carousel-autoplay"
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              aria-label={isAutoPlaying ? "Pause autoplay" : "Resume autoplay"}
            >
              {isAutoPlaying ? "⏸ Pause" : "▶ Play"}
            </button>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="trust-indicators">
          <div className="trust-item">
            <div className="trust-number">50+</div>
            <div className="trust-label">Happy Clients</div>
          </div>
          <div className="trust-item">
            <div className="trust-number">98%</div>
            <div className="trust-label">Satisfaction Rate</div>
          </div>
          <div className="trust-item">
            <div className="trust-number">100%</div>
            <div className="trust-label">Project Success</div>
          </div>
          <div className="trust-item">
            <div className="trust-number">4.9/5</div>
            <div className="trust-label">Average Rating</div>
          </div>
        </div>

      </div>
    </section>
  );
}
