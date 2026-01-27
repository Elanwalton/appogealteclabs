'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import api, { endpoints } from '@/lib/api';
import type { Project } from '@/types';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';

export default function FeaturedProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get(`${endpoints.projects}?featured=true`);
        setProjects(response.data.slice(0, 3));
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) return null;

  return (
    <section className="py-32 max-w-[1440px] mx-auto px-6 lg:px-8">
      <div className="flex items-center mb-16">
        <span className="text-accent font-mono mr-4 text-xl">02.</span>
        <h2 className="text-3xl md:text-4xl font-bold text-text-primary">Featured Projects</h2>
        <div className="h-[1px] bg-bg-tertiary flex-grow ml-6 max-w-xs"></div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          // 3.3 CARD COMPONENTS - Project Card Styling
          <div 
            key={project.id} 
            className="group relative bg-[rgba(17,34,64,0.7)] backdrop-blur-xl border border-[rgba(100,255,218,0.12)] rounded-[20px] overflow-hidden transition-all duration-400 hover:-translate-y-3 hover:border-[rgba(100,255,218,0.3)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)]"
          >
            {/* Image Section */}
            <div className="relative h-[250px] overflow-hidden bg-gradient-to-br from-[#112240] to-[#1d3557]">
              {project.cover_image ? (
                <Image
                  src={project.cover_image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-text-muted">No Image</div>
              )}
              
              {/* Overlay with Actions */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[rgba(10,25,47,0.95)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <div className="flex gap-4 w-full">
                  <Link 
                    href={`/projects/${project.slug}`}
                    className="flex-1 py-3 text-center bg-[rgba(100,255,218,0.1)] backdrop-blur-md text-accent border border-[rgba(100,255,218,0.3)] rounded-xl font-semibold text-sm hover:bg-gradient-to-br hover:from-accent hover:to-[#00d4ff] hover:text-bg-primary hover:border-transparent transition-all"
                  >
                    View Details
                  </Link>
                  {project.live_url && (
                    <a 
                      href={project.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-3 text-center bg-[rgba(100,255,218,0.1)] backdrop-blur-md text-accent border border-[rgba(100,255,218,0.3)] rounded-xl font-semibold text-sm hover:bg-gradient-to-br hover:from-accent hover:to-[#00d4ff] hover:text-bg-primary hover:border-transparent transition-all"
                    >
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-6">
              {/* Category */}
              <span className="inline-block px-3.5 py-1.5 bg-[rgba(100,255,218,0.1)] text-accent text-xs font-bold uppercase tracking-wider rounded-md mb-3">
                {project.category || 'Development'}
              </span>

              <h3 className="text-2xl font-bold text-text-primary mb-3 leading-tight group-hover:text-accent transition-colors">
                <Link href={`/projects/${project.slug}`}>{project.title}</Link>
              </h3>

              <p className="text-text-secondary text-[0.9375rem] leading-relaxed mb-5 line-clamp-3">
                {project.short_description}
              </p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2">
                {project.technologies.slice(0, 4).map((tech) => (
                  <span 
                    key={tech.id}
                    className="px-3 py-1.5 bg-[rgba(100,255,218,0.05)] border border-[rgba(100,255,218,0.2)] rounded-lg text-accent text-xs font-mono"
                  >
                    {tech.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <Link 
          href="/projects" 
          className="inline-flex items-center px-8 py-3.5 border-2 border-accent text-accent font-semibold rounded-xl hover:bg-accent hover:text-bg-primary transition-all duration-300"
        >
          View All Projects <ArrowRight className="ml-2" size={18} />
        </Link>
      </div>
    </section>
  );
}
