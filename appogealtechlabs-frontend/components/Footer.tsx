'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { 
  Twitter, Linkedin, Github, Instagram, Globe, 
  Send, Mail, Phone, MapPin, ArrowRight, Heart, ChevronUp 
} from 'lucide-react';
import NewsletterForm from './NewsletterForm';
import SiteVisitCounter from './SiteVisitCounter';

export default function Footer() {
  const pathname = usePathname();
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (pathname?.startsWith('/admin')) return null;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer relative pt-24 pb-8 px-8 border-t border-[rgba(100,255,218,0.1)] overflow-hidden">
      {/* Top Gradient Line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[rgba(100,255,218,0.5)] to-transparent"></div>

      <div className="max-w-[1440px] mx-auto">
        
        {/* Footer Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16 pb-16 border-b border-[rgba(100,255,218,0.1)]">
          
          {/* Company Info */}
          <div className="lg:col-span-1.5 max-w-sm footer-logo">
            <div className="flex flex-col gap-1 mb-6">
              <span className="logo-text text-2xl font-extrabold bg-gradient-to-br from-accent to-[#00d4ff] bg-clip-text text-transparent leading-tight">Appogeal</span>
              <span className="logo-text text-2xl font-extrabold bg-gradient-to-br from-accent to-[#00d4ff] bg-clip-text text-transparent leading-tight">TechLabs</span>
            </div>
            <p className="footer-tagline text-text-secondary text-[0.9375rem] leading-relaxed mb-8">
              Building digital excellence, one project at a time. 
              Transforming ideas into powerful web experiences.
            </p>
            <div className="flex gap-4">
              {[Twitter, Linkedin, Github, Instagram, Globe].map((Icon, idx) => {
                const urls = ['https://twitter.com/appogealtech', 'https://linkedin.com/company/appogealtech', 'https://github.com/appogealtech', 'https://instagram.com/appogealtech', 'https://appogealtechlabs.com'];
                return (
                <a 
                  key={idx}
                  href={urls[idx]}
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="social-link w-11 h-11 flex items-center justify-center bg-[rgba(100,255,218,0.05)] border border-[rgba(100,255,218,0.2)] rounded-xl text-accent transition-all duration-300 hover:bg-[rgba(100,255,218,0.1)] hover:border-[rgba(100,255,218,0.4)] hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(100,255,218,0.2)]"
                  aria-label="Social Link"
                >
                  <Icon size={20} />
                </a>
                );
              })}
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="footer-column-title text-lg font-bold text-text-primary mb-6 relative pb-3 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-gradient-to-r after:from-accent after:to-transparent">Quick Links</h4>
            <ul className="footer-links flex flex-col gap-3.5">
              {[
                { label: 'Home', href: '/' },
                { label: 'About Us', href: '/about' },
                { label: 'Projects', href: '/projects' },
                { label: 'Services', href: '/services' },
                { label: 'Blog', href: '/blog' },
                { label: 'Contact', href: '/contact' }
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-text-secondary text-[0.9375rem] transition-all duration-300 hover:text-accent hover:pl-5 relative group">
                    <span className="absolute left-[-20px] opacity-0 text-accent transition-all duration-300 group-hover:left-0 group-hover:opacity-100">→</span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h4 className="footer-column-title text-lg font-bold text-text-primary mb-6 relative pb-3 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-gradient-to-r after:from-accent after:to-transparent">Services</h4>
            <ul className="footer-links flex flex-col gap-3.5">
              {['Web Development', 'Mobile Apps', 'UI/UX Design', 'API Development', 'Consulting', 'Maintenance'].map((item) => (
                <li key={item}>
                  <Link href="/services" className="text-text-secondary text-[0.9375rem] transition-all duration-300 hover:text-accent hover:pl-5 relative group">
                    <span className="absolute left-[-20px] opacity-0 text-accent transition-all duration-300 group-hover:left-0 group-hover:opacity-100">→</span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Resources */}
          <div>
             <h4 className="footer-column-title text-lg font-bold text-text-primary mb-6 relative pb-3 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-gradient-to-r after:from-accent after:to-transparent">Resources</h4>
             <ul className="footer-links flex flex-col gap-3.5">
               {['Documentation', 'Tutorials', 'Case Studies', 'FAQ', 'Privacy Policy', 'Terms'].map((item) => (
                 <li key={item}>
                   <Link href={`/${item.toLowerCase().replace(' ', '-')}`} className="text-text-secondary text-[0.9375rem] transition-all duration-300 hover:text-accent hover:pl-5 relative group">
                     <span className="absolute left-[-20px] opacity-0 text-accent transition-all duration-300 group-hover:left-0 group-hover:opacity-100">→</span>
                     {item}
                   </Link>
                 </li>
               ))}
             </ul>
          </div>
          
          {/* Newsletter */}
          <div className="lg:col-span-1 max-w-sm">
            <h4 className="footer-column-title text-lg font-bold text-text-primary mb-6 relative pb-3 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-10 after:h-0.5 after:bg-gradient-to-r after:from-accent after:to-transparent">Stay Updated</h4>
            <p className="newsletter-description text-text-secondary text-sm leading-relaxed mb-6">
              Subscribe to our newsletter for latest updates, tips, and exclusive offers.
            </p>
            <NewsletterForm />
            
            <div className="flex flex-col gap-4">
              <div className="contact-item flex items-center gap-3 text-text-secondary text-sm group">
                <Mail size={18} className="text-accent flex-shrink-0" />
                <a href="mailto:info@appogealtechlabs.com" className="hover:text-accent transition-colors">info@appogealtechlabs.com</a>
              </div>
              <div className="contact-item flex items-center gap-3 text-text-secondary text-sm group">
                <Phone size={18} className="text-accent flex-shrink-0" />
                <a href="tel:+254700000000" className="hover:text-accent transition-colors">+254 700 000 000</a>
              </div>
              <div className="contact-item flex items-center gap-3 text-text-secondary text-sm">
                <MapPin size={18} className="text-accent flex-shrink-0" />
                <span>Nairobi, Kenya</span>
              </div>
            </div>
          </div>

        </div>
        
        {/* Middle Status */}
        <div className="footer-status-bar flex flex-col md:flex-row justify-between items-center p-8 mb-12 backdrop-blur-md border rounded-[20px] gap-6 text-center md:text-left">
          <div className="flex items-center gap-3 font-semibold">
            <div className="w-3 h-3 rounded-full bg-[#10b981] shadow-[0_0_0_0_rgba(16,185,129,0.7)] animate-[statusPulse_2s_infinite]"></div>
            <span>Currently Available for New Projects</span>
          </div>
          <Link href="/contact" className="inline-flex items-center gap-3 px-8 py-3.5 bg-gradient-to-br from-accent to-[#00d4ff] text-[#0a192f] text-base font-semibold rounded-xl shadow-[0_4px_16px_rgba(100,255,218,0.3)] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(100,255,218,0.5)] transition-all duration-300 group">
             Let's Work Together
             <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        
        {/* Footer Bottom */}
        <div className="pt-8 border-t border-[rgba(100,255,218,0.1)] flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <p className="text-text-secondary text-sm">
            © 2026 AppogealtechLabs. All rights reserved.
          </p>
          <SiteVisitCounter />
          <div className="flex items-center gap-4 text-text-secondary text-sm">
            <Link href="/privacy-policy" className="hover:text-accent transition-colors">Privacy Policy</Link>
            <span className="text-[rgba(100,255,218,0.3)]">•</span>
            <Link href="/terms" className="hover:text-accent transition-colors">Terms of Service</Link>
          </div>
          <div className="flex items-center gap-2 text-text-secondary text-sm">
            Made with <Heart size={16} className="text-[#ef4444] animate-[heartbeat_1.5s_ease-in-out_infinite]" /> in Nairobi
          </div>
        </div>

      </div>

      {/* Back to Top */}
      <button 
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 w-[50px] h-[50px] flex items-center justify-center bg-gradient-to-br from-accent to-[#00d4ff] text-[#0a192f] rounded-full shadow-[0_4px_16px_rgba(100,255,218,0.3)] hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(100,255,218,0.5)] transition-all duration-300 z-50 ${showBackToTop ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        aria-label="Back to top"
      >
        <ChevronUp size={24} />
      </button>

    </footer>
  );
}
