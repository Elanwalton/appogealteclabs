'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { Plus, Edit2, Trash2, Eye, Search, RefreshCw, FileText } from 'lucide-react';
import api from '@/lib/api';

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category_name: string;
  featured: boolean;
  is_active: boolean;
  views: number;
  published_at: string;
}

export default function AdminBlogPage() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');

  const fetchPosts = async () => {
    try {
      setLoading(true);
      // Fetch all posts (admin sees drafts too via auth header)
      const res = await api.get('/blog/posts?all=true');
      setPosts(res.data);
    } catch (err: any) {
      setError('Failed to load posts.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to permanently delete this post?')) return;
    try {
      await api.delete(`/blog/posts/${id}`);
      setPosts(prev => prev.filter(p => p.id !== id));
    } catch {
      alert('Failed to delete post.');
    }
  };

  const filtered = posts.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    (p.category_name || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Blog Posts</h1>
          <p className="text-text-secondary text-sm mt-1">{posts.length} total posts</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchPosts}
            className="p-2.5 rounded-xl bg-gray-800 text-text-secondary hover:text-text-primary transition-colors"
            title="Refresh"
          >
            <RefreshCw size={18} />
          </button>
          <Link
            href="/admin/blog/new"
            className="flex items-center gap-2 bg-accent text-bg-primary font-bold px-5 py-2.5 rounded-xl hover:bg-[#00e5c0] transition-colors text-sm"
          >
            <Plus size={18} /> New Post
          </Link>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search posts by title or category..."
          className="w-full max-w-md bg-bg-secondary border border-gray-800 rounded-xl py-2.5 pl-11 pr-4 text-sm text-text-primary focus:border-accent outline-none transition-all"
        />
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-500/10 text-red-400 rounded-xl text-sm">{error}</div>
      )}

      {/* Table */}
      <div className="bg-bg-secondary rounded-2xl border border-gray-800 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-24 text-text-muted">
            <RefreshCw size={24} className="animate-spin mr-3" />
            Loading posts...
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-text-muted gap-3">
            <FileText size={40} className="opacity-30" />
            <p>{search ? 'No posts match your search.' : 'No posts yet. Create your first one!'}</p>
            {!search && (
              <Link href="/admin/blog/new" className="text-accent text-sm underline">
                Create a post
              </Link>
            )}
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800 text-xs text-text-muted uppercase tracking-wider">
                <th className="text-left px-6 py-4">Title</th>
                <th className="text-left px-4 py-4 hidden md:table-cell">Category</th>
                <th className="text-left px-4 py-4 hidden lg:table-cell">Views</th>
                <th className="text-left px-4 py-4 hidden sm:table-cell">Status</th>
                <th className="text-left px-4 py-4 hidden lg:table-cell">Published</th>
                <th className="text-right px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {filtered.map(post => (
                <tr key={post.id} className="hover:bg-gray-800/40 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="font-medium text-sm text-text-primary line-clamp-1">{post.title}</div>
                    <div className="text-xs text-text-muted line-clamp-1 mt-0.5">/{post.slug}</div>
                  </td>
                  <td className="px-4 py-4 hidden md:table-cell">
                    {post.category_name ? (
                      <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-full">
                        {post.category_name}
                      </span>
                    ) : (
                      <span className="text-xs text-text-muted">—</span>
                    )}
                  </td>
                  <td className="px-4 py-4 text-sm text-text-secondary hidden lg:table-cell">
                    {post.views || 0}
                  </td>
                  <td className="px-4 py-4 hidden sm:table-cell">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      post.is_active
                        ? 'bg-green-500/10 text-green-400'
                        : 'bg-gray-700/60 text-text-muted'
                    }`}>
                      {post.is_active ? 'Published' : 'Draft'}
                    </span>
                    {post.featured && (
                      <span className="ml-2 text-xs bg-yellow-500/10 text-yellow-400 px-2 py-1 rounded-full">
                        Featured
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-4 text-xs text-text-muted hidden lg:table-cell">
                    {post.published_at ? new Date(post.published_at).toLocaleDateString() : '—'}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link
                        href={`/blog/${post.slug}`}
                        target="_blank"
                        className="p-1.5 rounded-lg text-text-muted hover:text-accent transition-colors"
                        title="Preview post"
                      >
                        <Eye size={16} />
                      </Link>
                      <Link
                        href={`/admin/blog/${post.id}/edit`}
                        className="p-1.5 rounded-lg text-text-muted hover:text-blue-400 transition-colors"
                        title="Edit post"
                      >
                        <Edit2 size={16} />
                      </Link>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="p-1.5 rounded-lg text-text-muted hover:text-red-400 transition-colors"
                        title="Delete post"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
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
