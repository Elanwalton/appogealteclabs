'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import BlogPostForm from '@/components/admin/BlogPostForm';
import api from '@/lib/api';
import { Loader2 } from 'lucide-react';

export default function EditBlogPostPage() {
  const params = useParams<{ id: string }>();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetch = async () => {
      try {
        // We need to get by ID directly - use the admin variant
        const res = await api.get(`/blog/posts/id/${params.id}`);
        setPost(res.data);
      } catch {
        setError('Post not found or failed to load.');
      } finally {
        setLoading(false);
      }
    };
    if (params.id) fetch();
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 size={32} className="animate-spin text-accent" />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="p-8 text-red-400">{error || 'Post not found.'}</div>
    );
  }

  return <BlogPostForm initialData={post} postId={params.id} />;
}
