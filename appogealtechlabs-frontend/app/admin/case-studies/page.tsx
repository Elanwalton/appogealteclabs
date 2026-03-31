'use client';

import { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, RefreshCw, FolderOpen } from 'lucide-react';
import api from '@/lib/api';

interface CaseStudy {
  id: string;
  title: string;
  slug: string;
  client: string;
  metric: string;
  industry: string;
  content: string;
  image: string | null;
  created_at: string;
}

const EMPTY: Omit<CaseStudy, 'id' | 'slug' | 'created_at'> = {
  title: '', client: '', metric: '', industry: '', content: '', image: ''
};

export default function AdminCaseStudiesPage() {
  const [studies, setStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<CaseStudy | null>(null);
  const [form, setForm] = useState({ ...EMPTY });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const fetchStudies = async () => {
    setLoading(true);
    try {
      const res = await api.get('/case-studies');
      setStudies(res.data);
    } catch { setError('Failed to load case studies.'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchStudies(); }, []);

  const openNew = () => { setEditing(null); setForm({ ...EMPTY }); setShowModal(true); };
  const openEdit = (s: CaseStudy) => {
    setEditing(s);
    setForm({ title: s.title, client: s.client, metric: s.metric, industry: s.industry || '', content: s.content || '', image: s.image || '' });
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!form.title.trim() || !form.client.trim()) { setError('Title and Client are required.'); return; }
    setSaving(true); setError('');
    try {
      if (editing) { await api.put(`/case-studies/${editing.id}`, form); }
      else { await api.post('/case-studies', form); }
      setShowModal(false);
      fetchStudies();
    } catch { setError('Save failed. Please try again.'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this case study permanently?')) return;
    try { await api.delete(`/case-studies/${id}`); setStudies(s => s.filter(x => x.id !== id)); }
    catch { alert('Failed to delete case study.'); }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Case Studies</h1>
          <p className="text-text-secondary text-sm mt-1">{studies.length} total case studies</p>
        </div>
        <div className="flex gap-3">
          <button onClick={fetchStudies} className="p-2.5 rounded-xl bg-gray-800 text-text-secondary hover:text-white transition-colors" title="Refresh"><RefreshCw size={18} /></button>
          <button onClick={openNew} className="flex items-center gap-2 bg-accent text-bg-primary font-bold px-5 py-2.5 rounded-xl hover:bg-[#00e5c0] transition-colors text-sm">
            <Plus size={18} /> Add New
          </button>
        </div>
      </div>

      {error && <div className="mb-6 p-4 bg-red-500/10 text-red-400 rounded-xl text-sm">{error}</div>}

      <div className="bg-bg-secondary rounded-2xl border border-gray-800 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-24 text-text-muted"><RefreshCw size={24} className="animate-spin mr-3" /> Loading...</div>
        ) : studies.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-text-muted gap-3">
            <FolderOpen size={40} className="opacity-30" />
            <p>No case studies yet.</p>
            <button onClick={openNew} className="text-accent text-sm underline">Add the first one</button>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800 text-xs text-text-muted uppercase tracking-wider">
                <th className="text-left px-6 py-4">Title</th>
                <th className="text-left px-4 py-4">Client</th>
                <th className="text-left px-4 py-4">Metric</th>
                <th className="text-right px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {studies.map(study => (
                <tr key={study.id} className="hover:bg-gray-800/40 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="font-medium text-sm text-text-primary">{study.title}</div>
                    <div className="text-xs text-text-muted">{study.industry}</div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-sm text-text-secondary">{study.client}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-sm font-mono text-accent bg-accent/10 px-2 py-0.5 rounded">{study.metric}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => openEdit(study)} className="p-1.5 rounded-lg text-text-muted hover:text-blue-400 transition-colors" title="Edit"><Edit2 size={16} /></button>
                      <button onClick={() => handleDelete(study.id)} className="p-1.5 rounded-lg text-text-muted hover:text-red-400 transition-colors" title="Delete"><Trash2 size={16} /></button>
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
              <h2 className="text-lg font-bold text-text-primary">{editing ? 'Edit Case Study' : 'New Case Study'}</h2>
              <button onClick={() => setShowModal(false)} className="text-text-muted hover:text-text-primary transition-colors text-xl">✕</button>
            </div>
            <div className="p-6 space-y-4">
              {error && <div className="p-3 bg-red-500/10 text-red-400 rounded-xl text-sm">{error}</div>}
              
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">Project Title *</label>
                  <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className="w-full bg-bg-primary border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-text-primary focus:border-accent outline-none" placeholder="e.g. Scaling Payments Infrastructure..." />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">Client Name *</label>
                  <input value={form.client} onChange={e => setForm(f => ({ ...f, client: e.target.value }))} className="w-full bg-bg-primary border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-text-primary focus:border-accent outline-none" placeholder="e.g. FinTech Innovators" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">Key Metric Highlight</label>
                  <input value={form.metric} onChange={e => setForm(f => ({ ...f, metric: e.target.value }))} className="w-full bg-bg-primary border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-text-primary focus:border-accent outline-none" placeholder="e.g. +300% TPS" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">Industry</label>
                  <input value={form.industry} onChange={e => setForm(f => ({ ...f, industry: e.target.value }))} className="w-full bg-bg-primary border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-text-primary focus:border-accent outline-none" placeholder="e.g. Finance" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">Cover Image URL</label>
                  <input value={form.image || ''} onChange={e => setForm(f => ({ ...f, image: e.target.value }))} className="w-full bg-bg-primary border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-text-primary focus:border-accent outline-none" />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">Full Case Study Content</label>
                  <textarea value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} rows={5} className="w-full bg-bg-primary border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-text-primary focus:border-accent outline-none resize-none" placeholder="Detailed Markdown or Text..." />
                </div>
              </div>
            </div>
            <div className="flex gap-3 p-6 border-t border-gray-800">
              <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 bg-gray-800 text-text-secondary hover:text-text-primary rounded-xl text-sm transition-colors">Cancel</button>
              <button onClick={handleSave} disabled={saving} className="flex-1 py-2.5 bg-accent text-bg-primary font-bold rounded-xl text-sm hover:bg-[#00e5c0] transition-colors disabled:opacity-50">
                {saving ? 'Saving...' : 'Save Case Study'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
