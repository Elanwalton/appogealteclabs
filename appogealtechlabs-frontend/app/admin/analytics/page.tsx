'use client';

import { useEffect, useState } from 'react';
import { BarChart2, FileText, Mail, Users, TrendingUp, Eye, RefreshCw, Globe } from 'lucide-react';
import api from '@/lib/api';
import Link from 'next/link';

interface AnalyticsData {
  totalPosts: number;
  totalViews: number;
  totalInquiries: number;
  unreadInquiries: number;
  totalSubscribers: number;
  activeSubscribers: number;
  topPosts: { title: string; slug: string; views: number; category_name?: string }[];
  categoryBreakdown: { name: string; count: number }[];
  recentInquiries: { id: string; name: string; email: string; service: string | null; submitted_at: string }[];
}

interface CountryEntry { country: string; visits: number; }

// Common country → flag emoji
const FLAG_MAP: Record<string, string> = {
  'Kenya': '🇰🇪', 'United States': '🇺🇸', 'United Kingdom': '🇬🇧', 'Nigeria': '🇳🇬',
  'Germany': '🇩🇪', 'France': '🇫🇷', 'India': '🇮🇳', 'South Africa': '🇿🇦',
  'Canada': '🇨🇦', 'Australia': '🇦🇺', 'Tanzania': '🇹🇿', 'Uganda': '🇺🇬',
  'Rwanda': '🇷🇼', 'Ethiopia': '🇪🇹', 'Ghana': '🇬🇭', 'China': '🇨🇳',
  'Brazil': '🇧🇷', 'Japan': '🇯🇵', 'Netherlands': '🇳🇱', 'Sweden': '🇸🇪',
  'Local': '💻', 'Unknown': '🌍',
};

export default function AdminAnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [countryTraffic, setCountryTraffic] = useState<CountryEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const loadAll = async () => {
    setLoading(true);
    try {
      const [postsRes, inquiriesRes, newsletterRes, countriesRes] = await Promise.all([
        api.get('/blog/posts?all=true'),
        api.get('/inquiries'),
        api.get('/newsletter/subscribers'),
        api.get('/analytics/countries').catch(() => ({ data: [] })),
      ]);

      const posts = postsRes.data as any[];
      const inquiries = inquiriesRes.data as any[];
      const subscribers = newsletterRes.data as any[];
      const countries = Array.isArray(countriesRes.data) ? countriesRes.data as CountryEntry[] : [];
      setCountryTraffic(countries);

      const totalViews = posts.reduce((s: number, p: any) => s + (p.views || 0), 0);
      const topPosts = [...posts].sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, 8);

      // Category breakdown
      const catMap: Record<string, number> = {};
      posts.forEach((p: any) => {
        const cat = p.category_name || 'Uncategorized';
        catMap[cat] = (catMap[cat] || 0) + 1;
      });
      const categoryBreakdown = Object.entries(catMap).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count);

      const recentInquiries = [...inquiries].slice(0, 5);

      setData({
        totalPosts: posts.length,
        totalViews,
        totalInquiries: inquiries.length,
        unreadInquiries: inquiries.filter((i: any) => !i.is_read).length,
        totalSubscribers: subscribers.length,
        activeSubscribers: subscribers.filter((s: any) => s.is_active).length,
        topPosts,
        categoryBreakdown,
        recentInquiries,
      });
    } catch {
      // no-op
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadAll(); }, []);

  const maxViews = data?.topPosts[0]?.views || 1;

  const statCards = data ? [
    { label: 'Blog Posts', value: data.totalPosts, icon: FileText, color: 'text-accent', bg: 'bg-accent/10', href: '/admin/blog' },
    { label: 'Total Views', value: data.totalViews.toLocaleString(), icon: Eye, color: 'text-purple-400', bg: 'bg-purple-500/10', href: '/admin/blog' },
    { label: 'Inquiries', value: `${data.totalInquiries}${data.unreadInquiries > 0 ? ` (${data.unreadInquiries} new)` : ''}`, icon: Mail, color: 'text-blue-400', bg: 'bg-blue-500/10', href: '/admin/inquiries' },
    { label: 'Subscribers', value: `${data.activeSubscribers} active`, icon: Users, color: 'text-green-400', bg: 'bg-green-500/10', href: '/admin/newsletter' },
  ] : [];

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Analytics</h1>
          <p className="text-text-secondary text-sm mt-1">Platform performance overview</p>
        </div>
        <button onClick={loadAll} className="p-2.5 rounded-xl bg-gray-800 text-text-secondary hover:text-white transition-colors"><RefreshCw size={18} /></button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-32 text-text-muted"><RefreshCw size={28} className="animate-spin mr-3" /> Loading analytics...</div>
      ) : !data ? (
        <div className="text-center py-24 text-text-muted">Could not load analytics. Check your connection.</div>
      ) : (
        <div className="space-y-8">
          {/* Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {statCards.map(({ label, value, icon: Icon, color, bg, href }) => (
              <Link key={label} href={href} className="bg-bg-secondary border border-gray-800 rounded-2xl p-6 hover:border-gray-600 transition-colors group">
                <div className={`w-11 h-11 ${bg} rounded-xl flex items-center justify-center ${color} mb-4`}><Icon size={20} /></div>
                <div className={`text-2xl font-bold ${color} mb-1`}>{value}</div>
                <div className="text-sm text-text-muted">{label}</div>
              </Link>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Top Posts */}
            <div className="bg-bg-secondary border border-gray-800 rounded-2xl overflow-hidden">
              <div className="flex items-center gap-2 px-6 py-4 border-b border-gray-800">
                <TrendingUp size={18} className="text-accent" />
                <h2 className="font-bold text-text-primary text-sm">Top Posts by Views</h2>
              </div>
              <div className="p-6 space-y-3">
                {data.topPosts.length === 0 ? (
                  <p className="text-center text-text-muted text-sm py-8">No posts yet.</p>
                ) : data.topPosts.map((post, i) => (
                  <div key={post.slug}>
                    <div className="flex items-center justify-between mb-1">
                      <Link href={`/blog/${post.slug}`} target="_blank" className="text-xs text-text-secondary hover:text-accent transition-colors truncate max-w-[220px]">
                        #{i + 1} {post.title}
                      </Link>
                      <span className="text-xs text-text-muted shrink-0 ml-2">{(post.views || 0).toLocaleString()} views</span>
                    </div>
                    <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-accent to-[#00d4ff] rounded-full transition-all duration-700"
                        style={{ width: `${((post.views || 0) / maxViews) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Country Traffic */}
            <div className="bg-bg-secondary border border-gray-800 rounded-2xl overflow-hidden">
              <div className="flex items-center gap-2 px-6 py-4 border-b border-gray-800">
                <Globe size={18} className="text-green-400" />
                <h2 className="font-bold text-text-primary text-sm">Traffic by Country</h2>
              </div>
              <div className="p-6 space-y-3">
                {countryTraffic.length === 0 ? (
                  <p className="text-center text-text-muted text-sm py-8">No country data yet. Traffic is tracked automatically as your site gets visitors.</p>
                ) : (() => {
                  const maxVisits = countryTraffic[0]?.visits || 1;
                  return countryTraffic.slice(0, 10).map((entry) => (
                    <div key={entry.country}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-text-secondary flex items-center gap-2">
                          <span className="text-base">{FLAG_MAP[entry.country] || '🌍'}</span>
                          {entry.country}
                        </span>
                        <span className="text-xs font-semibold text-green-400">{entry.visits.toLocaleString()} visit{entry.visits !== 1 ? 's' : ''}</span>
                      </div>
                      <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full transition-all duration-700"
                          style={{ width: `${(entry.visits / maxVisits) * 100}%` }}
                        />
                      </div>
                    </div>
                  ));
                })()}
              </div>
            </div>
          </div>

          {/* Category Breakdown */}
          <div className="bg-bg-secondary border border-gray-800 rounded-2xl overflow-hidden">
            <div className="flex items-center gap-2 px-6 py-4 border-b border-gray-800">
              <BarChart2 size={18} className="text-purple-400" />
              <h2 className="font-bold text-text-primary text-sm">Posts by Category</h2>
            </div>
            <div className="p-6 space-y-3">
              {data.categoryBreakdown.length === 0 ? (
                <p className="text-center text-text-muted text-sm py-8">No categories yet.</p>
              ) : data.categoryBreakdown.map(cat => (
                <div key={cat.name}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-text-secondary">{cat.name}</span>
                    <span className="text-xs text-text-muted">{cat.count} post{cat.count !== 1 ? 's' : ''}</span>
                  </div>
                  <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-700"
                      style={{ width: `${(cat.count / data.totalPosts) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Inquiries */}
          <div className="bg-bg-secondary border border-gray-800 rounded-2xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
              <div className="flex items-center gap-2">
                <Mail size={18} className="text-blue-400" />
                <h2 className="font-bold text-text-primary text-sm">Recent Inquiries</h2>
              </div>
              <Link href="/admin/inquiries" className="text-xs text-accent hover:underline">View all</Link>
            </div>
            {data.recentInquiries.length === 0 ? (
              <div className="text-center py-10 text-text-muted text-sm">No inquiries yet.</div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-800 text-xs text-text-muted uppercase tracking-wider">
                    <th className="text-left px-6 py-3">Client</th>
                    <th className="text-left px-4 py-3 hidden sm:table-cell">Service</th>
                    <th className="text-right px-6 py-3">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {data.recentInquiries.map(inq => (
                    <tr key={inq.id} className="hover:bg-gray-800/40 transition-colors">
                      <td className="px-6 py-3">
                        <div className="text-sm text-text-primary font-medium">{inq.name}</div>
                        <div className="text-xs text-text-muted">{inq.email}</div>
                      </td>
                      <td className="px-4 py-3 hidden sm:table-cell">
                        {inq.service ? <span className="text-xs bg-blue-500/10 text-blue-400 px-2 py-1 rounded-full">{inq.service}</span> : <span className="text-xs text-text-muted">—</span>}
                      </td>
                      <td className="px-6 py-3 text-right text-xs text-text-muted">
                        {new Date(inq.submitted_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
