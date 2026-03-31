'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Save, ArrowLeft, Plus, Trash2 } from 'lucide-react';
import api from '@/lib/api';
import Link from 'next/link';

export default function ProjectForm({ projectId }: { projectId?: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(!!projectId);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  // Complex default state
  const [form, setForm] = useState<any>({
    title: '', tagline: '', description: '',
    image: '', heroImage: '', category: 'Development',
    tags: [], duration: '', teamSize: 1, completedDate: '', overview: '',
    liveUrl: '', repoUrl: '', featured: false,
    
    client: { name: '', industry: '', location: '', logo: '', website: '' },
    
    challenge: { title: 'The Challenge', description: '', problems: [], image: '' },
    
    solution: { 
      title: 'Our Solution', description: '', 
      approach: [], features: [], images: [] 
    },
    
    techStack: { frontend: [], backend: [], infrastructure: [], tools: [] },
    
    results: { title: 'The Results', description: '', metrics: [], outcomes: [], image: '' },
    
    testimonial: { text: '', author: { name: '', position: '', company: '', avatar: '' }, rating: 5 },
    relatedProjects: []
  });

  useEffect(() => {
    if (projectId) {
      api.get(`/projects/${projectId}`)
         .then(res => {
           // Merge with defaults to ensure nested objects exist
           setForm((prev: any) => ({
             ...prev,
             ...res.data,
             client: { ...prev.client, ...(res.data.client || {}) },
             challenge: { ...prev.challenge, ...(res.data.challenge || {}) },
             solution: { ...prev.solution, ...(res.data.solution || {}) },
             techStack: { ...prev.techStack, ...(res.data.techStack || {}) },
             results: { ...prev.results, ...(res.data.results || {}) },
             testimonial: { ...prev.testimonial, ...(res.data.testimonial || {}) }
           }));
         })
         .catch(err => setError('Failed to load project details'))
         .finally(() => setLoading(false));
    }
  }, [projectId]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      if (projectId) {
        await api.put(`/projects/${projectId}`, form);
      } else {
        await api.post('/projects', form);
      }
      router.push('/admin/projects');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to save project');
    } finally {
      setSaving(false);
    }
  };

  const handleNestedChange = (category: string, field: string, value: any) => {
    setForm((f: any) => ({
      ...f,
      [category]: {
        ...f[category],
        [field]: value
      }
    }));
  };

  const handleArrayStringChange = (category: string, field: string, index: number, value: string) => {
    setForm((f: any) => {
      const newArray = [...f[category][field]];
      newArray[index] = value;
      return { ...f, [category]: { ...f[category], [field]: newArray } };
    });
  };

  const addArrayString = (category: string, field: string) => {
    setForm((f: any) => ({
      ...f,
      [category]: { ...f[category], [field]: [...(f[category][field] || []), ''] }
    }));
  };

  const removeArrayString = (category: string, field: string, index: number) => {
    setForm((f: any) => {
      const newArray = [...f[category][field]];
      newArray.splice(index, 1);
      return { ...f, [category]: { ...f[category], [field]: newArray } };
    });
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto p-6 md:p-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/admin/projects" className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
            <ArrowLeft size={20} className="text-text-muted" />
          </Link>
          <h1 className="text-3xl font-bold text-text-primary">
            {projectId ? 'Edit Project' : 'New Project'}
          </h1>
        </div>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 bg-accent text-bg-primary px-6 py-2.5 rounded-xl font-bold hover:bg-[#00e5c0] transition-colors disabled:opacity-50"
        >
          <Save size={18} />
          {saving ? 'Saving...' : 'Save Project'}
        </button>
      </div>

      {error && <div className="mb-6 p-4 bg-red-500/10 text-red-400 rounded-xl">{error}</div>}

      <form onSubmit={handleSave} className="space-y-8">
        
        {/* Basic Info */}
        <div className="bg-bg-secondary border border-gray-800 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-text-primary mb-6">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-text-muted mb-2">Project Title *</label>
              <input required value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="w-full bg-bg-primary border border-gray-700 rounded-xl px-4 py-2.5 text-text-primary focus:border-accent outline-none" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-text-muted mb-2">Tagline</label>
              <input value={form.tagline} onChange={e => setForm({...form, tagline: e.target.value})} className="w-full bg-bg-primary border border-gray-700 rounded-xl px-4 py-2.5 text-text-primary focus:border-accent outline-none" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-text-muted mb-2">Short Description</label>
              <textarea value={form.description} onChange={e => setForm({...form, description: e.target.value})} rows={2} className="w-full bg-bg-primary border border-gray-700 rounded-xl px-4 py-2.5 text-text-primary focus:border-accent outline-none" />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-text-muted mb-2">Thumbnail Image URL</label>
              <input value={form.image} onChange={e => setForm({...form, image: e.target.value})} className="w-full bg-bg-primary border border-gray-700 rounded-xl px-4 py-2.5 text-text-primary focus:border-accent outline-none" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-text-muted mb-2">Hero Image URL</label>
              <input value={form.heroImage} onChange={e => setForm({...form, heroImage: e.target.value})} className="w-full bg-bg-primary border border-gray-700 rounded-xl px-4 py-2.5 text-text-primary focus:border-accent outline-none" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-text-muted mb-2">Category</label>
              <input value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="w-full bg-bg-primary border border-gray-700 rounded-xl px-4 py-2.5 text-text-primary focus:border-accent outline-none" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-text-muted mb-2">Duration</label>
              <input value={form.duration} onChange={e => setForm({...form, duration: e.target.value})} className="w-full bg-bg-primary border border-gray-700 rounded-xl px-4 py-2.5 text-text-primary focus:border-accent outline-none" />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-text-muted mb-2">Team Size</label>
              <input type="number" value={form.teamSize} onChange={e => setForm({...form, teamSize: parseInt(e.target.value)})} className="w-full bg-bg-primary border border-gray-700 rounded-xl px-4 py-2.5 text-text-primary focus:border-accent outline-none" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-text-muted mb-2">Completed Date</label>
              <input type="date" value={form.completedDate ? new Date(form.completedDate).toISOString().split('T')[0] : ''} onChange={e => setForm({...form, completedDate: e.target.value})} className="w-full bg-bg-primary border border-gray-700 rounded-xl px-4 py-2.5 text-text-primary focus:border-accent outline-none" />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-text-muted mb-2">Live URL</label>
              <input value={form.liveUrl} onChange={e => setForm({...form, liveUrl: e.target.value})} className="w-full bg-bg-primary border border-gray-700 rounded-xl px-4 py-2.5 text-text-primary focus:border-accent outline-none" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-text-muted mb-2">Repo / Github URL</label>
              <input value={form.repoUrl} onChange={e => setForm({...form, repoUrl: e.target.value})} className="w-full bg-bg-primary border border-gray-700 rounded-xl px-4 py-2.5 text-text-primary focus:border-accent outline-none" />
            </div>

            <div className="md:col-span-2 pt-2">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={form.featured} onChange={e => setForm({...form, featured: e.target.checked})} className="w-5 h-5 accent-accent" />
                <span className="text-text-primary font-medium">Featured Project (Shows on Homepage)</span>
              </label>
            </div>
          </div>
        </div>

        {/* Client Info */}
        <div className="bg-bg-secondary border border-gray-800 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-text-primary mb-6">Client Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-text-muted mb-2">Client Name</label>
              <input value={form.client.name} onChange={e => handleNestedChange('client', 'name', e.target.value)} className="w-full bg-bg-primary border border-gray-700 rounded-xl px-4 py-2.5 text-text-primary focus:border-accent outline-none" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-text-muted mb-2">Industry</label>
              <input value={form.client.industry} onChange={e => handleNestedChange('client', 'industry', e.target.value)} className="w-full bg-bg-primary border border-gray-700 rounded-xl px-4 py-2.5 text-text-primary focus:border-accent outline-none" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-text-muted mb-2">Location</label>
              <input value={form.client.location} onChange={e => handleNestedChange('client', 'location', e.target.value)} className="w-full bg-bg-primary border border-gray-700 rounded-xl px-4 py-2.5 text-text-primary focus:border-accent outline-none" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-text-muted mb-2">Website</label>
              <input value={form.client.website} onChange={e => handleNestedChange('client', 'website', e.target.value)} className="w-full bg-bg-primary border border-gray-700 rounded-xl px-4 py-2.5 text-text-primary focus:border-accent outline-none" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-text-muted mb-2">Client Logo URL</label>
              <input value={form.client.logo} onChange={e => handleNestedChange('client', 'logo', e.target.value)} className="w-full bg-bg-primary border border-gray-700 rounded-xl px-4 py-2.5 text-text-primary focus:border-accent outline-none" />
            </div>
          </div>
        </div>

        {/* Deep Content - Quick JSON Edit for advanced fields to save time & complexity */}
        <div className="bg-bg-secondary border border-gray-800 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-text-primary mb-2">Advanced Content (JSON)</h2>
          <p className="text-text-muted text-sm mb-6">Edit the deep nested objects (challenge, solution, techStack, results, testimonial) directly as JSON below.</p>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-text-muted mb-2">Challenge & Overview</label>
              <textarea 
                value={JSON.stringify({ overview: form.overview, challenge: form.challenge }, null, 2)}
                onChange={e => {
                  try {
                    const parsed = JSON.parse(e.target.value);
                    setForm({...form, overview: parsed.overview, challenge: parsed.challenge});
                  } catch (err) {} // Ignore parse errors while typing
                }}
                rows={10} 
                className="w-full font-mono text-xs bg-bg-primary border border-gray-700 rounded-xl px-4 py-2.5 text-text-primary focus:border-accent outline-none"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-text-muted mb-2">Solution Setup</label>
              <textarea 
                value={JSON.stringify(form.solution, null, 2)}
                onChange={e => {
                  try {
                    const parsed = JSON.parse(e.target.value);
                    setForm({...form, solution: parsed});
                  } catch (err) {}
                }}
                rows={12} 
                className="w-full font-mono text-xs bg-bg-primary border border-gray-700 rounded-xl px-4 py-2.5 text-text-primary focus:border-accent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-text-muted mb-2">Tech Stack</label>
              <textarea 
                value={JSON.stringify(form.techStack, null, 2)}
                onChange={e => {
                  try {
                    const parsed = JSON.parse(e.target.value);
                    setForm({...form, techStack: parsed});
                  } catch (err) {}
                }}
                rows={8} 
                className="w-full font-mono text-xs bg-bg-primary border border-gray-700 rounded-xl px-4 py-2.5 text-text-primary focus:border-accent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-text-muted mb-2">Results & Testimonial</label>
              <textarea 
                value={JSON.stringify({ results: form.results, testimonial: form.testimonial }, null, 2)}
                onChange={e => {
                  try {
                    const parsed = JSON.parse(e.target.value);
                    setForm({...form, results: parsed.results, testimonial: parsed.testimonial});
                  } catch (err) {}
                }}
                rows={12} 
                className="w-full font-mono text-xs bg-bg-primary border border-gray-700 rounded-xl px-4 py-2.5 text-text-primary focus:border-accent outline-none"
              />
            </div>
          </div>
        </div>

      </form>
    </div>
  );
}
