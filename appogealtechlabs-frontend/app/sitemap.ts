import { MetadataRoute } from 'next';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

async function getBlogPosts() {
  try {
    const res = await fetch(`${API_URL}/blog/posts`, {
      next: { revalidate: 60 }
    });
    if (!res.ok) return [];
    const allPosts = await res.json();
    return allPosts.filter((p: any) => p.is_active); // Only map active posts to sitemap
  } catch (error) {
    console.error('Failed to fetch posts for sitemap:', error);
    return [];
  }
}


export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://appogealtechlabs.com';
  
  // Static routes
  const routes = [
    { path: '', priority: 1.0, freq: 'weekly' },
    { path: '/about', priority: 0.9, freq: 'monthly' },
    { path: '/services', priority: 0.95, freq: 'monthly' },
    { path: '/projects', priority: 0.9, freq: 'weekly' },
    { path: '/blog', priority: 0.9, freq: 'daily' },
    { path: '/contact', priority: 0.85, freq: 'monthly' },
    { path: '/cost-calculator', priority: 0.8, freq: 'monthly' },
    { path: '/case-studies', priority: 0.8, freq: 'weekly' },
    { path: '/tutorials', priority: 0.75, freq: 'weekly' },
    { path: '/documentation', priority: 0.7, freq: 'monthly' },
    { path: '/faq', priority: 0.7, freq: 'monthly' },
    { path: '/privacy-policy', priority: 0.3, freq: 'yearly' },
    { path: '/terms', priority: 0.3, freq: 'yearly' },
  ].map(({ path, priority, freq }) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: freq as any,
    priority,
  }));

  // Dynamic blog routes
  const posts = await getBlogPosts();
  const blogRoutes = posts.map((post: any) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updated_at || post.published_at),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [...routes, ...blogRoutes];
}
