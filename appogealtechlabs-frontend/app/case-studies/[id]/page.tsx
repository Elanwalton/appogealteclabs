import React from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

export default async function SingleCaseStudyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const idStr = id || '0';
  
  const casesDB = [
    {
      title: 'Scaling Payments Infrastructure to 1M+ Daily Txns',
      challenge: 'FinTech Innovators was running heavily on legacy monolithic architecture. As transaction volume grew 50% month-over-month, database locks and server timeouts caused frequent API failures, risking their core banking integration drops and massive SLA penalties during peak holiday traffic.',
      solution: 'We orchestrated a complete migration from their monolithic backend to a scalable microservices architecture hosted on AWS Kubernetes (EKS). The persistence layer was split using read-replicas, and Node.js was introduced to leverage async concurrency for payment webhooks. We also implemented robust Dead Letter Queues (DLQs) for safe retry mechanisms.',
      results: 'The newly engineered ecosystem achieved 100% uptime through the peak season. High-concurrency transaction throughput increased by 300% (TPS), bringing AWS hosting costs down 60% due to dynamic auto-scaling pods effectively replacing continually spun-up monolithic instances.',
      tech: ['Next.js', 'Node.js', 'AWS EKS', 'Docker', 'PostgreSQL', 'Redis']
    },
    {
      title: 'HIPAA-compliant Telemedicine Platform Build',
      challenge: 'HealthCare Plus needed to transition from physical routing to digital, remote patient monitoring urgently. Because the data contained sensitive PII and PHI (Protected Health Information), standard cloud hosting would breach compliance laws. Furthermore, video conferencing latency rendered consultations nearly impossible in low-bandwidth rural regions.',
      solution: 'We built a bespoke WebRTC engine highly optimized for adaptive bitrate streaming, meaning video quality degrades gracefully rather than dropping audio during unstable mobile connections. The infrastructure was secured on GCP utilizing End-to-End Encryption (E2EE) and granular IAM (Identity and Access Management) rules passing strict third-party HIPAA audits.',
      results: 'Over 500+ daily remote consultations are now safely executed on the platform. End-user latency was successfully reduced by 40% across poor LTE networks. The client secured a Ksh 400M Series A funding round immediately following the successful technical audit of the platform.',
      tech: ['React', 'WebRTC', 'Firebase', 'Google Cloud', 'Express', 'Socket.io']
    },
    {
      title: 'Real-time Fleet Tracking Dashboard',
      challenge: 'Logistics Pro managed over 4,000 active delivery vehicles. Their legacy dashboard relied on heavy, client-side REST polling to update vehicle locations, which completely froze the browser DOM when attempting to render thousands of coordinate pin updates on their map interface concurrently.',
      solution: 'We stripped out the heavy polling logic and replaced it with dedicated WebSockets pushing lightweight binary coordinate diffs. On the React frontend, we ripped out standard DOM map layers and engineered a WebGL-based map interface capable of rendering 100,000+ geometric pin changes at a sustained 60 frames-per-second without blocking the main browser thread.',
      results: 'Dispatchers can now view the entire 4,000 fleet live concurrently without browser lag. Operational latency dropped from a 15-second data delay to sub-100ms real-time visualization. Fleet routing efficiency increased by 18%, resulting in dramatic fuel savings.',
      tech: ['React', 'WebGL', 'Node.js', 'WebSockets', 'Mapbox GL', 'Kubernetes']
    }
  ];

  const study = casesDB[parseInt(idStr)] || casesDB[0];

  return (
    <div className="pt-32 pb-24 px-6 lg:px-8 max-w-[1440px] mx-auto min-h-screen">
      <Link href="/case-studies" className="inline-flex items-center gap-2 text-text-muted hover:text-accent font-medium mb-12 transition-colors">
        <ArrowLeft size={18} /> Back to Case Studies
      </Link>
      
      <div className="max-w-4xl animate-fadeInUp">
        <h1 className="text-4xl md:text-5xl font-extrabold text-text-primary mb-8 leading-tight">{study.title}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
        <div className="bg-bg-secondary border border-gray-800 rounded-2xl p-6 hover:border-accent/30 transition-colors">
          <h3 className="text-sm font-bold text-accent uppercase tracking-wider mb-3">The Challenge</h3>
          <p className="text-text-secondary text-sm leading-relaxed">{study.challenge}</p>
        </div>
        <div className="bg-bg-secondary border border-gray-800 rounded-2xl p-6 hover:border-accent/30 transition-colors">
          <h3 className="text-sm font-bold text-accent uppercase tracking-wider mb-3">The Solution</h3>
          <p className="text-text-secondary text-sm leading-relaxed">{study.solution}</p>
        </div>
        <div className="bg-bg-secondary border border-gray-800 rounded-2xl p-6 hover:border-accent/30 transition-colors">
          <h3 className="text-sm font-bold text-accent uppercase tracking-wider mb-3">The Results</h3>
          <p className="text-text-secondary text-sm leading-relaxed">{study.results}</p>
        </div>
      </div>

      <div className="max-w-4xl space-y-8 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
        <div className="prose prose-invert max-w-none">
          <h2 className="text-2xl font-bold text-text-primary mb-4">Key Technologies Leveraged</h2>
          <div className="flex flex-wrap gap-3 mt-4">
            {study.tech.map(tech => (
              <span key={tech} className="inline-flex items-center gap-1.5 px-4 py-2 bg-gray-900 border border-gray-700 hover:border-accent/50 transition-colors text-text-primary rounded-xl text-sm font-medium">
                <CheckCircle2 size={16} className="text-accent" /> {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
