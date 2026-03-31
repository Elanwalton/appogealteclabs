'use client';

import { useEffect, useState } from 'react';
import { Mail, Trash2, RefreshCw, CheckCircle, Circle, ChevronDown, ChevronUp } from 'lucide-react';
import api from '@/lib/api';

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  service: string | null;
  message: string;
  is_read: boolean;
  submitted_at: string;
}

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expanded, setExpanded] = useState<string | null>(null);

  const fetchAll = async () => {
    setLoading(true);
    try { const res = await api.get('/inquiries'); setInquiries(res.data); }
    catch { setError('Failed to load inquiries.'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchAll(); }, []);

  const markRead = async (id: string, is_read: boolean) => {
    if (is_read) return; // already read
    try {
      await api.put(`/inquiries/${id}/read`);
      setInquiries(prev => prev.map(i => i.id === id ? { ...i, is_read: true } : i));
    } catch { alert('Failed to mark as read.'); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this inquiry permanently?')) return;
    try { await api.delete(`/inquiries/${id}`); setInquiries(i => i.filter(x => x.id !== id)); }
    catch { alert('Failed to delete.'); }
  };

  const toggleExpand = (id: string) => {
    setExpanded(prev => prev === id ? null : id);
    // Auto-mark as read when opened
    const inq = inquiries.find(i => i.id === id);
    if (inq && !inq.is_read) markRead(id, false);
  };

  const unreadCount = inquiries.filter(i => !i.is_read).length;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-text-primary flex items-center gap-3">
            Inquiries
            {unreadCount > 0 && (
              <span className="text-sm font-medium bg-accent text-bg-primary px-2.5 py-0.5 rounded-full">{unreadCount} new</span>
            )}
          </h1>
          <p className="text-text-secondary text-sm mt-1">{inquiries.length} total inquiries</p>
        </div>
        <button onClick={fetchAll} className="p-2.5 rounded-xl bg-gray-800 text-text-secondary hover:text-white transition-colors"><RefreshCw size={18} /></button>
      </div>

      {error && <div className="mb-6 p-4 bg-red-500/10 text-red-400 rounded-xl text-sm">{error}</div>}

      {loading ? (
        <div className="flex items-center justify-center py-24 text-text-muted"><RefreshCw size={24} className="animate-spin mr-3" /> Loading...</div>
      ) : inquiries.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-text-muted gap-3">
          <Mail size={40} className="opacity-30" />
          <p>No inquiries yet. They'll appear here when clients contact you.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {inquiries.map(inq => (
            <div
              key={inq.id}
              className={`bg-bg-secondary border rounded-2xl overflow-hidden transition-colors ${!inq.is_read ? 'border-accent/40' : 'border-gray-800'}`}
            >
              <div
                className="flex items-center gap-4 px-6 py-4 cursor-pointer hover:bg-gray-800/40 transition-colors"
                onClick={() => toggleExpand(inq.id)}
              >
                <div className="shrink-0">
                  {inq.is_read
                    ? <CheckCircle size={18} className="text-text-muted" />
                    : <Circle size={18} className="text-accent" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3">
                    <span className={`text-sm font-semibold ${!inq.is_read ? 'text-text-primary' : 'text-text-secondary'}`}>{inq.name}</span>
                    {inq.service && <span className="text-xs bg-accent/10 text-accent px-2 py-0.5 rounded-full">{inq.service}</span>}
                    {!inq.is_read && <span className="text-xs bg-accent/20 text-accent px-2 py-0.5 rounded-full font-medium">New</span>}
                  </div>
                  <div className="text-xs text-text-muted mt-0.5 truncate">{inq.email} {inq.phone && `· ${inq.phone}`}</div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs text-text-muted hidden sm:block">
                    {new Date(inq.submitted_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                  <button onClick={e => { e.stopPropagation(); handleDelete(inq.id); }} className="p-1.5 rounded-lg text-text-muted hover:text-red-400 transition-colors">
                    <Trash2 size={15} />
                  </button>
                  {expanded === inq.id ? <ChevronUp size={16} className="text-text-muted" /> : <ChevronDown size={16} className="text-text-muted" />}
                </div>
              </div>
              {expanded === inq.id && (
                <div className="px-6 pb-6 border-t border-gray-800">
                  <p className="text-sm text-text-secondary leading-relaxed whitespace-pre-wrap mt-4 bg-bg-primary rounded-xl p-4 border border-gray-800">
                    {inq.message}
                  </p>
                  <a href={`mailto:${inq.email}`} className="inline-block mt-4 text-xs text-accent hover:underline">Reply to {inq.email}</a>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
