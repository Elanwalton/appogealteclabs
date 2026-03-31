'use client';

import { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, RefreshCw, Briefcase } from 'lucide-react';
import api from '@/lib/api';

interface ServicePackage {
  name: string;
  price: string;
  features: any[];
}

interface Service {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  packages: ServicePackage[];
  is_active: boolean;
  created_at: string;
}

const EMPTY_PACKAGE: ServicePackage = { name: '', price: '', features: [] };

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Service | null>(null);
  const [form, setForm] = useState({ name: '', description: '', icon: '', packages: [{ ...EMPTY_PACKAGE }] });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const fetchServices = async () => {
    setLoading(true);
    try { const res = await api.get('/services'); setServices(res.data); }
    catch { setError('Failed to load services.'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchServices(); }, []);

  const openNew = () => {
    setEditing(null);
    setForm({ name: '', description: '', icon: '', packages: [{ ...EMPTY_PACKAGE }] });
    setShowModal(true);
  };

  const openEdit = (s: Service) => {
    setEditing(s);
    setForm({ name: s.name, description: s.description, icon: s.icon || '', packages: s.packages?.length ? s.packages : [{ ...EMPTY_PACKAGE }] });
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!form.name.trim()) { setError('Service name is required.'); return; }
    setSaving(true); setError('');
    try {
      if (editing) { await api.put(`/services/${editing.id}`, form); }
      else { await api.post('/services', form); }
      setShowModal(false);
      fetchServices();
    } catch { setError('Save failed. Please try again.'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this service permanently?')) return;
    try { await api.delete(`/services/${id}`); setServices(s => s.filter(x => x.id !== id)); }
    catch { alert('Failed to delete.'); }
  };

  const updatePackage = (i: number, key: keyof ServicePackage, val: any) => {
    setForm(f => {
      const pkgs = [...f.packages];
      pkgs[i] = { ...pkgs[i], [key]: val };
      return { ...f, packages: pkgs };
    });
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Services</h1>
          <p className="text-text-secondary text-sm mt-1">{services.length} services offered</p>
        </div>
        <div className="flex gap-3">
          <button onClick={fetchServices} className="p-2.5 rounded-xl bg-gray-800 text-text-secondary hover:text-white transition-colors"><RefreshCw size={18} /></button>
          <button onClick={openNew} className="flex items-center gap-2 bg-accent text-bg-primary font-bold px-5 py-2.5 rounded-xl hover:bg-[#00e5c0] transition-colors text-sm">
            <Plus size={18} /> New Service
          </button>
        </div>
      </div>

      {error && <div className="mb-6 p-4 bg-red-500/10 text-red-400 rounded-xl text-sm">{error}</div>}

      {loading ? (
        <div className="flex items-center justify-center py-24 text-text-muted"><RefreshCw size={24} className="animate-spin mr-3" /> Loading...</div>
      ) : services.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-text-muted gap-3">
          <Briefcase size={40} className="opacity-30" />
          <p>No services yet.</p>
          <button onClick={openNew} className="text-accent text-sm underline">Add your first service</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {services.map(service => (
            <div key={service.id} className="bg-bg-secondary border border-gray-800 rounded-2xl p-6 group relative hover:border-gray-600 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="text-3xl">{service.icon || '⚙️'}</div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => openEdit(service)} className="p-1.5 rounded-lg text-text-muted hover:text-blue-400 transition-colors"><Edit2 size={15} /></button>
                  <button onClick={() => handleDelete(service.id)} className="p-1.5 rounded-lg text-text-muted hover:text-red-400 transition-colors"><Trash2 size={15} /></button>
                </div>
              </div>
              <h3 className="font-bold text-text-primary mb-1">{service.name}</h3>
              <p className="text-sm text-text-secondary line-clamp-2 mb-3">{service.description}</p>
              <div className="text-xs text-text-muted">{service.packages?.length || 0} pricing package{service.packages?.length !== 1 ? 's' : ''}</div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-bg-secondary border border-gray-700 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-gray-800">
              <h2 className="text-lg font-bold text-text-primary">{editing ? 'Edit Service' : 'New Service'}</h2>
              <button onClick={() => setShowModal(false)} className="text-text-muted hover:text-text-primary text-xl">✕</button>
            </div>
            <div className="p-6 space-y-4">
              {error && <div className="p-3 bg-red-500/10 text-red-400 rounded-xl text-sm">{error}</div>}
              <div className="grid grid-cols-4 gap-4">
                <div className="col-span-1">
                  <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Icon</label>
                  <input value={form.icon} onChange={e => setForm(f => ({ ...f, icon: e.target.value }))} className="w-full bg-bg-primary border border-gray-700 rounded-xl px-4 py-3 text-center text-3xl focus:border-accent outline-none" placeholder="🚀" />
                </div>
                <div className="col-span-3">
                  <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Name *</label>
                  <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="w-full bg-bg-primary border border-gray-700 rounded-xl px-4 py-3 text-base text-text-primary focus:border-accent outline-none" placeholder="e.g. Web Development" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-2">Description</label>
                <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={4} className="w-full bg-bg-primary border border-gray-700 rounded-xl px-4 py-3 text-base text-text-primary focus:border-accent outline-none resize-none" placeholder="Describe this service..." />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider">Pricing Packages</label>
                  <button onClick={() => setForm(f => ({ ...f, packages: [...f.packages, { ...EMPTY_PACKAGE }] }))} className="text-xs text-accent hover:underline">+ Add Package</button>
                </div>
                {form.packages.map((pkg, i) => (
                  <div key={i} className="bg-bg-primary border border-gray-700 rounded-xl p-5 mb-4 space-y-4 shadow-sm">
                    <div className="grid grid-cols-2 gap-4">
                      <input value={pkg.name} onChange={e => updatePackage(i, 'name', e.target.value)} className="bg-bg-secondary border border-gray-700 rounded-xl px-4 py-3 text-base text-text-primary focus:border-accent outline-none" placeholder="Package name (e.g. Starter)" />
                      <input value={pkg.price} onChange={e => updatePackage(i, 'price', e.target.value)} className="bg-bg-secondary border border-gray-700 rounded-xl px-4 py-3 text-base text-text-primary focus:border-accent outline-none" placeholder="Price (e.g. KES 25,000)" />
                    </div>
                    <textarea value={(pkg.features || []).map((f: any) => typeof f === 'object' ? (f.included === false ? `- ${f.text}` : f.text) : f).join('\n')} onChange={e => updatePackage(i, 'features', e.target.value.split('\n').map(text => { const isExcluded = text.trim().startsWith('-'); return { text: isExcluded ? text.replace(/^-+\s*/, '') : text.trim(), included: !isExcluded }; }))} rows={8} className="w-full bg-bg-secondary border border-gray-700 rounded-xl px-4 py-3 text-sm leading-relaxed text-text-primary focus:border-accent outline-none resize-vertical" placeholder="Features (Prefix with '-' to show crossed out)" />
                    {form.packages.length > 1 && <button onClick={() => setForm(f => ({ ...f, packages: f.packages.filter((_, j) => j !== i) }))} className="text-sm text-red-400 hover:text-red-300 transition-colors font-medium">Remove package</button>}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-3 p-6 border-t border-gray-800">
              <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 bg-gray-800 text-text-secondary hover:text-text-primary rounded-xl text-sm transition-colors">Cancel</button>
              <button onClick={handleSave} disabled={saving} className="flex-1 py-2.5 bg-accent text-bg-primary font-bold rounded-xl text-sm hover:bg-[#00e5c0] transition-colors disabled:opacity-50">
                {saving ? 'Saving...' : (editing ? 'Save Changes' : 'Create Service')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
