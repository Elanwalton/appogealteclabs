'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, ArrowRight, Code, Database, Cloud, MessageCircle } from 'lucide-react';
import { useEffect, useRef } from 'react';
import Globe from '@/components/Globe';

export default function Hero() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  return (
    // 4.1 Hero Section Structure - Base Container
    <section ref={targetRef} className="hero-section relative min-h-screen flex items-center overflow-hidden py-24 px-8 lg:px-16" style={{ background: 'var(--bg-primary)' }}>
      {/* 4.2 Background Layers */}
      <div className="absolute inset-0 z-0 heading-gradient-overlay">
        {/* Animated Gradient Overlay - removed hardcoded dark colors, now controlled by CSS */}
        <div className="absolute inset-0 hero-gradient-overlay"></div>
        <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(100,255,218,0.05),transparent,rgba(0,212,255,0.05))] bg-[length:400%_400%] animate-[gradientShift_15s_ease_infinite]"></div>
        
        {/* Grid Pattern */}
        <div className="hero-grid-pattern absolute inset-0 bg-[linear-gradient(rgba(100,255,218,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(100,255,218,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:linear-gradient(to_bottom,black,transparent)]"></div>
        
        {/* Particles Container (Simplified CSS implementation) */}
        <div className="absolute inset-0 pointer-events-none">
           {[...Array(20)].map((_, i) => (
             <div 
               key={i}
               className="particle absolute w-1 h-1 bg-[radial-gradient(circle,#64ffda,transparent)] rounded-full animate-[float_4s_ease-in-out_infinite]"
               style={{
                 top: `${Math.random() * 100}%`,
                 left: `${Math.random() * 100}%`,
                 animationDelay: `${Math.random() * 5}s`,
                 animationDuration: `${3 + Math.random() * 5}s`
               }}
             />
           ))}
        </div>
      </div>

      <div className="relative z-10 w-full max-w-[1440px] mx-auto grid lg:grid-cols-2 gap-16 items-center">
        {/* Hero Text Content */}
        <motion.div 
          style={{ opacity, scale }}
          className="flex flex-col justify-center"
        >
          <motion.span 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="hero-greeting text-accent font-mono text-lg font-semibold mb-4 inline-block"
          >
            Hi, I'm
          </motion.span>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="hero-title text-5xl md:text-[4.5rem] font-extrabold leading-[1.1] mb-6 tracking-tight"
          >
            <span className="text-gradient block">Appogeal</span>
            <span className="text-gradient block">TechLabs</span>
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="h-[60px] mb-6 flex items-center"
          >
            <span className="hero-description text-3xl font-semibold text-text-secondary relative">
              Building Digital Excellence
              <span className="ml-1 text-accent animate-[blink_1s_step-end_infinite]">|</span>
            </span>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="hero-description text-lg md:text-xl text-text-secondary leading-relaxed mb-10 max-w-2xl"
          >
            We create cutting-edge web applications, mobile solutions, and 
            digital experiences that transform businesses and engage users.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap gap-5 mb-12"
          >
            <button className="btn-primary px-8 py-3.5 bg-gradient-to-br from-accent to-[#00d4ff] text-bg-primary text-lg font-semibold rounded-xl shadow-[0_4px_16px_rgba(100,255,218,0.3)] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(100,255,218,0.5)] transition-all duration-300 relative overflow-hidden group flex items-center gap-3">
              View Our Work
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="btn-secondary px-8 py-3.5 bg-transparent border-2 border-accent text-accent text-lg font-semibold rounded-xl hover:bg-accent/10 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(100,255,218,0.2)] transition-all duration-300 flex items-center gap-3">
              Get In Touch
              <MessageCircle size={20} />
            </button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex gap-12 pt-8 border-t border-[rgba(100,255,218,0.1)]"
          >
            <div className="flex flex-col gap-2">
              <span className="stat-number text-[2.5rem] font-extrabold text-accent leading-none text-glow">50+</span>
              <span className="stat-label text-sm text-text-secondary uppercase tracking-wider font-mono">Projects Completed</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="stat-number text-[2.5rem] font-extrabold text-accent leading-none text-glow">30+</span>
              <span className="stat-label text-sm text-text-secondary uppercase tracking-wider font-mono">Happy Clients</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="stat-number text-[2.5rem] font-extrabold text-accent leading-none text-glow">5+</span>
              <span className="stat-label text-sm text-text-secondary uppercase tracking-wider font-mono">Years Experience</span>
            </div>
          </motion.div>
        </motion.div>



        {/* Hero Visual (Right Side) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="relative h-[600px] hidden lg:block perspective-1000"
        >
          <div className="relative w-full h-full flex items-center justify-center">
            
            {/* The Globe */}
            <div className="absolute inset-0 z-10 flex items-center justify-center">
               <Globe className="w-full h-full max-w-[500px] max-h-[500px]" />
            </div>

            {/* Orbiting Icons */}
            {/* React */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute w-[400px] h-[400px] rounded-full border border-dashed border-[rgba(100,255,218,0.1)] z-0"
            >
               <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0f172a] p-2 rounded-full border border-accent/20">
                  <Code className="text-accent" size={24} />
               </div>
            </motion.div>

            {/* Django */}
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute w-[550px] h-[550px] rounded-full border border-dashed border-[rgba(100,255,218,0.1)] z-0"
            >
               <div className="absolute bottom-0 right-1/2 translate-x-1/2 translate-y-1/2 bg-[#0f172a] p-2 rounded-full border border-accent/20">
                  <Database className="text-green-500" size={24} />
               </div>
            </motion.div>

             {/* Cloud/Docker */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute w-[700px] h-[700px] rounded-full border border-dashed border-[rgba(100,255,218,0.05)] z-0"
            >
               <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 bg-[#0f172a] p-2 rounded-full border border-accent/20">
                  <Cloud className="text-blue-400" size={24} />
               </div>
            </motion.div>

            {/* Floating Tags (Static or bobbing) */}
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[10%] left-[10%] px-4 py-2 bg-bg-secondary/80 backdrop-blur border border-accent/20 rounded-lg text-sm font-mono text-accent z-20"
            >
              Python
            </motion.div>

            <motion.div 
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-[20%] right-[10%] px-4 py-2 bg-bg-secondary/80 backdrop-blur border border-accent/20 rounded-lg text-sm font-mono text-text-primary z-20"
            >
              TypeScript
            </motion.div>
            
             <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="absolute top-[30%] right-[5%] px-4 py-2 bg-bg-secondary/80 backdrop-blur border border-accent/20 rounded-lg text-sm font-mono text-blue-300 z-20"
            >
              Next.js
            </motion.div>

          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="hero-scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 cursor-pointer z-20"
      >
        <span className="text-sm text-text-secondary">Scroll to explore</span>
        <div className="scroll-arrow w-6 h-10 border-2 border-[rgba(100,255,218,0.4)] rounded-full relative">
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-accent rounded-full animate-[scrollDown_2s_ease-in-out_infinite]"></div>
        </div>
      </motion.div>
    </section>
  );
}
