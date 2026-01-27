'use client';

import Link from 'next/link';
import { Globe, Smartphone, Server, ArrowRight } from 'lucide-react';

export default function ServicesOverview() {
  const services = [
    {
      icon: <Globe size={40} strokeWidth={1.5} />,
      title: 'Web Development',
      description: 'High-performance web applications built with Next.js and React. We focus on speed, accessibility, and SEO.',
    },
    {
      icon: <Smartphone size={40} strokeWidth={1.5} />,
      title: 'Mobile Solutions',
      description: 'Cross-platform mobile experiences that feel native. Built for both iOS and Android ecosystems.',
    },
    {
      icon: <Server size={40} strokeWidth={1.5} />,
      title: 'Backend Architecture',
      description: 'Robust server-side logic using Django and Python. Scalable APIs, database optimization, and secure cloud deployment.',
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
           <span className="text-accent font-mono text-sm tracking-wider uppercase">03. What We Do</span>
          <h2 className="text-h2 md:text-h1 font-bold text-text-primary mt-3">
            The Services We Offer
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => (
            <div
              key={index}
              className="glass-medium p-8 group hover:-translate-y-2 transition-transform duration-300 relative overflow-hidden"
            >
              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="text-accent mb-6 group-hover:scale-110 transition-transform duration-300 group-hover:text-white">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold mb-4 text-text-primary group-hover:text-accent transition-colors">
                {service.title}
              </h3>
              <p className="text-text-secondary leading-relaxed mb-6 font-body">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/services"
            className="group inline-flex items-center text-accent font-mono text-sm hover:underline tracking-wide"
          >
            Explore All Services & Pricing
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
