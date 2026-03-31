'use client';

import { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, RefreshCw, TrendingUp } from 'lucide-react';
import api from '@/lib/api';

interface PopularProject {
  id: string;
  name: string;
  description: string;
  approximate_price: string;
  order_index: number;
  is_active: boolean;
  created_at: string;
}

export default function AdminPopularProjectsPage() {
  const [projects, setProjects] = useState<PopularProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<PopularProject | null>(null);
  const [form, setForm] = useState({ name: '', description: '', approximate_price: '', order_index: 99 });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const fetchProjects = async () => {
    setLoading(true);
    try { 
      const res = await api.get('/popular-projects'); 
      setProjects(res.data); 
    }
    catch { setError('Failed to load popular projects.'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchProjects(); }, []);

  const openNew = () => {
    setEditing(null);
    setForm({ name: '', description: '', approximate_price: '', order_index: projects.length + 1 });
    setShowModal(true);
  };

  const openEdit = (p: PopularProject) => {
    setEditing(p);
    setForm({ 
      name: p.name, 
      description: p.description, 
      approximate_price: p.approximate_price || '', 
      order_index: p.order_index || 99 
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!form.name.trim()) { setError('Project name is required.'); return; }
    if (!form.approximate_price.trim()) { setError('Approximate price is required.'); return; }
    setSaving(true); setError('');
    try {
      if (editing) { await api.put(`/popular-projects/${editing.id}`, form); }
      else { await api.post('/popular-projects', form); }
      setShowModal(false);
      fetchProjects();
    } catch { setError('Save failed. Please try again.'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this project permanently?')) return;
    try { 
      await api.delete(`/popular-projects/${id}`); 
      setProjects(p => p.filter(x => x.id !== id)); 
    }
    catch { alert('Failed to delete.'); }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Popular Projects</h1>
          <p className="text-text-secondary text-sm mt-1">Manage the top 10 most requested client projects</p>
        </div>
        <div className="flex gap-3">
          <button onClick={fetchProjects} className="p-2.5 rounded-xl bg-gray-800 text-text-secondary hover:text-white transition-colors"><RefreshCw size={18} /></button>
          <button onClick={openNew} className="flex items-center gap-2 bg-accent text-bg-primary font-bold px-5 py-2.5 rounded-xl hover:bg-[#00e5c0] transition-colors text-sm">
            <Plus size={18} /> New Project
          </button>
        </div>
      </div>

      {error && <div className="mb-6 p-4 bg-red-500/10 text-red-400 rounded-xl text-sm">{error}</div>}

      {loading ? (
        <div className="flex items-center justify-center py-24 text-text-muted"><RefreshCw size={24} className="animate-spin mr-3" /> Loading...</div>
      ) : projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-text-muted gap-3">
          <TrendingUp size={40} className="opacity-30" />
          <p>No popular projects added yet.</p>
          <button onClick={openNew} className="text-accent text-sm underline">Add your first project</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {projects.map(project => (
            <div key={project.id} className="bg-bg-secondary border border-gray-800 rounded-2xl p-6 group relative hover:border-gray-600 transition-colors flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-bold text-text-primary text-xl leading-tight pr-4">{project.name}</h3>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    <button onClick={() => openEdit(project)} className="p-1.5 rounded-lg text-text-muted hover:text-blue-400 transition-colors"><Edit2 size={15} /></button>
                    <button onClick={() => handleDelete(project.id)} className="p-1.5 rounded-lg text-text-muted hover:text-red-400 transition-colors"><Trash2 size={15} /></button>
                  </div>
                </div>
                <p className="text-sm text-text-secondary line-clamp-3 mb-4">{project.description}</p>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-gray-800">
                <div className="text-sm font-semibold text-accent">{project.approximate_price}</div>
                <div className="text-xs text-text-muted font-mono">Order: {project.order_index}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-bg-secondary border border-gray-700 rounded-2xl w-full max-w-xl shadow-2xl">
            <div className="flex justify-between items-center p-6 border-b border-gray-800">
              <h2 className="text-lg font-bold text-text-primary">{editing ? 'Edit Popular Project' : 'New Popular Project'}</h2>
              <button onClick={() => setShowModal(false)} className="text-text-muted hover:text-text-primary text-xl">✕</button>
            </div>
            
            <div className="p-6 space-y-5">
              {error && <div className="p-3 bg-red-500/10 text-red-400 rounded-xl text-sm">{error}</div>}
              
              <div>
                <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Project Name *</label>
                <input 
                  value={form.name} 
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))} 
                  className="w-full bg-bg-primary border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-text-primary focus:border-accent outline-none" 
                  placeholder="e.g. E-Commerce Platform" 
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Approximate Price *</label>
                <input 
                  value={form.approximate_price} 
                  onChange={e => setForm(f => ({ ...f, approximate_price: e.target.value }))} 
                  className="w-full bg-bg-primary border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-text-primary focus:border-accent outline-none" 
                  placeholder="e.g. Ksh 150,000" 
                />
              </div>

              <div className="w-1/3">
                <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Display Order</label>
                <input 
                  type="number" 
                  value={form.order_index} 
                  onChange={e => setForm(f => ({ ...f, order_index: parseInt(e.target.value) || 0 }))} 
                  className="w-full bg-bg-primary border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-text-primary focus:border-accent outline-none" 
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Description</label>
                <textarea 
                  value={form.description} 
                  onChange={e => setForm(f => ({ ...f, description: e.target.value }))} 
                  rows={4} 
                  className="w-full bg-bg-primary border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-text-primary focus:border-accent outline-none resize-none leading-relaxed" 
                  placeholder="Describe the platform features and use-case..." 
                />
              </div>
            </div>

            <div className="flex gap-3 p-6 border-t border-gray-800">
              <button 
                onClick={() => setShowModal(false)} 
                className="flex-1 py-2.5 bg-gray-800 text-text-secondary hover:text-text-primary rounded-xl text-sm font-medium transition-colors"
                disabled={saving}
              >
                Cancel
              </button>
              <button 
                onClick={handleSave} 
                disabled={saving} 
                className="flex-1 py-2.5 bg-accent text-bg-primary font-bold rounded-xl text-sm hover:bg-[#00e5c0] transition-colors disabled:opacity-50"
              >
                {saving ? 'Saving...' : (editing ? 'Save Changes' : 'Create Project')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
