'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Search, 
  Calendar, 
  Clock, 
  Tag as TagIcon, 
  TrendingUp,
  BookOpen,
  ArrowRight,
  Filter
} from 'lucide-react';
import api, { endpoints } from '@/lib/api';
import type { BlogPost, BlogCategory, BlogTag } from '@/types';
import NewsletterForm from '@/components/NewsletterForm';

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [tags, setTags] = useState<BlogTag[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Posts');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postsRes, catsRes, tagsRes] = await Promise.all([
          api.get(endpoints.blog.posts),
          api.get(endpoints.blog.categories),
          api.get(endpoints.blog.tags)
        ]);
        setPosts(postsRes.data);
        setCategories(catsRes.data);
        setTags(tagsRes.data);
      } catch (error) {
        console.error('Failed to fetch blog data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All Posts' || post.category?.name === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPost = posts.find(post => post.featured);
  
  // Calculate category counts based on fetched posts
  const categoryCounts = categories.map(cat => ({
    name: cat.name,
    count: posts.filter(p => p.category?.id === cat.id).length
  }));
  
  // Prepend "All Posts"
  const allCategories = [
    { name: 'All Posts', count: posts.length },
    ...categoryCounts
  ];

  if (loading) {
    return (
        <div className="blog-page min-h-screen py-32 px-6 lg:px-8">
            <div className="max-w-[1440px] mx-auto animate-pulse space-y-8">
                <div className="h-12 bg-gray-700 w-1/3 mx-auto rounded"></div>
                <div className="h-64 bg-gray-700 w-full rounded-2xl"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[1,2,3,4,5,6].map(i => (
                        <div key={i} className="h-96 bg-gray-700 rounded-2xl"></div>
                    ))}
                </div>
            </div>
        </div>
    );
  }

  return (
    <div className="blog-page">
      <div className="blog-container">
        
        {/* Blog Header */}
        <div className="blog-header animate-fadeInUp">
          <span className="section-label">Our Blog</span>
          <h1 className="blog-title">Insights & Articles</h1>
          <p className="blog-description">
            Stay updated with the latest trends, tutorials, and insights 
            from our team of experts in web development, design, and technology.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="blog-controls animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
          <div className="search-container">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Search articles..."
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button 
            className="filter-toggle"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter />
            Filters
          </button>
        </div>

        {/* Categories Filter */}
        {showFilters && (
          <div className="categories-filter">
            {allCategories.map((category) => (
              <button
                key={category.name}
                className={`category-btn ${selectedCategory === category.name ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.name)}
              >
                {category.name}
                <span className="category-count">{category.count}</span>
              </button>
            ))}
          </div>
        )}

        <div className="blog-content">
          
          {/* Main Content */}
          <div className="blog-main">
            
            {/* Featured Post */}
            {featuredPost && selectedCategory === 'All Posts' && !searchQuery && (
              <article className="featured-post animate-fadeInScale">
                <div className="featured-image relative h-[400px]">
                    {featuredPost.image ? (
                        <Image 
                            src={featuredPost.image} 
                            alt={featuredPost.title} 
                            fill
                            className="object-cover"
                        />
                    ) : (
                         <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-500">No Image</div>
                    )}
                  <div className="featured-badge">
                    <TrendingUp />
                    Featured
                  </div>
                </div>
                <div className="featured-content">
                  <div className="post-meta">
                    <span className="post-category">{featuredPost.category?.name || 'General'}</span>
                    <span className="meta-divider">•</span>
                    <span className="post-date">
                      <Calendar size={14} />
                      {new Date(featuredPost.published_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                    <span className="meta-divider">•</span>
                    <span className="post-read-time">
                      <Clock size={14} />
                      {featuredPost.read_time} min read
                    </span>
                  </div>
                  <h2 className="featured-title">{featuredPost.title}</h2>
                  <p className="featured-excerpt">{featuredPost.excerpt}</p>
                  <div className="featured-footer">
                    <div className="post-author">
                      <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold">
                        {featuredPost.author.charAt(0).toUpperCase()}
                      </div>
                      <div className="author-info">
                        <span className="author-name">{featuredPost.author}</span>
                      </div>
                    </div>
                    <Link href={`/blog/${featuredPost.slug}`} className="read-more-btn">
                      Read Article
                      <ArrowRight size={18} />
                    </Link>
                  </div>
                </div>
              </article>
            )}

            {/* Blog Posts Grid */}
            <div className="blog-grid">
              {filteredPosts.filter(p => p.id !== (featuredPost?.id)).map((post, index) => (
                <article key={post.id} className="blog-card animate-fadeInUp" style={{ animationDelay: `${0.1 * (index + 1)}s` }}>
                  <div className="blog-card-image relative h-[200px]">
                    {post.image ? (
                        <Image 
                            src={post.image} 
                            alt={post.title} 
                            fill 
                            className="object-cover"
                        />
                    ) : (
                        <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-500">No Image</div>
                    )}
                    <div className="image-overlay">
                      <span className="overlay-category">{post.category?.name || 'General'}</span>
                    </div>
                  </div>
                  <div className="blog-card-content">
                    <div className="card-meta">
                      <span className="card-date">
                        <Calendar size={14} />
                        {new Date(post.published_at).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                      <span className="meta-divider">•</span>
                      <span className="card-read-time">
                        <Clock size={14} />
                        {post.read_time} min
                      </span>
                    </div>
                    <h3 className="card-title">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h3>
                    <p className="card-excerpt">{post.excerpt}</p>
                    <div className="card-tags">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span key={tag.id} className="tag-pill">{tag.name}</span>
                      ))}
                    </div>
                    <div className="card-footer">
                      <div className="card-author flex items-center gap-2">
                         <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center text-accent text-xs font-bold">
                            {post.author.charAt(0).toUpperCase()}
                         </div>
                        <span>{post.author}</span>
                      </div>
                      <Link href={`/blog/${post.slug}`} className="read-more-link">
                        Read More
                        <ArrowRight size={16} />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            
            {filteredPosts.length === 0 && (
                <div className="text-center py-20 text-gray-400">
                    No articles found matching your criteria.
                </div>
            )}

          </div>

          {/* Sidebar */}
          <aside className="blog-sidebar hidden lg:flex">
            
            {/* Newsletter Subscribe */}
            <div className="sidebar-widget newsletter-widget">
              <h3 className="widget-title">Subscribe to Our Newsletter</h3>
              <p className="widget-description">
                Get the latest articles and insights delivered to your inbox.
              </p>
              <NewsletterForm />
            </div>

            {/* Popular Posts */}
            <div className="sidebar-widget popular-posts-widget">
              <h3 className="widget-title">
                <TrendingUp size={20} />
                Popular Posts
              </h3>
              <div className="popular-posts-list">
                {[...posts].sort((a,b) => b.views - a.views).slice(0, 4).map((post) => (
                  <Link key={post.id} href={`/blog/${post.slug}`} className="popular-post-item">
                    <div className="popular-post-image relative w-20 h-20 shrink-0">
                      {post.image ? (
                        <Image src={post.image} alt={post.title} fill className="object-cover rounded-lg" />
                      ) : (
                        <div className="w-full h-full bg-gray-800 rounded-lg"></div>
                      )}
                    </div>
                    <div className="popular-post-content">
                      <h4 className="popular-post-title line-clamp-2">{post.title}</h4>
                      <div className="popular-post-meta">
                        <span className="popular-views">{post.views.toLocaleString()} views</span>
                        <span className="meta-divider">•</span>
                        <span className="popular-date">
                          {new Date(post.published_at).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div className="sidebar-widget categories-widget">
              <h3 className="widget-title">
                <BookOpen size={20} />
                Categories
              </h3>
              <ul className="categories-list">
                {allCategories.map((category) => (
                  <li key={category.name}>
                    <button
                      className={`category-link ${selectedCategory === category.name ? 'active' : ''}`}
                      onClick={() => setSelectedCategory(category.name)}
                    >
                      <span>{category.name}</span>
                      <span className="category-count">{category.count}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tags Cloud */}
            <div className="sidebar-widget tags-widget">
              <h3 className="widget-title">
                <TagIcon size={20} />
                Popular Tags
              </h3>
              <div className="tags-cloud">
                {tags.map((tag) => (
                  <button key={tag.id} className="tag-cloud-item">
                    {tag.name}
                  </button>
                ))}
              </div>
            </div>

          </aside>
        </div>

      </div>
    </div>
  );
}
