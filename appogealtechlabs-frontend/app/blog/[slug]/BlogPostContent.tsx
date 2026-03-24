'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
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
  MessageSquare,
  ThumbsUp,
  Bookmark,
  Github
} from 'lucide-react';
import Link from 'next/link';
import api, { endpoints } from '@/lib/api';
import type { BlogPost } from '@/types';

export default function BlogPostContent() {
  const params = useParams();
  const slug = typeof params?.slug === 'string' ? params.slug : '';
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  
  useEffect(() => {
    if (!slug) return;
    
    const fetchPost = async () => {
      try {
        const response = await api.get(endpoints.blog.posts + slug + '/');
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

  const handleShare = (platform: string) => {
    if (typeof window === 'undefined' || !post) return;
    const url = window.location.href;
    const text = post.title;
    
    const shareUrls: Record<string, string> = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    };
    
    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
  };
  
  const copyLink = () => {
    if (typeof navigator === 'undefined') return;
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied to clipboard!');
  };

  if (loading) {
    return (
        <div className="single-blog-page min-h-screen py-32 px-6 lg:px-8 flex justify-center">
             <div className="animate-pulse w-full max-w-4xl space-y-8">
                 <div className="h-8 bg-gray-700 w-32 rounded"></div>
                 <div className="h-12 bg-gray-700 w-3/4 rounded"></div>
                 <div className="h-96 bg-gray-700 rounded-2xl"></div>
                 <div className="space-y-4">
                     <div className="h-4 bg-gray-700 rounded w-full"></div>
                     <div className="h-4 bg-gray-700 rounded w-full"></div>
                     <div className="h-4 bg-gray-700 rounded w-5/6"></div>
                 </div>
             </div>
        </div>
    );
  }

  if (error || !post) {
      return (
          <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center">
              <h1 className="text-4xl font-bold text-accent mb-4">Post Not Found</h1>
              <p className="text-text-secondary mb-8">The article you are looking for does not exist or has been removed.</p>
              <Link href="/blog" className="btn-primary">Back to Blog</Link>
          </div>
      );
  }

  return (
    <div className="single-blog-page max-w-5xl mx-auto px-6 py-24">
      
      {/* Blog Header */}
      <article className="blog-article">
        <div className="blog-article-container">
          
          {/* Back Button */}
          <Link href="/blog" className="back-button inline-flex items-center gap-2 text-accent hover:underline mb-8">
            <ArrowLeft size={20} />
            Back to Blog
          </Link>
          
          {/* Article Header */}
          <header className="article-header mb-12">
            <div className="article-meta-top flex items-center gap-3 text-sm text-text-muted mb-4">
              <span className="article-category text-accent font-medium">{post.category?.name || 'General'}</span>
              <span className="meta-divider">•</span>
              <span className="article-date flex items-center gap-1">
                <Calendar size={14} />
                {new Date(post.published_at).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </span>
              <span className="meta-divider">•</span>
              <span className="article-read-time flex items-center gap-1">
                <Clock size={14} />
                {post.read_time} min read
              </span>
            </div>
            
            <h1 className="article-title text-4xl md:text-5xl font-bold text-text-primary mb-6 leading-tight">{post.title}</h1>
            
            <p className="article-excerpt text-xl text-text-secondary leading-relaxed mb-8">{post.excerpt}</p>
            
            {/* Author Info */}
            <div className="article-author flex items-center justify-between border-y border-[rgba(100,255,218,0.1)] py-6">
              <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-accent text-lg font-bold">
                     {post.author.charAt(0).toUpperCase()}
                  </div>
                  <div className="author-details">
                    <div className="author-name font-bold text-text-primary">{post.author}</div>
                    <div className="author-role text-sm text-text-muted">Author</div>
                  </div>
              </div>
              
              {/* Social Share */}
              <div className="article-share flex gap-2">
                <button 
                  className="share-btn p-2 hover:bg-gray-800 rounded-full transition-colors text-text-secondary hover:text-accent"
                  onClick={() => handleShare('facebook')}
                  aria-label="Share on Facebook"
                >
                  <Facebook size={18} />
                </button>
                <button 
                  className="share-btn p-2 hover:bg-gray-800 rounded-full transition-colors text-text-secondary hover:text-accent"
                  onClick={() => handleShare('twitter')}
                  aria-label="Share on Twitter"
                >
                  <Twitter size={18} />
                </button>
                <button 
                  className="share-btn p-2 hover:bg-gray-800 rounded-full transition-colors text-text-secondary hover:text-accent"
                  onClick={() => handleShare('linkedin')}
                  aria-label="Share on LinkedIn"
                >
                  <Linkedin size={18} />
                </button>
                <button 
                  className="share-btn p-2 hover:bg-gray-800 rounded-full transition-colors text-text-secondary hover:text-accent"
                  onClick={copyLink}
                  aria-label="Copy link"
                >
                  <LinkIcon size={18} />
                </button>
              </div>
            </div>
          </header>
          
          {/* Featured Image */}
          <div className="article-featured-image relative h-[400px] md:h-[500px] w-full mb-12">
            {post.image ? (
                <Image 
                    src={post.image} 
                    alt={post.title} 
                    fill
                    className="object-cover rounded-2xl"
                />
            ) : (
                <div className="w-full h-full bg-gray-800 rounded-2xl flex items-center justify-center text-gray-500">No Image</div>
            )}
          </div>
          
          {/* Article Content */}
          <div className="article-content-wrapper flex flex-col lg:flex-row gap-12">
            
            {/* Main Content */}
            <div className="article-main-content lg:w-2/3">
              <div 
                className="article-body prose prose-invert prose-lg max-w-none prose-headings:text-text-primary prose-p:text-text-secondary prose-a:text-accent prose-strong:text-text-primary"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
              
              {/* Tags */}
              <div className="article-tags mt-12 flex items-center gap-4">
                <div className="tags-label flex items-center gap-2 text-text-primary font-bold">
                  <Tag size={18} />
                  Tags:
                </div>
                <div className="tags-list flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Link key={tag.id} href={`/blog?tag=${tag.slug}`} className="tag-item px-3 py-1 bg-gray-800 rounded-full text-sm text-text-secondary hover:bg-accent hover:text-bg-primary transition-colors">
                      {tag.name}
                    </Link>
                  ))}
                </div>
              </div>
              
              {/* Author Bio - simplified as we only have name/username from API right now */}
              <div className="author-bio-card mt-12 p-8 bg-bg-secondary rounded-2xl flex items-center gap-6 border border-[rgba(100,255,218,0.1)]">
                <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center text-accent text-2xl font-bold shrink-0">
                    {post.author.charAt(0).toUpperCase()}
                </div>
                <div className="author-bio-content">
                  <div className="author-bio-header mb-2">
                    <h3 className="author-bio-name text-xl font-bold text-text-primary">{post.author}</h3>
                    <span className="author-bio-role text-sm text-accent">Author</span>
                  </div>
                  <p className="author-bio-text text-text-secondary">Content creator at Appogealtechlabs.</p>
                </div>
              </div>
            </div>
            
            {/* Sticky Sidebar */}
            <aside className="article-sidebar lg:w-1/3 space-y-8">
              
              {/* Review/Action Stats - Currently static or need API support for likes/comments */}
              <div className="sidebar-widget bg-bg-secondary p-6 rounded-2xl border border-[rgba(100,255,218,0.1)]">
                <div className="flex justify-around">
                    <div className="stat-item flex flex-col items-center">
                    <div className="stat-icon text-accent mb-2">
                        <ThumbsUp size={24} />
                    </div>
                    <div className="stat-info text-center">
                        <div className="stat-number font-bold text-text-primary">--</div>
                        <div className="stat-label text-xs text-text-secondary">Likes</div>
                    </div>
                    </div>
                    <div className="stat-item flex flex-col items-center">
                    <div className="stat-icon text-accent mb-2">
                        <Bookmark size={24} />
                    </div>
                    <div className="stat-info text-center">
                        <div className="stat-number font-bold text-text-primary">{post.views.toLocaleString()}</div>
                        <div className="stat-label text-xs text-text-secondary">Views</div>
                    </div>
                    </div>
                </div>
              </div>
              
              {/* Share Widget */}
              <div className="sidebar-widget bg-bg-secondary p-6 rounded-2xl border border-[rgba(100,255,218,0.1)]">
                <h3 className="widget-title text-lg font-bold text-text-primary mb-4">Share This Article</h3>
                <div className="share-buttons flex flex-col gap-3">
                  <button className="share-btn-large facebook w-full py-2 bg-[#1877f2] text-white rounded-lg flex items-center justify-center gap-2 hover:opacity-90" onClick={() => handleShare('facebook')}>
                    <Facebook size={18} />
                    Facebook
                  </button>
                  <button className="share-btn-large twitter w-full py-2 bg-[#1da1f2] text-white rounded-lg flex items-center justify-center gap-2 hover:opacity-90" onClick={() => handleShare('twitter')}>
                    <Twitter size={18} />
                    Twitter
                  </button>
                  <button className="share-btn-large linkedin w-full py-2 bg-[#0077b5] text-white rounded-lg flex items-center justify-center gap-2 hover:opacity-90" onClick={() => handleShare('linkedin')}>
                    <Linkedin size={18} />
                    LinkedIn
                  </button>
                </div>
              </div>
              
            </aside>
            
          </div>
          
        </div>
      </article>
      
    </div>
  );
}
