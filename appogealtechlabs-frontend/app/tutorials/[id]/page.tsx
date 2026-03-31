import React from 'react';
import Link from 'next/link';
import { ArrowLeft, PlayCircle, Calendar, Eye, Share2, FileCode } from 'lucide-react';

export default async function SingleTutorialPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const idStr = id || '0';
  
  const tutDB = [
    {
      title: 'Deploying Next.js to Firebase Hosting',
      time: '12 min', views: '1,240', date: 'March 10, 2026', videoId: 'E_kEA9yN5iM',
      content: (
        <>
          <p className="text-text-secondary leading-relaxed mb-6">
            In this tutorial, we dive into deploying a server-side rendered (SSR) Next.js application directly to Firebase Hosting using leveraging Firebase's experimental Web Frameworks support. This approach allows you to seamlessly orchestrate Next.js API routes and server components within Google Cloud's edge network without manual Cloud Run setup.
          </p>
          <div className="p-6 bg-accent/5 border border-accent/20 rounded-xl mb-6">
            <h3 className="text-accent font-bold mb-2">Prerequisites:</h3>
            <ul className="list-disc pl-5 text-text-secondary space-y-1">
              <li>A Next.js 14+ application using the App Router.</li>
              <li>An active Firebase project with the Blaze (Pay-as-you-go) plan.</li>
              <li>Firebase CLI (`npm install -g firebase-tools`) version 11.14.2 or higher.</li>
            </ul>
          </div>
          <h3 className="text-xl font-bold text-text-primary mb-3">Key Takeaways</h3>
          <p className="text-text-secondary leading-relaxed mb-4">
            You will learn how to initialize the Firebase target, configure `firebase.json` for SSR targets via internal Cloud Functions handling, and automate the deployment pipeline through GitHub Actions so your pushes automatically roll out to production.
          </p>
        </>
      )
    },
    {
      title: 'Building a CRUD API with Node.js & Firestore',
      time: '18 min', views: '3,450', date: 'March 15, 2026', videoId: '2P5nAYYc8U0',
      content: (
        <>
          <p className="text-text-secondary leading-relaxed mb-6">
            RESTful APIs are the backbone of modern web architecture. In this guide, we map out how to construct a scalable Express.js server connected to Google Cloud Firestore (NoSQL). We cover everything from initial routing to writing robust error handlers and validating payloads before writing to the database.
          </p>
          <div className="bg-[#0d1117] border border-gray-800 rounded-xl p-5 mb-6 font-mono text-sm text-gray-300">
            <span className="text-gray-500 block mb-2">// Sample Route Structure</span>
            <span className="text-purple-400">router</span>.post(<span className="text-green-400">'/projects'</span>, <span className="text-blue-400">async</span> (req, res) =&gt; {'{'} <br/>
            &nbsp;&nbsp;<span className="text-blue-400">const</span> docRef = <span className="text-blue-400">await</span> db.collection(<span className="text-green-400">'projects'</span>).add(req.body); <br/>
            &nbsp;&nbsp;res.status(<span className="text-orange-400">201</span>).json({'{'} id: docRef.id {'}'}); <br/>
            {'}'});
          </div>
          <h3 className="text-xl font-bold text-text-primary mb-3">Core Topics Covered</h3>
          <p className="text-text-secondary leading-relaxed">
            By the end of this video, you will have implemented full Create, Read, Update, and Delete endpoints. We also touch on essential security middleware, such as checking Firebase Admin Auth tokens for protected mutation routes.
          </p>
        </>
      )
    },
    {
      title: 'Advanced Tailwind CSS Animations & Glassmorphism',
      time: '25 min', views: '5,120', date: 'March 20, 2026', videoId: 'pfaSUYaSgRo',
      content: (
        <>
          <p className="text-text-secondary leading-relaxed mb-6">
            UI engineering has moved far beyond basic flat colors. Constructing a premium, engaging frontend experience requires mastering depth, translucency, and micro-interactions. In this design-heavy tutorial, we stretch Tailwind CSS to its absolute limits without installing heavy third-party animation libraries.
          </p>
          <div className="flex gap-4 p-5 bg-gray-900 border border-gray-800 rounded-xl mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-[#00d4ff] animate-pulse"></div>
            <div className="flex-1">
              <h4 className="font-bold text-text-primary text-sm mb-1">Glassmorphism Formula</h4>
              <p className="text-xs text-text-muted font-mono bg-black/50 px-2 py-1 rounded inline-block">
                backdrop-blur-md bg-white/10 border border-white/20 shadow-xl
              </p>
            </div>
          </div>
          <h3 className="text-xl font-bold text-text-primary mb-3">What You'll Build</h3>
          <p className="text-text-secondary leading-relaxed">
            We'll develop a floating notification stack, a frosted-glass navigation bar, and interactive hover states that cast dynamic box-shadows. You'll also learn how to configure `tailwind.config.js` to create custom keyframes and reusable animation utility classes for your enterprise projects.
          </p>
        </>
      )
    }
  ];
  
  const tut = tutDB[parseInt(idStr)] || tutDB[0];

  return (
    <div className="pt-32 pb-24 px-6 lg:px-8 max-w-[1440px] mx-auto min-h-screen">
      <Link href="/tutorials" className="inline-flex items-center gap-2 text-text-muted hover:text-accent font-medium mb-8 transition-colors">
        <ArrowLeft size={18} /> Back to Tutorials
      </Link>
      
      <div className="max-w-4xl mx-auto">
        {/* Embedded Video Player */}
        <div className="w-full aspect-video bg-gray-900 rounded-2xl border border-gray-800 mb-8 overflow-hidden shadow-2xl relative">
          <iframe 
            width="100%" height="100%" 
            src={`https://www.youtube.com/embed/${tut.videoId}?autoplay=0&rel=0&modestbranding=1`} 
            title={tut.title} frameBorder="0" className="absolute top-0 left-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          ></iframe>
        </div>

        {/* Video Info */}
        <div className="animate-fadeInUp">
          <h1 className="text-3xl md:text-4xl font-extrabold text-text-primary mb-4 leading-tight">{tut.title}</h1>
          <div className="flex flex-wrap items-center gap-6 text-sm text-text-muted border-b border-gray-800 pb-8 mb-8">
            <div className="flex items-center gap-2"><Calendar size={16} /> {tut.date}</div>
            <div className="flex items-center gap-2"><Eye size={16} /> {tut.views} views</div>
            <button className="flex items-center gap-2 hover:text-accent transition-colors ml-auto"><Share2 size={16} /> Share Tutorial</button>
          </div>
          
          <div className="prose prose-invert max-w-none">
            <h2 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-2">
              <FileCode className="text-accent" size={20} /> About this Guide
            </h2>
            {tut.content}
          </div>
        </div>
      </div>
    </div>
  );
}
