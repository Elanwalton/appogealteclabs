import React from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Calendar } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

async function getDoc(id: string) {
  try {
    const res = await fetch(`${API_URL}/documentation/${id}`, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    return null;
  }
}

export default async function DocumentationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const doc = await getDoc(id);

  if (!doc) {
    return (
      <div className="min-h-screen pt-32 pb-24 flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-4xl font-bold text-text-primary mb-4">Document Not Found</h1>
        <p className="text-text-secondary mb-8">The documentation page you are looking for does not exist.</p>
        <Link href="/documentation" className="bg-accent text-bg-primary px-6 py-3 rounded-xl font-bold hover:bg-[#00e5c0] transition-colors">
          Back to Documentation
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-6 lg:px-8 max-w-4xl mx-auto min-h-screen">
      <Link href="/documentation" className="inline-flex items-center gap-2 text-text-muted hover:text-accent font-medium mb-8 transition-colors">
        <ArrowLeft size={18} /> Back to Docs
      </Link>
      
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <span className="bg-accent/10 text-accent px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            {doc.category}
          </span>
          <span className="flex items-center gap-1 text-text-muted text-sm">
            <Calendar size={14} />
            {new Date(doc.created_at).toLocaleDateString()}
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-text-primary leading-tight">
          {doc.title}
        </h1>
      </div>

      <div className="bg-bg-secondary border border-gray-800 rounded-2xl p-8 md:p-12 prose prose-invert prose-emerald max-w-none">
        <div className="whitespace-pre-wrap text-text-secondary leading-relaxed">
          {doc.content}
        </div>
      </div>
      
      <div className="mt-12 flex justify-between border-t border-gray-800 pt-8">
        <Link href="/documentation" className="flex items-center gap-2 text-text-muted hover:text-text-primary transition-colors">
           <BookOpen size={18} /> Documentation Home
        </Link>
      </div>
    </div>
  );
}
