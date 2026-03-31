'use client';

import { useEffect, useMemo } from 'react';
import { CheckCircle2, XCircle, AlertCircle, Search } from 'lucide-react';

interface SEOChecklistProps {
  title: string;
  excerpt: string;
  content: string;
  slug: string;
  focusKeyword: string;
  image: string;
}

interface Check {
  id: string;
  label: string;
  pass: boolean;
  weight: number;
}

export default function SEOChecklist({ title, excerpt, content, slug, focusKeyword, image }: SEOChecklistProps) {
  const keyword = focusKeyword.toLowerCase().trim();
  const plainText = content.replace(/<[^>]+>/g, ' ').toLowerCase();
  const wordCount = plainText.split(/\s+/).filter(Boolean).length;

  const checks: Check[] = useMemo(() => {
    const kw = keyword;
    const words = plainText.split(/\s+/).filter(Boolean);
    const kwCount = kw ? words.filter(w => w.includes(kw)).length : 0;
    const kwDensity = words.length > 0 ? (kwCount / words.length) * 100 : 0;

    return [
      {
        id: 'kw-set',
        label: 'Focus keyword is set',
        pass: kw.length > 0,
        weight: 10,
      },
      {
        id: 'kw-title',
        label: 'Keyword appears in the title',
        pass: kw.length > 0 && title.toLowerCase().includes(kw),
        weight: 20,
      },
      {
        id: 'kw-meta',
        label: 'Keyword appears in the meta description',
        pass: kw.length > 0 && excerpt.toLowerCase().includes(kw),
        weight: 15,
      },
      {
        id: 'kw-slug',
        label: 'Keyword appears in the URL slug',
        pass: kw.length > 0 && slug.toLowerCase().includes(kw.replace(/\s+/g, '-')),
        weight: 10,
      },
      {
        id: 'title-length',
        label: `Title length is optimal (50–60 chars) — currently ${title.length}`,
        pass: title.length >= 50 && title.length <= 60,
        weight: 10,
      },
      {
        id: 'meta-length',
        label: `Meta description is optimal (120–155 chars) — currently ${excerpt.length}`,
        pass: excerpt.length >= 120 && excerpt.length <= 155,
        weight: 10,
      },
      {
        id: 'word-count',
        label: `Content length is 300+ words — currently ${wordCount}`,
        pass: wordCount >= 300,
        weight: 15,
      },
      {
        id: 'kw-density',
        label: `Keyword density is 1–3% — currently ${kwDensity.toFixed(1)}%`,
        pass: kw.length > 0 && kwDensity >= 1 && kwDensity <= 3,
        weight: 10,
      },
      {
        id: 'has-image',
        label: 'Featured image is set',
        pass: image.trim().length > 0,
        weight: 10,
      },
    ];
  }, [title, excerpt, content, slug, keyword, image, plainText, wordCount]);

  const totalWeight = checks.reduce((sum, c) => sum + c.weight, 0);
  const passedWeight = checks.filter(c => c.pass).reduce((sum, c) => sum + c.weight, 0);
  const score = Math.round((passedWeight / totalWeight) * 100);

  const scoreColor =
    score >= 80 ? 'text-green-400' : score >= 50 ? 'text-yellow-400' : 'text-red-400';

  const scoreLabel =
    score >= 80 ? 'Good' : score >= 50 ? 'Needs Improvement' : 'Poor';

  const passedCount = checks.filter(c => c.pass).length;

  return (
    <div className="bg-bg-secondary rounded-2xl border border-gray-800 p-6 sticky top-24">
      <div className="flex items-center gap-2 mb-4">
        <Search size={18} className="text-accent" />
        <h3 className="text-base font-bold text-text-primary">SEO Checklist</h3>
      </div>

      {/* Score Ring */}
      <div className="flex items-center gap-4 mb-6 p-4 bg-gray-900/60 rounded-xl">
        <div className={`text-4xl font-bold ${scoreColor}`}>{score}</div>
        <div>
          <div className={`text-sm font-semibold ${scoreColor}`}>{scoreLabel}</div>
          <div className="text-xs text-text-muted">{passedCount}/{checks.length} checks passed</div>
        </div>
        {/* Progress bar */}
        <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden ml-2">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              score >= 80 ? 'bg-green-500' : score >= 50 ? 'bg-yellow-500' : 'bg-red-500'
            }`}
            style={{ width: `${score}%` }}
          />
        </div>
      </div>

      {/* Focus Keyword display */}
      {keyword ? (
        <div className="mb-4 text-xs text-text-muted">
          Analyzing for: <span className="text-accent font-semibold">"{focusKeyword}"</span>
        </div>
      ) : (
        <div className="mb-4 text-xs text-yellow-400 flex items-center gap-1">
          <AlertCircle size={12} /> Enter a focus keyword above to unlock all checks
        </div>
      )}

      {/* Checks list */}
      <ul className="space-y-2.5">
        {checks.map((check) => (
          <li key={check.id} className="flex items-start gap-2.5">
            {check.pass ? (
              <CheckCircle2 size={16} className="text-green-400 shrink-0 mt-0.5" />
            ) : (
              <XCircle size={16} className="text-red-400 shrink-0 mt-0.5" />
            )}
            <span className={`text-xs leading-snug ${check.pass ? 'text-text-secondary' : 'text-text-muted'}`}>
              {check.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
