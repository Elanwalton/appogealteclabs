'use client';

import { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, RefreshCw, Users } from 'lucide-react';
import api from '@/lib/api';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  order_index: number;
}

export default function AdminTeamPage() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<TeamMember | null>(null);
  const [form, setForm] = useState({ name: '', role: '', bio: '', image: '', order_index: 99 });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const fetchTeam = async () => {
    setLoading(true);
    try { 
      const res = await api.get('/team'); 
      setMembers(res.data); 
    }
    catch { setError('Failed to load team.'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchTeam(); }, []);

  const openNew = () => {
    setEditing(null);
    setForm({ name: '', role: '', bio: '', image: '', order_index: members.length + 1 });
    setShowModal(true);
  };

  const openEdit = (m: TeamMember) => {
    setEditing(m);
    setForm({ 
      name: m.name, 
      role: m.role, 
      bio: m.bio || '', 
      image: m.image || '', 
      order_index: m.order_index || 99 
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!form.name.trim()) { setError('Name is required.'); return; }
    setSaving(true); setError('');
    try {
      if (editing) { await api.put(`/team/${editing.id}`, form); }
      else { await api.post('/team', form); }
      setShowModal(false);
      fetchTeam();
    } catch { setError('Save failed.'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this member permanently?')) return;
    try { 
      await api.delete(`/team/${id}`); 
      setMembers(m => m.filter(x => x.id !== id)); 
    }
    catch { alert('Failed to delete.'); }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Team Members</h1>
          <p className="text-text-secondary text-sm mt-1">Manage your team profiles on the About Us page</p>
        </div>
        <div className="flex gap-3">
          <button onClick={fetchTeam} className="p-2.5 rounded-xl bg-gray-800 text-text-secondary hover:text-white transition-colors"><RefreshCw size={18} /></button>
          <button onClick={openNew} className="flex items-center gap-2 bg-accent text-bg-primary font-bold px-5 py-2.5 rounded-xl hover:bg-[#00e5c0] transition-colors text-sm">
            <Plus size={18} /> New Member
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-24 text-text-muted"><RefreshCw size={24} className="animate-spin mr-3" /> Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {members.map(member => (
            <div key={member.id} className="bg-bg-secondary border border-gray-800 rounded-2xl p-6 group relative hover:border-gray-600 transition-colors text-center">
              <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                <button onClick={() => openEdit(member)} className="p-1.5 bg-gray-900 rounded-lg text-text-muted hover:text-blue-400 border border-gray-800"><Edit2 size={13} /></button>
                <button onClick={() => handleDelete(member.id)} className="p-1.5 bg-gray-900 rounded-lg text-text-muted hover:text-red-400 border border-gray-800"><Trash2 size={13} /></button>
              </div>
              <img src={member.image || '/team/placeholder.jpg'} alt={member.name} className="w-24 h-24 rounded-full mx-auto object-cover border-2 border-gray-700 mb-4" />
              <h3 className="font-bold text-text-primary text-lg">{member.name}</h3>
              <p className="text-accent text-sm font-mono mb-2">{member.role}</p>
              <p className="text-sm text-text-secondary line-clamp-2">{member.bio}</p>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-bg-secondary border border-gray-700 rounded-2xl w-full max-w-xl">
            <div className="flex justify-between items-center p-6 border-b border-gray-800">
              <h2 className="text-lg font-bold text-text-primary">{editing ? 'Edit Member' : 'New Member'}</h2>
              <button onClick={() => setShowModal(false)} className="text-text-muted text-xl">✕</button>
            </div>
            
            <div className="p-6 space-y-4">
              {error && <div className="p-3 bg-red-500/10 text-red-400 rounded-xl text-sm">{error}</div>}
              <div>
                <label className="block text-xs font-semibold text-text-muted mb-2">Image URL</label>
                <input value={form.image} onChange={e => setForm(f => ({ ...f, image: e.target.value }))} className="w-full bg-bg-primary border border-gray-700 rounded-xl px-4 py-2.5 text-sm" placeholder="/team/name.jpg" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-text-muted mb-2">Name *</label>
                  <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="w-full bg-bg-primary border border-gray-700 rounded-xl px-4 py-2.5 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-text-muted mb-2">Role *</label>
                  <input value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))} className="w-full bg-bg-primary border border-gray-700 rounded-xl px-4 py-2.5 text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-text-muted mb-2">Bio</label>
                <textarea value={form.bio} onChange={e => setForm(f => ({ ...f, bio: e.target.value }))} rows={3} className="w-full bg-bg-primary border border-gray-700 rounded-xl px-4 py-2.5 text-sm" />
              </div>
              <div className="w-1/3">
                <label className="block text-xs font-semibold text-text-muted mb-2">Order</label>
                <input type="number" value={form.order_index} onChange={e => setForm(f => ({ ...f, order_index: parseInt(e.target.value) || 0 }))} className="w-full bg-bg-primary border border-gray-700 rounded-xl px-4 py-2.5 text-sm" />
              </div>
            </div>

            <div className="flex gap-3 p-6 border-t border-gray-800">
              <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 bg-gray-800 text-text-secondary rounded-xl text-sm">Cancel</button>
              <button onClick={handleSave} disabled={saving} className="flex-1 py-2.5 bg-accent text-bg-primary font-bold rounded-xl text-sm hover:bg-[#00e5c0]">{saving ? 'Saving...' : 'Save'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
