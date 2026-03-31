'use client';

import { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, RefreshCw, FolderOpen, FileText } from 'lucide-react';
import api from '@/lib/api';

interface Doc {
  id: string;
  title: string;
  slug: string;
  content: string;
  category: string;
  order: number;
  created_at: string;
}

const EMPTY: Omit<Doc, 'id' | 'slug' | 'created_at'> = {
  title: '', content: '', category: 'Getting Started', order: 0
};

export default function AdminDocumentationPage() {
  const [docs, setDocs] = useState<Doc[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Doc | null>(null);
  const [form, setForm] = useState({ ...EMPTY });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const fetchDocs = async () => {
    setLoading(true);
    try {
      const res = await api.get('/documentation');
      setDocs(res.data);
    } catch { setError('Failed to load documentation logs.'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchDocs(); }, []);

  const openNew = () => { setEditing(null); setForm({ ...EMPTY, order: docs.length }); setShowModal(true); };
  const openEdit = (d: Doc) => {
    setEditing(d);
    setForm({ title: d.title, content: d.content || '', category: d.category || 'General', order: d.order || 0 });
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!form.title.trim() || !form.category.trim()) { setError('Title and Category are required.'); return; }
    setSaving(true); setError('');
    try {
      if (editing) { await api.put(`/documentation/${editing.id}`, form); }
      else { await api.post('/documentation', form); }
      setShowModal(false);
      fetchDocs();
    } catch { setError('Save failed. Please try again.'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this documentation page permanently?')) return;
    try { await api.delete(`/documentation/${id}`); setDocs(d => d.filter(x => x.id !== id)); }
    catch { alert('Failed to delete doc.'); }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Documentation</h1>
          <p className="text-text-secondary text-sm mt-1">{docs.length} total pages</p>
        </div>
        <div className="flex gap-3">
          <button onClick={fetchDocs} className="p-2.5 rounded-xl bg-gray-800 text-text-secondary hover:text-white transition-colors" title="Refresh"><RefreshCw size={18} /></button>
          <button onClick={openNew} className="flex items-center gap-2 bg-accent text-bg-primary font-bold px-5 py-2.5 rounded-xl hover:bg-[#00e5c0] transition-colors text-sm">
            <Plus size={18} /> Add New
          </button>
        </div>
      </div>

      {error && <div className="mb-6 p-4 bg-red-500/10 text-red-400 rounded-xl text-sm">{error}</div>}

      <div className="bg-bg-secondary rounded-2xl border border-gray-800 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-24 text-text-muted"><RefreshCw size={24} className="animate-spin mr-3" /> Loading...</div>
        ) : docs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-text-muted gap-3">
            <FolderOpen size={40} className="opacity-30" />
            <p>No documentation written yet.</p>
            <button onClick={openNew} className="text-accent text-sm underline">Add the first page</button>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800 text-xs text-text-muted uppercase tracking-wider">
                <th className="text-left px-6 py-4">Title</th>
                <th className="text-left px-4 py-4">Category</th>
                <th className="text-left px-4 py-4">Order</th>
                <th className="text-right px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {docs.sort((a,b) => a.order - b.order).map(doc => (
                <tr key={doc.id} className="hover:bg-gray-800/40 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="font-medium text-sm text-text-primary flex items-center gap-2">
                       <FileText size={14} className="text-accent shrink-0" />
                       {doc.title}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-xs bg-gray-800 text-text-secondary px-2 py-0.5 rounded">{doc.category}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-sm text-text-muted">{doc.order}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => openEdit(doc)} className="p-1.5 rounded-lg text-text-muted hover:text-blue-400 transition-colors" title="Edit"><Edit2 size={16} /></button>
                      <button onClick={() => handleDelete(doc.id)} className="p-1.5 rounded-lg text-text-muted hover:text-red-400 transition-colors" title="Delete"><Trash2 size={16} /></button>
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
              <h2 className="text-lg font-bold text-text-primary">{editing ? 'Edit Page' : 'New Page'}</h2>
              <button onClick={() => setShowModal(false)} className="text-text-muted hover:text-text-primary transition-colors text-xl">✕</button>
            </div>
            <div className="p-6 space-y-4">
              {error && <div className="p-3 bg-red-500/10 text-red-400 rounded-xl text-sm">{error}</div>}
              
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">Page Title *</label>
                  <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className="w-full bg-bg-primary border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-text-primary focus:border-accent outline-none" placeholder="e.g. Authentication Setup" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">Category *</label>
                  <input value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} className="w-full bg-bg-primary border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-text-primary focus:border-accent outline-none" placeholder="e.g. API Reference" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">Sort Order</label>
                  <input type="number" value={form.order} onChange={e => setForm(f => ({ ...f, order: parseInt(e.target.value) || 0 }))} className="w-full bg-bg-primary border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-text-primary focus:border-accent outline-none" />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">Page Content (Markdown)</label>
                  <textarea value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} rows={12} className="w-full font-mono text-xs bg-bg-primary border border-gray-700 rounded-xl px-4 py-2.5 text-text-primary focus:border-accent outline-none resize-none" placeholder="# Authentication\n\nTo authenticate..."></textarea>
                </div>
              </div>
            </div>
            <div className="flex gap-3 p-6 border-t border-gray-800">
              <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 bg-gray-800 text-text-secondary hover:text-text-primary rounded-xl text-sm transition-colors">Cancel</button>
              <button onClick={handleSave} disabled={saving} className="flex-1 py-2.5 bg-accent text-bg-primary font-bold rounded-xl text-sm hover:bg-[#00e5c0] transition-colors disabled:opacity-50">
                {saving ? 'Saving...' : 'Save Page'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
