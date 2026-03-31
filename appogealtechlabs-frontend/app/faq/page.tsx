'use client';

import React, { useState, useEffect } from 'react';
import { ChevronDown, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import api, { endpoints } from '@/lib/api';

export default function FAQPage() {
  const [open, setOpen] = useState<number | null>(0);
  const [faqs, setFaqs] = useState<any[]>([]);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await api.get(`${endpoints.faqs}?category=general`);
        setFaqs(response.data);
      } catch (error) {
        console.error('Failed to fetch FAQs:', error);
      }
    };
    fetchFaqs();
  }, []);

  return (
    <div className="pt-32 pb-24 px-6 lg:px-8 max-w-[1440px] mx-auto min-h-screen">
      <div className="text-center mb-16 animate-fadeInUp">
        <h1 className="text-4xl md:text-5xl font-extrabold text-text-primary mb-6">Frequently Asked Questions</h1>
        <p className="text-text-secondary max-w-2xl mx-auto text-lg">
          Find answers to common questions about our development process, pricing, and capabilities.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-4 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
        {faqs.map((faq, idx) => (
          <div key={idx} className="bg-bg-secondary border border-gray-800 rounded-2xl overflow-hidden transition-colors hover:border-gray-700">
            <button 
              className="w-full text-left p-6 flex items-center justify-between focus:outline-none"
              onClick={() => setOpen(open === idx ? null : idx)}
            >
              <span className="text-lg font-bold text-text-primary pr-8">{faq.question}</span>
              <ChevronDown size={20} className={`text-accent shrink-0 transition-transform duration-300 ${open === idx ? 'rotate-180' : ''}`} />
            </button>
            <div className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${open === idx ? 'max-h-[500px] pb-6 opacity-100' : 'max-h-0 opacity-0'}`}>
              <p className="text-text-secondary leading-relaxed">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="max-w-3xl mx-auto mt-16 p-8 bg-gradient-to-br from-accent/5 to-[rgba(0,212,255,0.05)] border border-accent/20 rounded-2xl text-center">
        <MessageCircle size={32} className="text-accent mx-auto mb-4" />
        <h3 className="text-xl font-bold text-text-primary mb-3">Still have questions?</h3>
        <p className="text-text-secondary mb-6">We're here to help. Reach out to our team for a free consultation.</p>
        <Link href="/contact" className="inline-flex px-8 py-3 bg-accent text-bg-primary font-bold rounded-xl hover:bg-[#00e5c0] transition-colors">
          Contact Us
        </Link>
      </div>
    </div>
  );
}
