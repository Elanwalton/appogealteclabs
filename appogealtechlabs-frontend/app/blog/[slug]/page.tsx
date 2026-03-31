import type { Metadata, ResolvingMetadata } from 'next';
import BlogPostContent from './BlogPostContent';
import Script from 'next/script';

type Props = {
  params: { slug: string }
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

async function getPost(slug: string) {
  try {
    const res = await fetch(`${API_URL}/blog/posts/${slug}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error('Failed to fetch post for metadata:', error);
    return null;
  }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const post = await getPost(params.slug);

  if (!post) {
    return {
      title: 'Post Not Found | AppogealTechLabs',
      description: 'The requested blog post could not be found.',
    };
  }

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.image ? [post.image, ...previousImages] : previousImages,
      type: 'article',
      publishedTime: post.published_at,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: post.image ? [post.image] : [],
    },
  };
}

export default async function Page({ params }: Props) {
  const post = await getPost(params.slug);

  const jsonLd = post
    ? {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        description: post.excerpt,
        image: post.image || undefined,
        datePublished: post.published_at,
        dateModified: post.updated_at || post.published_at,
        author: {
          '@type': 'Organization',
          name: 'AppogealTechLabs',
          url: 'https://appogealtechlabs.com',
        },
        publisher: {
          '@type': 'Organization',
          name: 'AppogealTechLabs',
          url: 'https://appogealtechlabs.com',
        },
      }
    : null;

  return (
    <>
      {jsonLd && (
        <Script
          id="article-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <BlogPostContent />
    </>
  );
}

