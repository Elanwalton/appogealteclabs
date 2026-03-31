'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { BarChart2, FileText, Mail, Users, Plus, RefreshCw, TrendingUp } from 'lucide-react';
import api from '@/lib/api';

interface Stats {
  totalPosts: number;
  totalViews: number;
  totalInquiries: number;
  totalSubscribers: number;
  topPosts: { title: string; slug: string; views: number }[];
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const [postsRes, inquiriesRes, newsletterRes] = await Promise.all([
          api.get('/blog/posts'),
          api.get('/inquiries'),
          api.get('/newsletter/subscribers'),
        ]);

        const posts = postsRes.data;
        const totalViews = posts.reduce((sum: number, p: any) => sum + (p.views || 0), 0);
        const topPosts = [...posts]
          .sort((a: any, b: any) => (b.views || 0) - (a.views || 0))
          .slice(0, 5)
          .map((p: any) => ({ title: p.title, slug: p.slug, views: p.views || 0 }));

        setStats({
          totalPosts: posts.length,
          totalViews,
          totalInquiries: inquiriesRes.data.length,
          totalSubscribers: newsletterRes.data.length,
          topPosts,
        });
      } catch {
        // Best-effort — set empty state
        setStats({ totalPosts: 0, totalViews: 0, totalInquiries: 0, totalSubscribers: 0, topPosts: [] });
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, []);

  const statCards = [
    { label: 'Blog Posts', value: stats?.totalPosts, icon: FileText, color: 'text-accent', bg: 'bg-accent/10', href: '/admin/blog' },
    { label: 'Total Views', value: stats?.totalViews.toLocaleString(), icon: BarChart2, color: 'text-purple-400', bg: 'bg-purple-500/10', href: '/admin/analytics' },
    { label: 'Inquiries', value: stats?.totalInquiries, icon: Mail, color: 'text-blue-400', bg: 'bg-blue-500/10', href: '/admin/inquiries' },
    { label: 'Subscribers', value: stats?.totalSubscribers, icon: Users, color: 'text-green-400', bg: 'bg-green-500/10', href: '/admin/newsletter' },
  ];

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Admin Dashboard</h1>
          <p className="text-text-secondary text-sm mt-1">Content management overview</p>
        </div>
        <Link
          href="/admin/blog/new"
          className="flex items-center gap-2 bg-accent text-bg-primary font-bold px-5 py-2.5 rounded-xl hover:bg-[#00e5c0] transition-colors text-sm"
        >
          <Plus size={16} /> New Post
        </Link>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {statCards.map(({ label, value, icon: Icon, color, bg, href }) => (
          <Link
            key={label}
            href={href}
            className="bg-bg-secondary border border-gray-800 rounded-2xl p-6 hover:border-gray-600 transition-colors group"
          >
            <div className={`w-11 h-11 ${bg} rounded-xl flex items-center justify-center ${color} mb-4`}>
              <Icon size={20} />
            </div>
            <div className={`text-2xl font-bold ${color} mb-1`}>
              {loading ? <RefreshCw size={18} className="animate-spin" /> : value ?? '—'}
            </div>
            <div className="text-sm text-text-muted">{label}</div>
          </Link>
        ))}
      </div>

      {/* Top Posts */}
      <div className="bg-bg-secondary border border-gray-800 rounded-2xl overflow-hidden">
        <div className="flex items-center gap-2 px-6 py-4 border-b border-gray-800">
          <TrendingUp size={18} className="text-accent" />
          <h2 className="font-bold text-text-primary text-sm">Top Performing Posts</h2>
        </div>
        {loading ? (
          <div className="flex items-center justify-center py-12 text-text-muted">
            <RefreshCw size={20} className="animate-spin mr-2" /> Loading...
          </div>
        ) : stats?.topPosts.length === 0 ? (
          <div className="text-center py-12 text-text-muted text-sm">No posts yet.</div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="text-xs text-text-muted uppercase tracking-wider border-b border-gray-800">
                <th className="text-left px-6 py-3">Post</th>
                <th className="text-right px-6 py-3">Views</th>
                <th className="text-right px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {stats?.topPosts.map((p, i) => (
                <tr key={p.slug} className="hover:bg-gray-800/40 transition-colors">
                  <td className="px-6 py-3 text-sm text-text-primary flex items-center gap-3">
                    <span className="text-xs text-text-muted w-4">#{i + 1}</span>
                    <span className="line-clamp-1">{p.title}</span>
                  </td>
                  <td className="px-6 py-3 text-right text-sm text-text-secondary">{p.views.toLocaleString()}</td>
                  <td className="px-6 py-3 text-right">
                    <Link href={`/blog/${p.slug}`} target="_blank" className="text-xs text-accent hover:underline">View</Link>
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
