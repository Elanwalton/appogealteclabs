'use client';

import { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, RefreshCw, FolderOpen, PlayCircle } from 'lucide-react';
import api from '@/lib/api';

interface Tutorial {
  id: string;
  title: string;
  slug: string;
  description: string;
  duration: string;
  videoUrl: string;
  category: string;
  image: string | null;
  created_at: string;
}

const EMPTY: Omit<Tutorial, 'id' | 'slug' | 'created_at'> = {
  title: '', description: '', duration: '', videoUrl: '', category: 'General', image: ''
};

export default function AdminTutorialsPage() {
  const [tutorials, setTutorials] = useState<Tutorial[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Tutorial | null>(null);
  const [form, setForm] = useState({ ...EMPTY });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const fetchTutorials = async () => {
    setLoading(true);
    try {
      const res = await api.get('/tutorials');
      setTutorials(res.data);
    } catch { setError('Failed to load tutorials.'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchTutorials(); }, []);

  const openNew = () => { setEditing(null); setForm({ ...EMPTY }); setShowModal(true); };
  const openEdit = (t: Tutorial) => {
    setEditing(t);
    setForm({ title: t.title, description: t.description || '', duration: t.duration || '', videoUrl: t.videoUrl || '', category: t.category || '', image: t.image || '' });
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!form.title.trim() || !form.videoUrl.trim()) { setError('Title and Video URL are required.'); return; }
    setSaving(true); setError('');
    try {
      if (editing) { await api.put(`/tutorials/${editing.id}`, form); }
      else { await api.post('/tutorials', form); }
      setShowModal(false);
      fetchTutorials();
    } catch { setError('Save failed. Please try again.'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this tutorial permanently?')) return;
    try { await api.delete(`/tutorials/${id}`); setTutorials(t => t.filter(x => x.id !== id)); }
    catch { alert('Failed to delete tutorial.'); }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Video Tutorials</h1>
          <p className="text-text-secondary text-sm mt-1">{tutorials.length} total tutorials</p>
        </div>
        <div className="flex gap-3">
          <button onClick={fetchTutorials} className="p-2.5 rounded-xl bg-gray-800 text-text-secondary hover:text-white transition-colors" title="Refresh"><RefreshCw size={18} /></button>
          <button onClick={openNew} className="flex items-center gap-2 bg-accent text-bg-primary font-bold px-5 py-2.5 rounded-xl hover:bg-[#00e5c0] transition-colors text-sm">
            <Plus size={18} /> Add New
          </button>
        </div>
      </div>

      {error && <div className="mb-6 p-4 bg-red-500/10 text-red-400 rounded-xl text-sm">{error}</div>}

      <div className="bg-bg-secondary rounded-2xl border border-gray-800 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-24 text-text-muted"><RefreshCw size={24} className="animate-spin mr-3" /> Loading...</div>
        ) : tutorials.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-text-muted gap-3">
            <FolderOpen size={40} className="opacity-30" />
            <p>No tutorials available.</p>
            <button onClick={openNew} className="text-accent text-sm underline">Add the first one</button>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800 text-xs text-text-muted uppercase tracking-wider">
                <th className="text-left px-6 py-4">Tutorial</th>
                <th className="text-left px-4 py-4">Duration</th>
                <th className="text-left px-4 py-4">Category</th>
                <th className="text-right px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {tutorials.map(tut => (
                <tr key={tut.id} className="hover:bg-gray-800/40 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="font-medium text-sm text-text-primary flex items-center gap-2">
                       <PlayCircle size={14} className="text-accent shrink-0" />
                       {tut.title}
                    </div>
                    <div className="text-xs text-text-muted mt-0.5 line-clamp-1">{tut.description}</div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-sm text-text-secondary">{tut.duration}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-sm font-medium px-2 py-0.5 rounded bg-gray-800 text-text-secondary">{tut.category}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => openEdit(tut)} className="p-1.5 rounded-lg text-text-muted hover:text-blue-400 transition-colors" title="Edit"><Edit2 size={16} /></button>
                      <button onClick={() => handleDelete(tut.id)} className="p-1.5 rounded-lg text-text-muted hover:text-red-400 transition-colors" title="Delete"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-bg-secondary border border-gray-700 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-gray-800">
              <h2 className="text-lg font-bold text-text-primary">{editing ? 'Edit Tutorial' : 'New Tutorial'}</h2>
              <button onClick={() => setShowModal(false)} className="text-text-muted hover:text-text-primary transition-colors text-xl">✕</button>
            </div>
            <div className="p-6 space-y-4">
              {error && <div className="p-3 bg-red-500/10 text-red-400 rounded-xl text-sm">{error}</div>}
              
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">Tutorial Title *</label>
                  <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className="w-full bg-bg-primary border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-text-primary focus:border-accent outline-none" placeholder="e.g. Next.js Deployment" />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">Video URL *</label>
                  <input value={form.videoUrl} onChange={e => setForm(f => ({ ...f, videoUrl: e.target.value }))} className="w-full bg-bg-primary border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-text-primary focus:border-accent outline-none" placeholder="https://youtube.com/..." />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">Duration</label>
                  <input value={form.duration} onChange={e => setForm(f => ({ ...f, duration: e.target.value }))} className="w-full bg-bg-primary border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-text-primary focus:border-accent outline-none" placeholder="e.g. 12 min" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">Category</label>
                  <input value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} className="w-full bg-bg-primary border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-text-primary focus:border-accent outline-none" placeholder="e.g. DevOps" />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">Thumbnail Image URL</label>
                  <input value={form.image || ''} onChange={e => setForm(f => ({ ...f, image: e.target.value }))} className="w-full bg-bg-primary border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-text-primary focus:border-accent outline-none" />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">Description</label>
                  <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={3} className="w-full bg-bg-primary border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-text-primary focus:border-accent outline-none resize-none" placeholder="Brief overview of what is covered..." />
                </div>
              </div>
            </div>
            <div className="flex gap-3 p-6 border-t border-gray-800">
              <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 bg-gray-800 text-text-secondary hover:text-text-primary rounded-xl text-sm transition-colors">Cancel</button>
              <button onClick={handleSave} disabled={saving} className="flex-1 py-2.5 bg-accent text-bg-primary font-bold rounded-xl text-sm hover:bg-[#00e5c0] transition-colors disabled:opacity-50">
                {saving ? 'Saving...' : 'Save Tutorial'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
