import React from 'react';
import Link from 'next/link';
import { ArrowRight, BarChart } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

async function getCaseStudies() {
  try {
    const res = await fetch(`${API_URL}/case-studies`, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error('Failed to fetch case studies:', error);
    return [];
  }
}

export default async function CaseStudiesPage() {
  const cases = await getCaseStudies();

  return (
    <div className="pt-32 pb-24 px-6 lg:px-8 max-w-[1440px] mx-auto min-h-screen">
      <div className="text-center mb-16 animate-fadeInUp">
        <h1 className="text-4xl md:text-5xl font-extrabold text-text-primary mb-6">Case Studies</h1>
        <p className="text-text-secondary max-w-2xl mx-auto text-lg">
          Discover how AppogealTechLabs transforms complex business challenges into scalable, high-performance digital solutions.
        </p>
      </div>

      <div className="space-y-8 max-w-5xl mx-auto animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
        {cases.map((c: any, idx: number) => (
          <div key={idx} className="bg-bg-secondary border border-gray-800 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row gap-8 items-start md:items-center justify-between hover:border-accent/40 transition-colors group">
            <div className="flex-1">
              <span className="text-accent text-sm font-bold tracking-wider uppercase mb-3 block">{c.client}</span>
              <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-4 leading-tight">{c.title}</h2>
              <Link href={`/case-studies/${c.slug || c.id || idx}`} className="inline-flex items-center gap-2 text-text-muted hover:text-accent font-medium transition-colors">
                Read full study <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="w-full md:w-auto shrink-0 bg-bg-primary border border-gray-800 rounded-xl p-6 text-center min-w-[180px]">
              <BarChart size={24} className="text-accent mx-auto mb-3" />
              <div className="text-3xl font-extrabold text-white">{c.metric}</div>
              <div className="text-xs text-text-muted mt-1 uppercase tracking-widest text-center">Impact</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
