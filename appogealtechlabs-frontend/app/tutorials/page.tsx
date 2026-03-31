import React from 'react';
import { PlayCircle, Clock } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

async function getTutorials() {
  try {
    const res = await fetch(`${API_URL}/tutorials`, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    console.error('Failed to fetch tutorials:', error);
    return [];
  }
}

export default async function TutorialsPage() {
  const tutorials = await getTutorials();

  return (
    <div className="pt-32 pb-24 px-6 lg:px-8 max-w-[1440px] mx-auto min-h-screen">
      <div className="text-center mb-16 animate-fadeInUp">
        <h1 className="text-4xl md:text-5xl font-extrabold text-text-primary mb-6">Video Tutorials</h1>
        <p className="text-text-secondary max-w-2xl mx-auto text-lg">
          Step-by-step guides to help you master modern web development architectures, DevOps, and cloud infrastructure.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
        {tutorials.map((tut: any, idx: number) => (
          <Link href={tut.videoUrl || `/tutorials/${tut.slug || tut.id}`} key={idx} target={tut.videoUrl ? "_blank" : undefined} className="bg-bg-secondary border border-gray-800 rounded-2xl overflow-hidden hover:border-accent/40 transition-colors group cursor-pointer block">
            <div className="w-full h-48 bg-gray-900 relative flex items-center justify-center overflow-hidden">
              {tut.image && (
                <img src={tut.image} alt={tut.title} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity" />
              )}
              <PlayCircle size={48} className="text-accent opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all z-10" />
              <div className="absolute inset-0 bg-accent/5 group-hover:bg-accent/10 transition-colors"></div>
            </div>
            <div className="p-6">
              <span className="text-xs font-bold text-accent uppercase tracking-wider mb-2 block">{tut.category}</span>
              <h2 className="text-lg font-bold text-text-primary mb-3 line-clamp-2">{tut.title}</h2>
              <div className="flex items-center gap-2 text-text-muted text-sm font-medium">
                <Clock size={14} /> {tut.duration} watch
              </div>
            </div>
          </Link>
        ))}
        
        {tutorials.length === 0 && (
          <div className="col-span-full text-center py-24 text-text-muted">
             No tutorials available yet. Please check back later!
          </div>
        )}
      </div>
    </div>
  );
}
