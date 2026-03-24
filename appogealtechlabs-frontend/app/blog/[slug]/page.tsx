import type { Metadata, ResolvingMetadata } from 'next';
import BlogPostContent from './BlogPostContent';

type Props = {
  params: { slug: string }
};

async function getPost(slug: string) {
  try {
    const res = await fetch(`http://127.0.0.1:8000/api/blog/posts/${slug}/`, {
      next: { revalidate: 60 } // Revalidate every 60 seconds
    });
    
    if (!res.ok) {
      return null;
    }
    
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
  const slug = params.slug;
  const post = await getPost(slug);

  if (!post) {
    return {
      title: 'Post Not Found | AppogealTechLabs',
      description: 'The requested blog post could not be found.'
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
      authors: [post.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: post.image ? [post.image] : [],
    },
  };
}

export default function Page({ params }: Props) {
  return <BlogPostContent />; 
}
