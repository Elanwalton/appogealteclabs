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

        {/* Advanced Content Replacements */}
        
        {/* Challenge & Overview */}
        <div className="bg-bg-secondary border border-gray-800 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-text-primary mb-6">Challenge & Overview</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-text-muted mb-2">Project Overview</label>
              <textarea value={form.overview} onChange={e => setForm({...form, overview: e.target.value})} rows={3} className="w-full bg-bg-primary border border-gray-700 rounded-xl px-4 py-2.5 text-text-primary focus:border-accent outline-none" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-text-muted mb-2">Challenge Title</label>
                <input value={form.challenge.title} onChange={e => handleNestedChange('challenge', 'title', e.target.value)} className="w-full bg-bg-primary border border-gray-700 rounded-xl px-4 py-2.5 text-text-primary focus:border-accent outline-none" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-text-muted mb-2">Challenge Description</label>
                <textarea value={form.challenge.description} onChange={e => handleNestedChange('challenge', 'description', e.target.value)} rows={3} className="w-full bg-bg-primary border border-gray-700 rounded-xl px-4 py-2.5 text-text-primary focus:border-accent outline-none" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-text-muted mb-2">Challenge Image URL</label>
                <input value={form.challenge.image} onChange={e => handleNestedChange('challenge', 'image', e.target.value)} className="w-full bg-bg-primary border border-gray-700 rounded-xl px-4 py-2.5 text-text-primary focus:border-accent outline-none" />
              </div>
              
              <div className="md:col-span-2">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-semibold text-text-muted">Problems (List Items)</label>
                  <button type="button" onClick={() => addArrayString('challenge', 'problems')} className="text-accent hover:text-white flex items-center gap-1 text-sm"><Plus size={14}/> Add Problem</button>
                </div>
                <div className="space-y-3">
                  {(form.challenge.problems || []).map((prob: string, idx: number) => (
                    <div key={idx} className="flex gap-2">
                      <input value={prob} onChange={e => handleArrayStringChange('challenge', 'problems', idx, e.target.value)} className="flex-1 bg-bg-primary border border-gray-700 rounded-xl px-4 py-2 text-text-primary focus:border-accent outline-none" />
                      <button type="button" onClick={() => removeArrayString('challenge', 'problems', idx)} className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg"><Trash2 size={18} /></button>
                    </div>
                  ))}
                  {(!form.challenge.problems || form.challenge.problems.length === 0) && <div className="text-sm text-text-muted italic">No problems added yet.</div>}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Solution Setup */}
        <div className="bg-bg-secondary border border-gray-800 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-text-primary mb-6">Our Solution</h2>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-text-muted mb-2">Solution Title</label>
                <input value={form.solution.title} onChange={e => handleNestedChange('solution', 'title', e.target.value)} className="w-full bg-bg-primary border border-gray-700 rounded-xl px-4 py-2.5 text-text-primary focus:border-accent outline-none" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-text-muted mb-2">Solution Description</label>
                <textarea value={form.solution.description} onChange={e => handleNestedChange('solution', 'description', e.target.value)} rows={3} className="w-full bg-bg-primary border border-gray-700 rounded-xl px-4 py-2.5 text-text-primary focus:border-accent outline-none" />
              </div>
              
              <div className="md:col-span-2">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-semibold text-text-muted">Approach Steps</label>
                  <button type="button" onClick={() => addArrayString('solution', 'approach')} className="text-accent hover:text-white flex items-center gap-1 text-sm"><Plus size={14}/> Add Step</button>
                </div>
                <div className="space-y-3">
                  {(form.solution.approach || []).map((item: string, idx: number) => (
                    <div key={idx} className="flex gap-2">
                      <input value={item} onChange={e => handleArrayStringChange('solution', 'approach', idx, e.target.value)} className="flex-1 bg-bg-primary border border-gray-700 rounded-xl px-4 py-2 text-text-primary focus:border-accent outline-none" />
                      <button type="button" onClick={() => removeArrayString('solution', 'approach', idx)} className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg"><Trash2 size={18} /></button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="md:col-span-2">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-semibold text-text-muted">Key Features</label>
                  <button type="button" onClick={() => addArrayString('solution', 'features')} className="text-accent hover:text-white flex items-center gap-1 text-sm"><Plus size={14}/> Add Feature</button>
                </div>
                <div className="space-y-3">
                  {(form.solution.features || []).map((item: string, idx: number) => (
                    <div key={idx} className="flex gap-2">
                      <input value={item} onChange={e => handleArrayStringChange('solution', 'features', idx, e.target.value)} className="flex-1 bg-bg-primary border border-gray-700 rounded-xl px-4 py-2 text-text-primary focus:border-accent outline-none" />
                      <button type="button" onClick={() => removeArrayString('solution', 'features', idx)} className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg"><Trash2 size={18} /></button>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="md:col-span-2">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-semibold text-text-muted">Solution Images (URLs)</label>
                  <button type="button" onClick={() => addArrayString('solution', 'images')} className="text-accent hover:text-white flex items-center gap-1 text-sm"><Plus size={14}/> Add Image</button>
                </div>
                <div className="space-y-3">
                  {(form.solution.images || []).map((item: string, idx: number) => (
                    <div key={idx} className="flex gap-2">
                      <input value={item} onChange={e => handleArrayStringChange('solution', 'images', idx, e.target.value)} className="flex-1 bg-bg-primary border border-gray-700 rounded-xl px-4 py-2 text-text-primary focus:border-accent outline-none" />
                      <button type="button" onClick={() => removeArrayString('solution', 'images', idx)} className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg"><Trash2 size={18} /></button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="bg-bg-secondary border border-gray-800 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-text-primary mb-6">Tech Stack</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {['frontend', 'backend', 'infrastructure', 'tools'].map((techType) => (
              <div key={techType}>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-semibold text-text-muted capitalize">{techType}</label>
                  <button type="button" onClick={() => addArrayString('techStack', techType)} className="text-accent hover:text-white flex items-center gap-1 text-sm"><Plus size={14}/> Add</button>
                </div>
                <div className="space-y-3">
                  {(form.techStack[techType] || []).map((item: string, idx: number) => (
                    <div key={idx} className="flex gap-2">
                      <input value={item} onChange={e => handleArrayStringChange('techStack', techType, idx, e.target.value)} className="flex-1 bg-bg-primary border border-gray-700 rounded-xl px-4 py-2 text-text-primary focus:border-accent outline-none" />
                      <button type="button" onClick={() => removeArrayString('techStack', techType, idx)} className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg"><Trash2 size={18} /></button>
                    </div>
                  ))}
                  {(!form.techStack[techType] || form.techStack[techType].length === 0) && <div className="text-sm text-text-muted italic">None added</div>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="bg-bg-secondary border border-gray-800 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-text-primary mb-6">Results & Outcomes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-text-muted mb-2">Results Title</label>
              <input value={form.results.title} onChange={e => handleNestedChange('results', 'title', e.target.value)} className="w-full bg-bg-primary border border-gray-700 rounded-xl px-4 py-2.5 text-text-primary focus:border-accent outline-none" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-text-muted mb-2">Results Description</label>
              <textarea value={form.results.description} onChange={e => handleNestedChange('results', 'description', e.target.value)} rows={3} className="w-full bg-bg-primary border border-gray-700 rounded-xl px-4 py-2.5 text-text-primary focus:border-accent outline-none" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-text-muted mb-2">Results Image URL</label>
              <input value={form.results.image} onChange={e => handleNestedChange('results', 'image', e.target.value)} className="w-full bg-bg-primary border border-gray-700 rounded-xl px-4 py-2.5 text-text-primary focus:border-accent outline-none" />
            </div>
            
            <div className="md:col-span-2">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-semibold text-text-muted">Key Metrics</label>
                <button type="button" onClick={() => addArrayString('results', 'metrics')} className="text-accent hover:text-white flex items-center gap-1 text-sm"><Plus size={14}/> Add Metric</button>
              </div>
              <div className="space-y-3">
                {(form.results.metrics || []).map((item: string, idx: number) => (
                  <div key={idx} className="flex gap-2">
                    <input value={item} onChange={e => handleArrayStringChange('results', 'metrics', idx, e.target.value)} placeholder="e.g. 50% increase in revenue" className="flex-1 bg-bg-primary border border-gray-700 rounded-xl px-4 py-2 text-text-primary focus:border-accent outline-none" />
                    <button type="button" onClick={() => removeArrayString('results', 'metrics', idx)} className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg"><Trash2 size={18} /></button>
                  </div>
                ))}
              </div>
            </div>

            <div className="md:col-span-2">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-semibold text-text-muted">Other Outcomes</label>
                <button type="button" onClick={() => addArrayString('results', 'outcomes')} className="text-accent hover:text-white flex items-center gap-1 text-sm"><Plus size={14}/> Add Outcome</button>
              </div>
              <div className="space-y-3">
                {(form.results.outcomes || []).map((item: string, idx: number) => (
                  <div key={idx} className="flex gap-2">
                    <input value={item} onChange={e => handleArrayStringChange('results', 'outcomes', idx, e.target.value)} className="flex-1 bg-bg-primary border border-gray-700 rounded-xl px-4 py-2 text-text-primary focus:border-accent outline-none" />
                    <button type="button" onClick={() => removeArrayString('results', 'outcomes', idx)} className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg"><Trash2 size={18} /></button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial */}
        <div className="bg-bg-secondary border border-gray-800 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-text-primary mb-6">Client Testimonial</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-text-muted mb-2">Testimonial Text</label>
              <textarea value={form.testimonial.text} onChange={e => handleNestedChange('testimonial', 'text', e.target.value)} rows={3} className="w-full bg-bg-primary border border-gray-700 rounded-xl px-4 py-2.5 text-text-primary focus:border-accent outline-none" />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-text-muted mb-2">Author Name</label>
              <input value={form.testimonial.author?.name || ''} onChange={e => setForm({...form, testimonial: {...form.testimonial, author: {...(form.testimonial.author || {}), name: e.target.value}}})} className="w-full bg-bg-primary border border-gray-700 rounded-xl px-4 py-2.5 text-text-primary focus:border-accent outline-none" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-text-muted mb-2">Author Position</label>
              <input value={form.testimonial.author?.position || ''} onChange={e => setForm({...form, testimonial: {...form.testimonial, author: {...(form.testimonial.author || {}), position: e.target.value}}})} className="w-full bg-bg-primary border border-gray-700 rounded-xl px-4 py-2.5 text-text-primary focus:border-accent outline-none" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-text-muted mb-2">Company</label>
              <input value={form.testimonial.author?.company || ''} onChange={e => setForm({...form, testimonial: {...form.testimonial, author: {...(form.testimonial.author || {}), company: e.target.value}}})} className="w-full bg-bg-primary border border-gray-700 rounded-xl px-4 py-2.5 text-text-primary focus:border-accent outline-none" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-text-muted mb-2">Avatar URL</label>
              <input value={form.testimonial.author?.avatar || ''} onChange={e => setForm({...form, testimonial: {...form.testimonial, author: {...(form.testimonial.author || {}), avatar: e.target.value}}})} className="w-full bg-bg-primary border border-gray-700 rounded-xl px-4 py-2.5 text-text-primary focus:border-accent outline-none" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-text-muted mb-2">Rating (Out of 5)</label>
              <input type="number" min="1" max="5" value={form.testimonial.rating} onChange={e => handleNestedChange('testimonial', 'rating', parseFloat(e.target.value) || 5)} className="w-full bg-bg-primary border border-gray-700 rounded-xl px-4 py-2.5 text-text-primary focus:border-accent outline-none" />
            </div>
          </div>
        </div>

      </form>
    </div>
  );
}
