'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, ChevronLeft, ChevronRight, ExternalLink, Github } from 'lucide-react';
import api, { endpoints } from '@/lib/api';
import type { Project } from '@/types';

// 3.3 CARD COMPONENTS - Project Card
const ProjectCard = ({ project }: { project: Project }) => (
  <div className="project-card group relative bg-[rgba(17,34,64,0.7)] backdrop-blur-xl border border-[rgba(100,255,218,0.12)] rounded-[20px] overflow-hidden transition-all duration-400 cursor-pointer hover:-translate-y-3 hover:border-[rgba(100,255,218,0.3)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.4),0_0_30px_rgba(100,255,218,0.2)]">
    {/* Image Section */}
    <div className="project-card-image relative h-[250px] overflow-hidden">
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
      <div className="project-card-overlay absolute inset-0 bg-gradient-to-b from-transparent to-[rgba(10,25,47,0.95)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
        <div className="project-card-actions flex gap-4 w-full">
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
      <span className="project-category inline-block px-3.5 py-1.5 bg-[rgba(100,255,218,0.1)] text-accent text-xs font-bold uppercase tracking-wider rounded-md mb-3">
        {project.category || 'Development'}
      </span>

      <h3 className="project-title text-2xl font-bold text-text-primary mb-3 leading-tight group-hover:text-accent transition-colors">
        {project.title}
      </h3>

      <p className="project-description text-text-secondary text-[0.9375rem] leading-relaxed mb-5 line-clamp-3">
        {project.short_description}
      </p>

      {/* Tech Stack */}
      <div className="flex flex-wrap gap-2">
        {project.technologies.slice(0, 4).map((tech) => (
          <span 
            key={tech.id}
            className="tech-badge px-3 py-1.5 bg-[rgba(100,255,218,0.05)] border border-[rgba(100,255,218,0.2)] rounded-lg text-accent text-xs font-mono transition-transform group-hover:bg-[rgba(100,255,218,0.1)] hover:-translate-y-0.5"
          >
            {tech.name}
          </span>
        ))}
      </div>
    </div>
  </div>
);

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await api.get(endpoints.projects);
        setProjects(response.data);
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const filters = [
    { id: 'all', label: 'All Projects', count: projects.length },
    { id: 'web', label: 'Web Apps', count: projects.filter(p => p.category === 'web').length },
    { id: 'mobile', label: 'Mobile', count: projects.filter(p => p.category === 'mobile').length },
    { id: 'api', label: 'Backend/API', count: projects.filter(p => p.category === 'api').length },
  ];

  const filteredProjects = projects.filter(project => {
    const matchesFilter = activeFilter === 'all' || project.category === activeFilter;
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          project.short_description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <section className="hero-section min-h-screen py-32 px-6 lg:px-8 relative">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 right-0 h-[200px] bg-[radial-gradient(ellipse_at_top,rgba(100,255,218,0.05),transparent)] pointer-events-none"></div>

      <div className="max-w-[1440px] mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16 animate-fadeInUp">
          <span className="inline-block px-5 py-2 bg-[rgba(100,255,218,0.1)] border border-[rgba(100,255,218,0.3)] rounded-[20px] text-accent text-sm font-semibold uppercase tracking-[0.1em] mb-6">
            Our Work
          </span>
          <h2 className="text-5xl font-bold bg-gradient-to-br from-[#e6f1ff] to-accent bg-clip-text text-transparent mb-6">
            Featured Projects
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
            Explore our portfolio of successful projects that showcase our 
            expertise in building modern, scalable web applications.
          </p>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
          {/* Filters */}
          <div className="flex gap-4 overflow-x-auto pb-2 w-full md:w-auto scrollbar-hide">
            {filters.map(filter => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl border font-semibold text-[0.9375rem] transition-all whitespace-nowrap ${
                  activeFilter === filter.id
                    ? 'bg-gradient-to-br from-accent to-[#00d4ff] border-transparent text-bg-primary shadow-[0_4px_16px_rgba(100,255,218,0.3)]'
                    : 'bg-[rgba(17,34,64,0.6)] backdrop-blur-md border-[rgba(100,255,218,0.2)] text-text-secondary hover:text-accent hover:border-[rgba(100,255,218,0.4)]'
                }`}
              >
                {filter.label}
                <span className={`px-2 py-0.5 rounded-md text-xs font-bold ${
                  activeFilter === filter.id ? 'bg-[rgba(10,25,47,0.3)]' : 'bg-[rgba(255,255,255,0.1)]'
                }`}>
                  {filter.count}
                </span>
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full md:max-w-xs">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-accent pointer-events-none" size={20} />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-input w-full pl-14 pr-5 py-3.5 bg-[rgba(17,34,64,0.6)] backdrop-blur-md border border-[rgba(100,255,218,0.2)] rounded-xl text-text-primary outline-none focus:bg-[rgba(17,34,64,0.8)] focus:border-accent focus:shadow-[0_0_0_3px_rgba(100,255,218,0.1)] transition-all"
            />
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {loading ? (
             [...Array(6)].map((_, i) => (
               <div key={i} className="bg-[rgba(17,34,64,0.6)] backdrop-blur-md border border-[rgba(100,255,218,0.1)] rounded-[20px] overflow-hidden">
                 <div className="skeleton-shimmer w-full h-[250px]"></div>
                 <div className="p-6">
                   <div className="skeleton-shimmer h-3 rounded-md w-3/4 mb-4"></div>
                   <div className="skeleton-shimmer h-6 rounded-md w-1/2 mb-4"></div>
                   <div className="space-y-2 mb-6">
                     <div className="skeleton-shimmer h-2 rounded-md w-full"></div>
                     <div className="skeleton-shimmer h-2 rounded-md w-[85%]"></div>
                   </div>
                   <div className="flex gap-2">
                     {[1, 2, 3].map(j => (
                       <div key={j} className="skeleton-shimmer h-6 w-16 rounded-md"></div>
                     ))}
                   </div>
                 </div>
               </div>
             ))
          ) : filteredProjects.length > 0 ? (
             filteredProjects.map((project, index) => (
                <div key={project.id} className="animate-fadeInScale" style={{ animationDelay: `${index * 0.1}s` }}>
                   <ProjectCard project={project} />
                </div>
             ))
          ) : (
            <div className="col-span-full text-center py-20 text-text-secondary">
              No projects found matching your criteria.
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-4">
          <button className="flex items-center gap-2 px-6 py-3 bg-[rgba(17,34,64,0.6)] backdrop-blur-md border border-[rgba(100,255,218,0.2)] rounded-xl text-text-secondary font-semibold hover:border-accent hover:text-accent disabled:opacity-40 disabled:cursor-not-allowed transition-all" disabled>
            <ChevronLeft size={16} /> Previous
          </button>
          <div className="flex gap-2">
            {[1, 2, 3].map(page => (
              <button 
                key={page}
                className={`w-11 h-11 flex items-center justify-center rounded-xl border font-semibold transition-all ${
                  page === 1 
                  ? 'bg-gradient-to-br from-accent to-[#00d4ff] border-transparent text-bg-primary shadow-[0_4px_16px_rgba(100,255,218,0.3)]'
                  : 'bg-[rgba(17,34,64,0.6)] backdrop-blur-md border-[rgba(100,255,218,0.2)] text-text-secondary hover:text-accent hover:border-accent'
                }`}
              >
                {page}
              </button>
            ))}
            <span className="flex items-center justify-center w-11 text-text-secondary">...</span>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-[rgba(17,34,64,0.6)] backdrop-blur-md border border-[rgba(100,255,218,0.2)] rounded-xl text-text-secondary font-semibold hover:border-accent hover:text-accent transition-all">
            Next <ChevronRight size={16} />
          </button>
        </div>

      </div>
    </section>
  );
}
