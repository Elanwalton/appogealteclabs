'use client';

import { useState, useEffect, useCallback, type ComponentType } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ArrowLeft, Save, Eye, Loader2, AlertCircle, ImageIcon, Tag, ChevronDown } from 'lucide-react';
import api from '@/lib/api';
import SEOChecklist from '@/components/admin/SEOChecklist';

interface RichEditorProps {
  content: string;
  onChange: (html: string) => void;
}

// Dynamically import Tiptap editor to avoid SSR issues
const RichEditor = dynamic<RichEditorProps>(
  () => import('@/components/admin/RichEditor') as Promise<{ default: ComponentType<RichEditorProps> }>,
  {
    ssr: false,
    loading: () => (
      <div className="h-64 bg-gray-900 rounded-xl flex items-center justify-center text-text-muted text-sm">
        Loading editor...
      </div>
    ),
  }
);


interface Category { id: string; name: string; slug: string; }
interface Tag { id: string; name: string; slug: string; }

const generateSlug = (title: string) =>
  title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim();

interface BlogPostFormProps {
  initialData?: any;
  postId?: string;
}

export default function BlogPostForm({ initialData, postId }: BlogPostFormProps) {
  const router = useRouter();
  const isEdit = !!postId;

  const [title, setTitle] = useState(initialData?.title || '');
  const [slug, setSlug] = useState(initialData?.slug || '');
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || '');
  const [content, setContent] = useState(initialData?.content || '');
  const [image, setImage] = useState(initialData?.image || '');
  const [focusKeyword, setFocusKeyword] = useState(initialData?.focus_keyword || '');
  const [categorySlug, setCategorySlug] = useState(initialData?.category_slug || '');
  const [categoryName, setCategoryName] = useState(initialData?.category_name || '');
  const [selectedTags, setSelectedTags] = useState<string[]>(initialData?.tags || []);
  const [featured, setFeatured] = useState(initialData?.featured || false);
  const [isActive, setIsActive] = useState(initialData?.is_active ?? true);
  const [readTime, setReadTime] = useState(initialData?.read_time || 0);

  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [saving, setSaving] = useState(false);
  const [savingDraft, setSavingDraft] = useState(false);
  const [error, setError] = useState('');
  const [slugManual, setSlugManual] = useState(isEdit);

  // Auto-generate slug from title
  useEffect(() => {
    if (!slugManual && title) {
      setSlug(generateSlug(title));
    }
  }, [title, slugManual]);

  // Auto-calc read time
  useEffect(() => {
    const words = content.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
    setReadTime(Math.max(1, Math.ceil(words / 200)));
  }, [content]);

  useEffect(() => {
    const fetchMeta = async () => {
      try {
        const [catRes, tagRes] = await Promise.all([
          api.get('/blog/categories'),
          api.get('/blog/tags'),
        ]);
        setCategories(catRes.data);
        setTags(tagRes.data);
      } catch {}
    };
    fetchMeta();
  }, []);

  const toggleTag = (slug: string) => {
    setSelectedTags(prev =>
      prev.includes(slug) ? prev.filter(t => t !== slug) : [...prev, slug]
    );
  };

  const save = async (publish: boolean) => {
    if (!title || !content) {
      setError('Title and content are required.');
      return;
    }
    publish ? setSaving(true) : setSavingDraft(true);
    setError('');

    const payload = {
      title, slug, excerpt, content, image,
      focus_keyword: focusKeyword,
      category_slug: categorySlug || null,
      category_name: categoryName || null,
      tags: selectedTags,
      featured,
      read_time: readTime,
      is_active: publish,
    };

    try {
      if (isEdit) {
        await api.put(`/blog/posts/${postId}`, payload);
      } else {
        await api.post('/blog/posts', payload);
      }
      router.push('/admin/blog');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to save post.');
    } finally {
      setSaving(false);
      setSavingDraft(false);
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/blog" className="p-2 rounded-xl hover:bg-gray-800 text-text-secondary transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-text-primary">{isEdit ? 'Edit Post' : 'New Blog Post'}</h1>
          {isEdit && <p className="text-xs text-text-muted mt-0.5">ID: {postId}</p>}
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl text-sm flex items-center gap-2">
          <AlertCircle size={16} /> {error}
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-8">
        {/* Main editor column */}
        <div className="space-y-6">
          {/* Title */}
          <div>
            <label className="text-sm font-medium text-text-secondary mb-2 block">Post Title *</label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Enter a compelling post title..."
              className="w-full bg-bg-secondary border border-gray-800 rounded-xl px-4 py-3 text-text-primary text-lg font-semibold focus:border-accent outline-none transition-all"
            />
          </div>

          {/* Slug */}
          <div>
            <label className="text-sm font-medium text-text-secondary mb-2 block">URL Slug</label>
            <div className="flex items-center gap-2 bg-bg-secondary border border-gray-800 rounded-xl px-4 py-3">
              <span className="text-text-muted text-sm shrink-0">/blog/</span>
              <input
                type="text"
                value={slug}
                onChange={e => { setSlugManual(true); setSlug(e.target.value); }}
                className="flex-1 bg-transparent text-text-primary text-sm outline-none"
                placeholder="auto-generated-from-title"
              />
            </div>
          </div>

          {/* Excerpt / Meta Description */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-text-secondary">Meta Description / Excerpt *</label>
              <span className={`text-xs ${excerpt.length >= 120 && excerpt.length <= 155 ? 'text-green-400' : 'text-text-muted'}`}>
                {excerpt.length} / 155 chars
              </span>
            </div>
            <textarea
              value={excerpt}
              onChange={e => setExcerpt(e.target.value)}
              rows={3}
              placeholder="Write a compelling excerpt that summarizes the post (120–155 characters recommended)..."
              className="w-full bg-bg-secondary border border-gray-800 rounded-xl px-4 py-3 text-text-primary text-sm focus:border-accent outline-none transition-all resize-none"
            />
          </div>

          {/* Rich Text Editor */}
          <div>
            <label className="text-sm font-medium text-text-secondary mb-2 block">Content *</label>
            <RichEditor content={content} onChange={setContent} />
          </div>

          {/* Image */}
          <div>
            <label className="text-sm font-medium text-text-secondary mb-2 flex items-center gap-2">
              <ImageIcon size={16} /> Featured Image URL
            </label>
            <input
              type="url"
              value={image}
              onChange={e => setImage(e.target.value)}
              placeholder="https://your-image-url.com/image.jpg"
              className="w-full bg-bg-secondary border border-gray-800 rounded-xl px-4 py-3 text-text-primary text-sm focus:border-accent outline-none transition-all"
            />
            {image && (
              <img
                src={image}
                alt="Featured preview"
                className="mt-3 w-full max-h-48 object-cover rounded-xl border border-gray-800"
              />
            )}
          </div>
        </div>

        {/* Right sidebar */}
        <div className="space-y-6">
          {/* Publish actions */}
          <div className="bg-bg-secondary rounded-2xl border border-gray-800 p-5">
            <h3 className="font-bold text-text-primary text-sm mb-4">Publishing</h3>
            <div className="flex items-center justify-between mb-3 text-sm">
              <span className="text-text-secondary">Status</span>
              <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${isActive ? 'bg-green-500/10 text-green-400' : 'bg-gray-700/60 text-text-muted'}`}>
                {isActive ? 'Published' : 'Draft'}
              </span>
            </div>
            <div className="flex items-center justify-between mb-4 text-sm">
              <span className="text-text-secondary">Read time</span>
              <span className="text-text-muted">~{readTime} min</span>
            </div>
            <div className="flex items-center gap-3 mb-4">
              <label className="flex items-center gap-2 cursor-pointer select-none text-sm text-text-secondary">
                <input type="checkbox" checked={featured} onChange={e => setFeatured(e.target.checked)} className="accent-yellow-400 w-4 h-4 rounded" />
                Featured post
              </label>
            </div>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => save(true)}
                disabled={saving}
                className="w-full bg-accent text-bg-primary font-bold py-2.5 rounded-xl hover:bg-[#00e5c0] transition-colors flex items-center justify-center gap-2 text-sm"
              >
                {saving ? <Loader2 size={16} className="animate-spin" /> : <Eye size={16} />}
                {saving ? 'Publishing...' : 'Publish'}
              </button>
              <button
                onClick={() => save(false)}
                disabled={savingDraft}
                className="w-full bg-gray-800 text-text-secondary font-medium py-2.5 rounded-xl hover:text-text-primary transition-colors flex items-center justify-center gap-2 text-sm"
              >
                {savingDraft ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                {savingDraft ? 'Saving...' : 'Save Draft'}
              </button>
            </div>
          </div>

          {/* Focus Keyword */}
          <div className="bg-bg-secondary rounded-2xl border border-gray-800 p-5">
            <h3 className="font-bold text-text-primary text-sm mb-3">SEO Settings</h3>
            <label className="text-xs text-text-muted block mb-1.5">Focus Keyword</label>
            <input
              type="text"
              value={focusKeyword}
              onChange={e => setFocusKeyword(e.target.value)}
              placeholder="e.g. web development kenya"
              className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-text-primary text-sm focus:border-accent outline-none transition-all"
            />
          </div>

          {/* Category */}
          <div className="bg-bg-secondary rounded-2xl border border-gray-800 p-5">
            <h3 className="font-bold text-text-primary text-sm mb-3">Category</h3>
            <div className="relative">
              <select
                value={categorySlug}
                onChange={e => {
                  const cat = categories.find(c => c.slug === e.target.value);
                  setCategorySlug(e.target.value);
                  setCategoryName(cat?.name || '');
                }}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm text-text-primary appearance-none focus:border-accent outline-none transition-all"
              >
                <option value="">Select category</option>
                {categories.map(c => (
                  <option key={c.id} value={c.slug}>{c.name}</option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
            </div>
          </div>

          {/* Tags */}
          <div className="bg-bg-secondary rounded-2xl border border-gray-800 p-5">
            <h3 className="font-bold text-text-primary text-sm mb-3 flex items-center gap-2">
              <Tag size={14} /> Tags
            </h3>
            {tags.length === 0 ? (
              <p className="text-xs text-text-muted">No tags available.</p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {tags.map(t => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => toggleTag(t.slug)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all border ${
                      selectedTags.includes(t.slug)
                        ? 'border-accent bg-accent/10 text-accent'
                        : 'border-gray-700 text-text-muted hover:border-gray-500'
                    }`}
                  >
                    {t.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* SEO Checklist */}
          <SEOChecklist
            title={title}
            excerpt={excerpt}
            content={content}
            slug={slug}
            focusKeyword={focusKeyword}
            image={image}
          />
        </div>
      </div>
    </div>
  );
}
