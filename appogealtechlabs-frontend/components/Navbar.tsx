'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (pathname?.startsWith('/admin')) return null;

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/services', label: 'Services' },
    { href: '/projects', label: 'Work' },
    { href: '/blog', label: 'Blog' },
    { href: '/cost-calculator', label: 'Calculator' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    // 3.1 NAVIGATION BAR - Desktop Styling Specifications
    <nav
      className={`nav-container fixed top-0 left-0 right-0 z-[1000] border-b border-[rgba(100,255,218,0.1)] transition-all duration-300 ${
        scrolled 
          ? 'py-3 bg-[rgba(10,25,47,0.95)] shadow-lg backdrop-blur-xl scrolled' 
          : 'py-5 bg-[rgba(10,25,47,0.85)] backdrop-blur-md'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-8 flex justify-between items-center">
        {/* Logo */}
        <Link 
          href="/" 
          className="text-2xl font-bold text-accent font-sans flex items-center gap-2 hover:scale-105 transition-transform duration-300 logo"
        >
          Appogeal
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          <div className="flex gap-8 items-center">
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                className="nav-link relative text-[0.9375rem] font-medium text-text-primary hover:text-accent transition-colors py-2 group font-mono"
              >
                <span className="text-accent mr-1">0{index + 1}.</span>
                {link.label}
                {/* Underline Animation */}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-accent to-[#00d4ff] transition-all duration-300 group-hover:w-full group-[.active]:w-full"></span>
              </Link>
            ))}
          </div>
          
          <div className="flex items-center gap-4">
            <ThemeToggle />
            {/* CTA Button - Primary Button Spec */}
            <Link
              href="/contact"
              className="nav-cta px-6 py-2.5 bg-gradient-to-br from-accent to-[#00d4ff] text-bg-primary font-semibold rounded-xl shadow-[0_4px_16px_rgba(100,255,218,0.3)] hover:-translate-y-0.5 hover:shadow-[0_6px_24px_rgba(100,255,218,0.4)] transition-all duration-300 border-none font-sans"
            >
              Get Started
            </Link>
          </div>
        </div>

        {/* Mobile Menu Button - Flex Container for Toggle + Menu */}
        <div className="lg:hidden flex items-center gap-4">
          <ThemeToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-accent p-2 hover:bg-accent/10 rounded-md transition-colors z-[1001]"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} className="hamburger-icon" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mobile-overlay fixed inset-0 bg-[rgba(10,25,47,0.8)] backdrop-blur-sm z-[998]"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="mobile-menu-container fixed top-0 right-0 w-[80%] max-w-[400px] h-screen bg-[rgba(17,34,64,0.98)] backdrop-blur-xl shadow-[-4px_0_24px_rgba(0,0,0,0.5)] z-[999] p-8 pt-24"
            >
              <div className="flex flex-col gap-8">
                {navLinks.map((link, index) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="mobile-nav-link text-xl font-semibold text-text-primary hover:text-accent border-b border-[rgba(100,255,218,0.1)] pb-3 transition-colors font-mono"
                  >
                    <span className="text-accent text-sm mr-2">0{index + 1}.</span>
                    {link.label}
                  </Link>
                ))}
                <div className="mt-8">
                  <Link
                    href="/contact"
                    onClick={() => setIsOpen(false)}
                    className="nav-cta block w-full text-center px-8 py-4 border border-accent text-accent rounded-xl font-semibold hover:bg-accent/10 transition-colors bg-gradient-to-br from-accent to-[#00d4ff] text-bg-primary border-none shadow-[0_4px_16px_rgba(100,255,218,0.3)]"
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
