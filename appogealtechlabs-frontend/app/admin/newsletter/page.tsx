'use client';

import { useEffect, useState } from 'react';
import { Users, Trash2, RefreshCw, Download } from 'lucide-react';
import api from '@/lib/api';

interface Subscriber {
  id: string;
  email: string;
  subscribed_at: string;
  is_active: boolean;
}

export default function AdminNewsletterPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');

  const fetchAll = async () => {
    setLoading(true);
    try { const res = await api.get('/newsletter/subscribers'); setSubscribers(res.data); }
    catch { setError('Failed to load subscribers.'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchAll(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Remove this subscriber?')) return;
    try { await api.delete(`/newsletter/subscribers/${id}`); setSubscribers(s => s.filter(x => x.id !== id)); }
    catch { alert('Failed to remove subscriber.'); }
  };

  const exportCSV = () => {
    const rows = [['Email', 'Subscribed At', 'Active'], ...subscribers.map(s => [s.email, s.subscribed_at, s.is_active ? 'Yes' : 'No'])];
    const csv = rows.map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'subscribers.csv'; a.click();
  };

  const filtered = subscribers.filter(s => s.email.toLowerCase().includes(search.toLowerCase()));
  const active = subscribers.filter(s => s.is_active).length;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Newsletter</h1>
          <p className="text-text-secondary text-sm mt-1">{active} active / {subscribers.length} total subscribers</p>
        </div>
        <div className="flex gap-3">
          <button onClick={fetchAll} className="p-2.5 rounded-xl bg-gray-800 text-text-secondary hover:text-white transition-colors" title="Refresh"><RefreshCw size={18} /></button>
          <button onClick={exportCSV} className="flex items-center gap-2 px-4 py-2.5 bg-gray-800 text-text-secondary hover:text-white rounded-xl text-sm transition-colors">
            <Download size={16} /> Export CSV
          </button>
        </div>
      </div>

      {error && <div className="mb-6 p-4 bg-red-500/10 text-red-400 rounded-xl text-sm">{error}</div>}

      {/* Stats strip */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-bg-secondary border border-gray-800 rounded-2xl p-5">
          <div className="text-2xl font-bold text-green-400">{active}</div>
          <div className="text-xs text-text-muted mt-1">Active Subscribers</div>
        </div>
        <div className="bg-bg-secondary border border-gray-800 rounded-2xl p-5">
          <div className="text-2xl font-bold text-text-secondary">{subscribers.length - active}</div>
          <div className="text-xs text-text-muted mt-1">Unsubscribed</div>
        </div>
        <div className="bg-bg-secondary border border-gray-800 rounded-2xl p-5">
          <div className="text-2xl font-bold text-accent">{subscribers.length}</div>
          <div className="text-xs text-text-muted mt-1">Total (All Time)</div>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by email..." className="w-full max-w-md bg-bg-secondary border border-gray-800 rounded-xl py-2.5 pl-4 pr-4 text-sm text-text-primary focus:border-accent outline-none transition-all" />
      </div>

      <div className="bg-bg-secondary rounded-2xl border border-gray-800 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-24 text-text-muted"><RefreshCw size={24} className="animate-spin mr-3" /> Loading...</div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-text-muted gap-3">
            <Users size={40} className="opacity-30" />
            <p>{search ? 'No subscribers match your search.' : 'No subscribers yet.'}</p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800 text-xs text-text-muted uppercase tracking-wider">
                <th className="text-left px-6 py-4">Email</th>
                <th className="text-left px-4 py-4 hidden sm:table-cell">Subscribed</th>
                <th className="text-left px-4 py-4 hidden md:table-cell">Status</th>
                <th className="text-right px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {filtered.map(sub => (
                <tr key={sub.id} className="hover:bg-gray-800/40 transition-colors group">
                  <td className="px-6 py-3 text-sm text-text-primary font-medium">{sub.email}</td>
                  <td className="px-4 py-3 text-xs text-text-muted hidden sm:table-cell">
                    {new Date(sub.subscribed_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${sub.is_active ? 'bg-green-500/10 text-green-400' : 'bg-gray-700/60 text-text-muted'}`}>
                      {sub.is_active ? 'Active' : 'Unsubscribed'}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-right">
                    <button onClick={() => handleDelete(sub.id)} className="p-1.5 rounded-lg text-text-muted hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100" title="Remove subscriber">
                      <Trash2 size={15} />
                    </button>
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
