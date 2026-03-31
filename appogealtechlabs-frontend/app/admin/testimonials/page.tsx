'use client';

import { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, RefreshCw, Star } from 'lucide-react';
import api from '@/lib/api';

interface Testimonial {
  id: string;
  client_name: string;
  client_title: string;
  client_company: string;
  content: string;
  rating: number;
  avatar: string | null;
  is_active: boolean;
  created_at: string;
}

const EMPTY = { client_name: '', client_title: '', client_company: '', content: '', rating: 5, avatar: '' };

export default function AdminTestimonialsPage() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [form, setForm] = useState({ ...EMPTY });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const fetchAll = async () => {
    setLoading(true);
    try { const res = await api.get('/testimonials'); setItems(res.data); }
    catch { setError('Failed to load testimonials.'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchAll(); }, []);

  const openNew = () => { setEditing(null); setForm({ ...EMPTY }); setShowModal(true); };
  const openEdit = (t: Testimonial) => {
    setEditing(t);
    setForm({ client_name: t.client_name, client_title: t.client_title || '', client_company: t.client_company || '', content: t.content, rating: t.rating || 5, avatar: t.avatar || '' });
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!form.client_name.trim() || !form.content.trim()) { setError('Name and testimonial content are required.'); return; }
    setSaving(true); setError('');
    try {
      const payload = { ...form, avatar: form.avatar || null };
      if (editing) { await api.put(`/testimonials/${editing.id}`, payload); }
      else { await api.post('/testimonials', payload); }
      setShowModal(false); fetchAll();
    } catch { setError('Save failed.'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this testimonial?')) return;
    try { await api.delete(`/testimonials/${id}`); setItems(i => i.filter(x => x.id !== id)); }
    catch { alert('Failed to delete.'); }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Testimonials</h1>
          <p className="text-text-secondary text-sm mt-1">{items.length} client testimonials</p>
        </div>
        <div className="flex gap-3">
          <button onClick={fetchAll} className="p-2.5 rounded-xl bg-gray-800 text-text-secondary hover:text-white transition-colors"><RefreshCw size={18} /></button>
          <button onClick={openNew} className="flex items-center gap-2 bg-accent text-bg-primary font-bold px-5 py-2.5 rounded-xl hover:bg-[#00e5c0] transition-colors text-sm">
            <Plus size={18} /> New Testimonial
          </button>
        </div>
      </div>

      {error && <div className="mb-6 p-4 bg-red-500/10 text-red-400 rounded-xl text-sm">{error}</div>}

      {loading ? (
        <div className="flex items-center justify-center py-24 text-text-muted"><RefreshCw size={24} className="animate-spin mr-3" /> Loading...</div>
      ) : items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-text-muted gap-3">
          <Star size={40} className="opacity-30" />
          <p>No testimonials yet.</p>
          <button onClick={openNew} className="text-accent text-sm underline">Add the first one</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {items.map(t => (
            <div key={t.id} className="bg-bg-secondary border border-gray-800 rounded-2xl p-6 group hover:border-gray-600 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} className={i < t.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-700'} />
                  ))}
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => openEdit(t)} className="p-1.5 rounded-lg text-text-muted hover:text-blue-400 transition-colors"><Edit2 size={15} /></button>
                  <button onClick={() => handleDelete(t.id)} className="p-1.5 rounded-lg text-text-muted hover:text-red-400 transition-colors"><Trash2 size={15} /></button>
                </div>
              </div>
              <p className="text-sm text-text-primary leading-relaxed mb-4 line-clamp-3">"{t.content}"</p>
              <div className="border-t border-gray-800 pt-4">
                <div className="font-semibold text-sm text-accent">{t.client_name}</div>
                <div className="text-xs text-text-muted mt-0.5">{t.client_title}{t.client_company ? `, ${t.client_company}` : ''}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-bg-secondary border border-gray-700 rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-gray-800">
              <h2 className="text-lg font-bold text-text-primary">{editing ? 'Edit Testimonial' : 'Add Testimonial'}</h2>
              <button onClick={() => setShowModal(false)} className="text-text-muted hover:text-text-primary text-xl">✕</button>
            </div>
            <div className="p-6 space-y-4">
              {error && <div className="p-3 bg-red-500/10 text-red-400 rounded-xl text-sm">{error}</div>}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">Client Name *</label>
                  <input value={form.client_name} onChange={e => setForm(f => ({ ...f, client_name: e.target.value }))} className="w-full bg-bg-primary border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-text-primary focus:border-accent outline-none" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">Job Title</label>
                  <input value={form.client_title} onChange={e => setForm(f => ({ ...f, client_title: e.target.value }))} className="w-full bg-bg-primary border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-text-primary focus:border-accent outline-none" placeholder="CEO" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">Company</label>
                <input value={form.client_company} onChange={e => setForm(f => ({ ...f, client_company: e.target.value }))} className="w-full bg-bg-primary border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-text-primary focus:border-accent outline-none" placeholder="Company name" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">Testimonial *</label>
                <textarea value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} rows={4} className="w-full bg-bg-primary border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-text-primary focus:border-accent outline-none resize-none" placeholder="What did the client say?" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">Rating</label>
                <div className="flex gap-2">
                  {[1,2,3,4,5].map(n => (
                    <button key={n} onClick={() => setForm(f => ({ ...f, rating: n }))} className="p-1">
                      <Star size={24} className={n <= form.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'} />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1.5">Avatar Image URL</label>
                <input value={form.avatar || ''} onChange={e => setForm(f => ({ ...f, avatar: e.target.value }))} className="w-full bg-bg-primary border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-text-primary focus:border-accent outline-none" placeholder="https://..." />
              </div>
            </div>
            <div className="flex gap-3 p-6 border-t border-gray-800">
              <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 bg-gray-800 text-text-secondary hover:text-text-primary rounded-xl text-sm transition-colors">Cancel</button>
              <button onClick={handleSave} disabled={saving} className="flex-1 py-2.5 bg-accent text-bg-primary font-bold rounded-xl text-sm hover:bg-[#00e5c0] transition-colors disabled:opacity-50">
                {saving ? 'Saving...' : (editing ? 'Save Changes' : 'Add Testimonial')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
