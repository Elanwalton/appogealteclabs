import React from 'react';
import Link from 'next/link';
import { BookOpen, Code, Terminal, FileCode } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

async function getDocs() {
  try {
    const res = await fetch(`${API_URL}/documentation`, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error('Failed to fetch docs:', error);
    return [];
  }
}

export default async function DocumentationPage() {
  const docs = await getDocs();

  return (
    <div className="pt-32 pb-24 px-6 lg:px-8 max-w-[1440px] mx-auto min-h-screen">
      <div className="text-center mb-16 animate-fadeInUp">
        <h1 className="text-4xl md:text-5xl font-extrabold text-text-primary mb-6">Documentation</h1>
        <p className="text-text-secondary max-w-2xl mx-auto text-lg">
          Everything you need to integrate, build, and scale with AppogealTechLabs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-4xl mx-auto animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
        {docs.length > 0 ? docs.sort((a: any, b: any) => a.order - b.order).map((doc: any, idx: number) => {
          return (
            <Link href={`/documentation/${doc.slug}`} key={doc.id || idx} className="block bg-bg-secondary border border-gray-800 rounded-2xl p-8 hover:border-accent/40 transition-colors group cursor-pointer">
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent mb-6 group-hover:scale-110 transition-transform">
                <BookOpen size={24} />
              </div>
              <div className="text-xs font-bold text-accent mb-2 uppercase tracking-wider">{doc.category}</div>
              <h2 className="text-xl font-bold text-text-primary mb-3">{doc.title}</h2>
              <p className="text-text-secondary leading-relaxed tracking-wide line-clamp-2">
                {doc.content}
              </p>
              <div className="mt-6 font-semibold text-accent flex items-center gap-2">
                Read guide <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </Link>
          );
        }) : (
          <div className="col-span-full py-24 text-center text-text-muted">
            Documentation is currently being updated. Please check back later!
          </div>
        )}
      </div>
    </div>
  );
}
