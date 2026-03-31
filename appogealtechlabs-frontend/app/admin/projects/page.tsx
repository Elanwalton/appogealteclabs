'use client';

import { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, ExternalLink, Github, RefreshCw, FolderOpen, Star } from 'lucide-react';
import api from '@/lib/api';
import Link from 'next/link';

interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  image: string | null;
  tech_stack: string[];
  live_url: string | null;
  repo_url: string | null;
  featured: boolean;
  is_active: boolean;
  created_at: string;
}

const EMPTY: Omit<Project, 'id' | 'slug' | 'created_at' | 'is_active'> = {
  title: '', description: '', image: '', tech_stack: [], live_url: '', repo_url: '', featured: false,
};

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await api.get('/projects');
      setProjects(res.data);
    } catch { setError('Failed to load projects.'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchProjects(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this project permanently?')) return;
    try { await api.delete(`/projects/${id}`); setProjects(p => p.filter(x => x.id !== id)); }
    catch { alert('Failed to delete project.'); }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Projects</h1>
          <p className="text-text-secondary text-sm mt-1">{projects.length} total projects</p>
        </div>
        <div className="flex gap-3">
          <button onClick={fetchProjects} className="p-2.5 rounded-xl bg-gray-800 text-text-secondary hover:text-white transition-colors" title="Refresh"><RefreshCw size={18} /></button>
          <Link href="/admin/projects/new" className="flex items-center gap-2 bg-accent text-bg-primary font-bold px-5 py-2.5 rounded-xl hover:bg-[#00e5c0] transition-colors text-sm">
            <Plus size={18} /> New Project
          </Link>
        </div>
      </div>

      {error && <div className="mb-6 p-4 bg-red-500/10 text-red-400 rounded-xl text-sm">{error}</div>}

      <div className="bg-bg-secondary rounded-2xl border border-gray-800 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-24 text-text-muted"><RefreshCw size={24} className="animate-spin mr-3" /> Loading...</div>
        ) : projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-text-muted gap-3">
            <FolderOpen size={40} className="opacity-30" />
            <p>No projects yet.</p>
            <Link href="/admin/projects/new" className="text-accent text-sm underline">Add your first project</Link>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800 text-xs text-text-muted uppercase tracking-wider">
                <th className="text-left px-6 py-4">Project</th>
                <th className="text-left px-4 py-4 hidden md:table-cell">Tech Stack</th>
                <th className="text-left px-4 py-4 hidden sm:table-cell">Links</th>
                <th className="text-left px-4 py-4 hidden sm:table-cell">Status</th>
                <th className="text-right px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {projects.map(project => (
                <tr key={project.id} className="hover:bg-gray-800/40 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="font-medium text-sm text-text-primary flex items-center gap-2">
                      {project.featured && <Star size={12} className="text-yellow-400 fill-yellow-400 shrink-0" />}
                      {project.title}
                    </div>
                    <div className="text-xs text-text-muted line-clamp-1 mt-0.5">{project.description}</div>
                  </td>
                  <td className="px-4 py-4 hidden md:table-cell">
                    <div className="flex flex-wrap gap-1">
                      {(project.tech_stack || []).slice(0, 3).map(t => (
                        <span key={t} className="text-xs bg-gray-800 text-text-secondary px-2 py-0.5 rounded">{t}</span>
                      ))}
                      {(project.tech_stack || []).length > 3 && <span className="text-xs text-text-muted">+{project.tech_stack.length - 3}</span>}
                    </div>
                  </td>
                  <td className="px-4 py-4 hidden sm:table-cell">
                    <div className="flex gap-2">
                      {project.live_url && <a href={project.live_url} target="_blank" className="text-text-muted hover:text-accent transition-colors" title="Live URL"><ExternalLink size={14} /></a>}
                      {project.repo_url && <a href={project.repo_url} target="_blank" className="text-text-muted hover:text-text-primary transition-colors" title="Repo"><Github size={14} /></a>}
                    </div>
                  </td>
                  <td className="px-4 py-4 hidden sm:table-cell">
                    <span className="text-xs px-2 py-1 rounded-full bg-green-500/10 text-green-400">Active</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link href={`/admin/projects/${project.id}/edit`} className="p-1.5 rounded-lg text-text-muted hover:text-blue-400 transition-colors" title="Edit"><Edit2 size={16} /></Link>
                      <button onClick={() => handleDelete(project.id)} className="p-1.5 rounded-lg text-text-muted hover:text-red-400 transition-colors" title="Delete"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
