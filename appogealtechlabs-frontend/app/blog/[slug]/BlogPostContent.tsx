'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { 
  Calendar, 
  Clock, 
  Tag,
  Facebook,
  Twitter,
  Linkedin,
  Link as LinkIcon,
  ArrowLeft,
  ThumbsUp,
  Eye,
  ChevronUp,
  List,
  Check
} from 'lucide-react';
import Link from 'next/link';
import api, { endpoints } from '@/lib/api';
import type { BlogPost } from '@/types';

interface TocHeading {
  id: string;
  text: string;
  level: number;
}

export default function BlogPostContent() {
  const params = useParams();
  const slug = typeof params?.slug === 'string' ? params.slug : '';
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [readProgress, setReadProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [tocHeadings, setTocHeadings] = useState<TocHeading[]>([]);
  const [activeHeading, setActiveHeading] = useState('');
  const [copied, setCopied] = useState(false);
  const articleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!slug) return;
    const fetchPost = async () => {
      try {
        const response = await api.get(`${endpoints.blog.posts}/${slug}`);
        setPost(response.data);
      } catch (err) {
        console.error('Failed to fetch blog post:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [slug]);

  // Parse headings for Table of Contents after content renders
  useEffect(() => {
    if (!post?.content) return;
    const parser = new DOMParser();
    const doc = parser.parseFromString(post.content, 'text/html');
    const headings = Array.from(doc.querySelectorAll('h2, h3'));
    const toc: TocHeading[] = headings.map((h, i) => {
      const id = h.id || `heading-${i}`;
      return { id, text: h.textContent || '', level: parseInt(h.tagName[1]) };
    });
    setTocHeadings(toc);

    // Inject IDs into the rendered article headings
    setTimeout(() => {
      if (!articleRef.current) return;
      const rendered = articleRef.current.querySelectorAll('h2, h3');
      rendered.forEach((h, i) => {
        if (!h.id) h.id = `heading-${i}`;
      });
    }, 100);
  }, [post]);

  // Scroll progress + active heading + back to top
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setReadProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
      setShowBackToTop(scrollTop > 400);

      if (!articleRef.current) return;
      const headings = articleRef.current.querySelectorAll('h2, h3');
      let current = '';
      headings.forEach((h) => {
        const el = h as HTMLElement;
        if (el.offsetTop - 120 <= scrollTop) current = el.id;
      });
      setActiveHeading(current);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const scrollToHeading = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({ top: el.offsetTop - 100, behavior: 'smooth' });
    }
  };

  const handleShare = (platform: string) => {
    if (typeof window === 'undefined' || !post) return;
    const url = window.location.href;
    const text = post.title;
    const shareUrls: Record<string, string> = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    };
    if (shareUrls[platform]) window.open(shareUrls[platform], '_blank', 'width=600,height=400');
  };

  const copyLink = async () => {
    if (typeof navigator === 'undefined') return;
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="single-blog-page">
        <div className="animate-pulse w-full max-w-4xl mx-auto space-y-8 pt-12">
          <div className="h-8 bg-gray-700/50 w-32 rounded-lg"></div>
          <div className="h-14 bg-gray-700/50 w-3/4 rounded-lg"></div>
          <div className="h-6 bg-gray-700/50 w-1/2 rounded-lg"></div>
          <div className="h-[480px] bg-gray-700/50 rounded-2xl"></div>
          <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-4 bg-gray-700/50 rounded" style={{ width: `${90 - i * 5}%` }}></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center">
        <div className="text-7xl mb-6">📄</div>
        <h1 className="text-4xl font-bold text-accent mb-4">Post Not Found</h1>
        <p className="text-text-secondary mb-8 max-w-md">The article you're looking for does not exist or may have been removed.</p>
        <Link href="/blog" className="btn-primary inline-flex items-center gap-2">
          <ArrowLeft size={18} /> Back to Blog
        </Link>
      </div>
    );
  }

  const authorName = post.author || 'Appogeal Tech';
  const authorInitial = authorName.charAt(0).toUpperCase();

  return (
    <>
      {/* Reading Progress Bar */}
      <div className="reading-progress-bar" style={{ width: `${readProgress}%` }} />

      <div className="single-blog-page">
        <article className="blog-article">
          <div className="blog-article-container">

            {/* Back Button */}
            <Link href="/blog" className="back-button">
              <ArrowLeft size={18} />
              Back to Blog
            </Link>

            {/* Article Header */}
            <header className="article-header">
              <div className="article-meta-top">
                <span className="article-category-badge">
                  {post.category?.name || 'Technology'}
                </span>
                <span className="meta-dot">•</span>
                <span className="article-date">
                  <Calendar size={14} />
                  {new Date(post.published_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </span>
                <span className="meta-dot">•</span>
                <span className="article-read-time">
                  <Clock size={14} />
                  {post.read_time || 5} min read
                </span>
                <span className="meta-dot">•</span>
                <span className="article-views">
                  <Eye size={14} />
                  {(post.views || 0).toLocaleString()} views
                </span>
              </div>

              <h1 className="article-title">{post.title}</h1>
              <p className="article-excerpt">{post.excerpt}</p>

              {/* Author + Share Row */}
              <div className="article-author">
                <div className="author-info">
                  <div className="author-avatar">{authorInitial}</div>
                  <div>
                    <div className="author-name">{authorName}</div>
                    <div className="author-role">Author · Appogealtechlabs</div>
                  </div>
                </div>
                <div className="header-share-buttons">
                  <button onClick={() => handleShare('twitter')} className="share-icon-btn" title="Share on X/Twitter"><Twitter size={16} /></button>
                  <button onClick={() => handleShare('linkedin')} className="share-icon-btn" title="Share on LinkedIn"><Linkedin size={16} /></button>
                  <button onClick={() => handleShare('facebook')} className="share-icon-btn" title="Share on Facebook"><Facebook size={16} /></button>
                  <button onClick={copyLink} className={`share-icon-btn copy-btn ${copied ? 'copied' : ''}`} title="Copy link">
                    {copied ? <Check size={16} /> : <LinkIcon size={16} />}
                  </button>
                </div>
              </div>
            </header>

            {/* Featured Image */}
            <div className="article-featured-image">
              {post.image ? (
                <Image src={post.image} alt={post.title} fill className="object-cover" priority />
              ) : (
                <div className="article-no-image">
                  <span className="text-5xl">📰</span>
                  <span className="text-text-secondary mt-3">No image available</span>
                </div>
              )}
              <div className="article-image-overlay" />
            </div>

            {/* Content + Sidebar */}
            <div className="article-content-wrapper">

              {/* Main Content */}
              <div className="article-main-content">
                <div
                  ref={articleRef}
                  className="article-body"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="article-tags-section">
                    <div className="tags-label">
                      <Tag size={16} />
                      Tags
                    </div>
                    <div className="tags-list">
                      {post.tags.map((tag, index) => {
                        const tagKey = typeof tag === 'object' && tag !== null && (tag as any).id ? (tag as any).id : `post-tag-${index}`;
                        const tagName = typeof tag === 'object' && tag !== null ? (tag as any).name : String(tag);
                        const tagSlug = typeof tag === 'object' && tag !== null ? ((tag as any).slug || tagName) : tagName;
                        return (
                          <Link key={tagKey} href={`/blog?tag=${tagSlug}`} className="tag-pill-link">
                            #{tagName}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Author Bio Card */}
                <div className="author-bio-card">
                  <div className="author-bio-avatar">{authorInitial}</div>
                  <div className="author-bio-info">
                    <h3 className="author-bio-name">{authorName}</h3>
                    <span className="author-bio-role">Content Writer · Appogealtechlabs</span>
                    <p className="author-bio-desc">Sharing insights on the latest in web development, UI/UX design, and modern tech solutions at Appogealtechlabs.</p>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <aside className="article-sidebar">

                {/* Table of Contents */}
                {tocHeadings.length > 0 && (
                  <div className="sidebar-widget toc-widget">
                    <h3 className="widget-title">
                      <List size={18} />
                      Table of Contents
                    </h3>
                    <nav className="toc-nav">
                      {tocHeadings.map((h) => (
                        <button
                          key={h.id}
                          onClick={() => scrollToHeading(h.id)}
                          className={`toc-item toc-level-${h.level} ${activeHeading === h.id ? 'toc-active' : ''}`}
                        >
                          {h.text}
                        </button>
                      ))}
                    </nav>
                  </div>
                )}

                {/* Article Stats */}
                <div className="sidebar-widget stats-widget">
                  <h3 className="widget-title">
                    <Eye size={18} />
                    Article Stats
                  </h3>
                  <div className="stats-grid">
                    <div className="stat-card">
                      <div className="stat-value">{(post.views || 0).toLocaleString()}</div>
                      <div className="stat-label">Total Views</div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-value">{post.read_time || 5}</div>
                      <div className="stat-label">Min Read</div>
                    </div>
                  </div>
                </div>

                {/* Share Widget */}
                <div className="sidebar-widget share-widget">
                  <h3 className="widget-title">Share Article</h3>
                  <div className="share-buttons-column">
                    <button className="share-btn-social twitter-btn" onClick={() => handleShare('twitter')}>
                      <Twitter size={18} /> Share on X/Twitter
                    </button>
                    <button className="share-btn-social linkedin-btn" onClick={() => handleShare('linkedin')}>
                      <Linkedin size={18} /> Share on LinkedIn
                    </button>
                    <button className="share-btn-social facebook-btn" onClick={() => handleShare('facebook')}>
                      <Facebook size={18} /> Share on Facebook
                    </button>
                    <button className={`share-btn-social copy-link-btn ${copied ? 'copied' : ''}`} onClick={copyLink}>
                      {copied ? <Check size={18} /> : <LinkIcon size={18} />}
                      {copied ? 'Link Copied!' : 'Copy Link'}
                    </button>
                  </div>
                </div>

              </aside>
            </div>
          </div>
        </article>

        {/* Back to Top Button */}
        <button
          onClick={scrollToTop}
          className={`back-to-top-btn ${showBackToTop ? 'visible' : ''}`}
          aria-label="Back to top"
        >
          <ChevronUp size={22} />
        </button>
      </div>
    </>
  );
}
