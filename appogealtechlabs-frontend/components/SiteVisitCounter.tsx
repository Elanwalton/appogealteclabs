'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import api from '@/lib/api';
import { Eye } from 'lucide-react';

export default function SiteVisitCounter() {
  const [visits, setVisits] = useState<number | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    // Skip recording visits on admin pages
    if (pathname.startsWith('/admin')) return;

    const recordAndFetch = async () => {
      try {
        // Record this visit
        await api.post('/analytics/visit', { page: pathname });
        // Fetch the updated total
        const res = await api.get('/analytics/stats');
        setVisits(res.data.total ?? 0);
      } catch {
        // silently fail — no crash on analytics errors
      }
    };

    recordAndFetch();
  }, [pathname]);

  if (visits === null) return null;

  return (
    <div className="flex items-center gap-2 text-text-secondary text-sm">
      <Eye size={14} className="text-accent shrink-0" />
      <span>
        <span className="font-bold text-accent tabular-nums">
          {visits.toLocaleString()}
        </span>
        {' '}site visits
      </span>
    </div>
  );
}
