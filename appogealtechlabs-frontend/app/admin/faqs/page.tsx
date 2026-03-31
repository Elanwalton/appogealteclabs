'use client';

import { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, RefreshCw, Users, HelpCircle } from 'lucide-react';
import api from '@/lib/api';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  order_index: number;
  is_active: boolean;
  created_at: string;
}

export default function AdminFAQsPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<FAQ | null>(null);
  const [form, setForm] = useState({ question: '', answer: '', category: 'general', order_index: 99 });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const fetchFaqs = async () => {
    setLoading(true);
    try { 
      const res = await api.get('/faqs'); 
      setFaqs(res.data); 
    }
    catch { setError('Failed to load FAQs.'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchFaqs(); }, []);

  const openNew = () => {
    setEditing(null);
    setForm({ question: '', answer: '', category: 'general', order_index: faqs.length + 1 });
    setShowModal(true);
  };

  const openEdit = (f: FAQ) => {
    setEditing(f);
    setForm({ 
      question: f.question, 
      answer: f.answer, 
      category: f.category || 'general', 
      order_index: f.order_index || 99 
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!form.question.trim()) { setError('Question is required.'); return; }
    if (!form.answer.trim()) { setError('Answer is required.'); return; }
    setSaving(true); setError('');
    try {
      if (editing) { await api.put(`/faqs/${editing.id}`, form); }
      else { await api.post('/faqs', form); }
      setShowModal(false);
      fetchFaqs();
    } catch { setError('Save failed. Please try again.'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this FAQ permanently?')) return;
    try { 
      await api.delete(`/faqs/${id}`); 
      setFaqs(f => f.filter(x => x.id !== id)); 
    }
    catch { alert('Failed to delete.'); }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">FAQs</h1>
          <p className="text-text-secondary text-sm mt-1">Manage Frequently Asked Questions across the site</p>
        </div>
        <div className="flex gap-3">
          <button onClick={fetchFaqs} className="p-2.5 rounded-xl bg-gray-800 text-text-secondary hover:text-white transition-colors"><RefreshCw size={18} /></button>
          <button onClick={openNew} className="flex items-center gap-2 bg-accent text-bg-primary font-bold px-5 py-2.5 rounded-xl hover:bg-[#00e5c0] transition-colors text-sm">
            <Plus size={18} /> New FAQ
          </button>
        </div>
      </div>

      {error && <div className="mb-6 p-4 bg-red-500/10 text-red-400 rounded-xl text-sm">{error}</div>}

      {loading ? (
        <div className="flex items-center justify-center py-24 text-text-muted"><RefreshCw size={24} className="animate-spin mr-3" /> Loading...</div>
      ) : faqs.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-text-muted gap-3">
          <HelpCircle size={40} className="opacity-30" />
          <p>No FAQs added yet.</p>
          <button onClick={openNew} className="text-accent text-sm underline">Add your first FAQ</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 max-w-4xl">
          {faqs.map(faq => (
            <div key={faq.id} className="bg-bg-secondary border border-gray-800 rounded-2xl p-6 group relative hover:border-gray-600 transition-colors">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-bold text-text-primary text-lg leading-tight pr-4">{faq.question}</h3>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  <button onClick={() => openEdit(faq)} className="p-1.5 rounded-lg text-text-muted hover:text-blue-400 transition-colors"><Edit2 size={15} /></button>
                  <button onClick={() => handleDelete(faq.id)} className="p-1.5 rounded-lg text-text-muted hover:text-red-400 transition-colors"><Trash2 size={15} /></button>
                </div>
              </div>
              <p className="text-sm text-text-secondary mb-3">{faq.answer}</p>
              <div className="flex items-center gap-4 text-xs font-mono text-text-muted border-t border-gray-800 pt-3">
                <span className="bg-gray-800 px-2 py-1 rounded text-accent">Category: {faq.category}</span>
                <span>Order: {faq.order_index}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-bg-secondary border border-gray-700 rounded-2xl w-full max-w-xl shadow-2xl">
            <div className="flex justify-between items-center p-6 border-b border-gray-800">
              <h2 className="text-lg font-bold text-text-primary">{editing ? 'Edit FAQ' : 'New FAQ'}</h2>
              <button onClick={() => setShowModal(false)} className="text-text-muted hover:text-text-primary text-xl">✕</button>
            </div>
            
            <div className="p-6 space-y-5">
              {error && <div className="p-3 bg-red-500/10 text-red-400 rounded-xl text-sm">{error}</div>}
              
              <div>
                <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Question *</label>
                <input 
                  value={form.question} 
                  onChange={e => setForm(f => ({ ...f, question: e.target.value }))} 
                  className="w-full bg-bg-primary border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-text-primary focus:border-accent outline-none" 
                  placeholder="e.g. How do you price projects?" 
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Answer *</label>
                <textarea 
                  value={form.answer} 
                  onChange={e => setForm(f => ({ ...f, answer: e.target.value }))} 
                  rows={4} 
                  className="w-full bg-bg-primary border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-text-primary focus:border-accent outline-none resize-none leading-relaxed" 
                  placeholder="Describe the solution..." 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Category</label>
                  <select 
                    value={form.category} 
                    onChange={e => setForm(f => ({ ...f, category: e.target.value }))} 
                    className="w-full bg-bg-primary border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-text-primary focus:border-accent outline-none"
                  >
                    <option value="general">General (FAQ Page)</option>
                    <option value="services">Services</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Display Order</label>
                  <input 
                    type="number" 
                    value={form.order_index} 
                    onChange={e => setForm(f => ({ ...f, order_index: parseInt(e.target.value) || 0 }))} 
                    className="w-full bg-bg-primary border border-gray-700 rounded-xl px-4 py-2.5 text-sm text-text-primary focus:border-accent outline-none" 
                  />
                </div>
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
                {saving ? 'Saving...' : (editing ? 'Save Changes' : 'Create FAQ')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
