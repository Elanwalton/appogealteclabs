'use client';

import { useEffect, ReactNode } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard,
  FileText,
  FolderOpen,
  Briefcase,
  Star,
  Mail,
  Users,
  BarChart2,
  LogOut,
  Loader2,
  ChevronRight,
  TrendingUp,
  HelpCircle,
} from 'lucide-react';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/blog', label: 'Blog Posts', icon: FileText },
  { href: '/admin/projects', label: 'Projects', icon: FolderOpen },
  { href: '/admin/popular-projects', label: 'Popular Projects', icon: TrendingUp },
  { href: '/admin/services', label: 'Services', icon: Briefcase },
  { href: '/admin/team', label: 'Team', icon: Users },
  { href: '/admin/faqs', label: 'FAQs', icon: HelpCircle },
  { href: '/admin/testimonials', label: 'Testimonials', icon: Star },
  { href: '/admin/inquiries', label: 'Inquiries', icon: Mail },
  { href: '/admin/newsletter', label: 'Newsletter', icon: Users },
  { href: '/admin/analytics', label: 'Analytics', icon: BarChart2 },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { user, isAdmin, loading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      router.push('/login');
    }
  }, [loading, user, isAdmin, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-primary">
        <Loader2 size={40} className="animate-spin text-accent" />
      </div>
    );
  }

  if (!user || !isAdmin) return null;

  return (
    <div className="min-h-screen bg-bg-primary flex">
      {/* Sidebar */}
      <aside className="w-64 bg-bg-secondary border-r border-gray-800 flex flex-col fixed top-0 left-0 h-full z-40 pt-16">
        <div className="p-6 border-b border-gray-800">
          <p className="text-xs text-text-muted uppercase tracking-widest font-semibold mb-1">Admin Panel</p>
          <p className="text-sm text-text-secondary truncate">{user.email}</p>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || (href !== '/admin' && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                  active
                    ? 'bg-accent/10 text-accent'
                    : 'text-text-secondary hover:text-text-primary hover:bg-gray-800'
                }`}
              >
                <Icon size={18} />
                <span>{label}</span>
                {active && <ChevronRight size={14} className="ml-auto" />}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-gray-800">
          <button
            onClick={logout}
            className="flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-all"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 ml-64 pt-16 min-h-screen">
        {children}
      </main>
    </div>
  );
}
