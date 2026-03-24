import os
import django
from django.utils import timezone

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'appogealtechlabs.settings')
django.setup()

from django.contrib.auth import get_user_model
from apps.blog.models import Post, Category, Tag

User = get_user_model()

# Create superuser if not exists (for author)
if not User.objects.filter(username='admin').exists():
    print("Creating superuser 'admin'...")
    user = User.objects.create_superuser('admin', 'admin@example.com', 'admin')
else:
    print("Using existing superuser 'admin'")
    user = User.objects.get(username='admin')

# Categories
cats = ['Web Development', 'Design', 'Backend', 'Mobile']
categories = {}
print("Creating categories...")
for name in cats:
    cat, created = Category.objects.get_or_create(name=name)
    categories[name] = cat

# Tags
tagnames = ['Next.js', 'Django', 'React', 'Tailwind', 'API']
tags = {}
print("Creating tags...")
for name in tagnames:
    tag, created = Tag.objects.get_or_create(name=name)
    tags[name] = tag

# Posts
posts_data = [
    {
        'title': 'Building Scalable Web Apps with Next.js and Django',
        'content': '<h2>Introduction</h2><p>Learn how to build scalable apps...</p><p>Next.js and Django work great together.</p>',
        'excerpt': 'Learn how to build scalable apps with Next.js and Django.',
        'category': 'Web Development',
        'tags': ['Next.js', 'Django', 'React'],
        'featured': True,
        'read_time': 5
    },
    {
        'title': 'UI/UX Trends in 2026',
        'content': '<h2>Design Trends</h2><p>Discover the latest design trends for 2026.</p>',
        'excerpt': 'Discover the latest design trends for the upcoming year.',
        'category': 'Design',
        'tags': ['Tailwind'],
        'featured': False,
        'read_time': 3
    }
]

print("Creating posts...")
for p_data in posts_data:
    post, created = Post.objects.get_or_create(
        title=p_data['title'],
        defaults={
            'content': p_data['content'],
            'excerpt': p_data['excerpt'],
            'author': user,
            'category': categories[p_data['category']],
            'read_time': p_data['read_time'],
            'featured': p_data['featured']
        }
    )
    if created:
        for tag_name in p_data['tags']:
            post.tags.add(tags[tag_name])
        print(f"Created post: {post.title}")
    else:
        print(f"Post already exists: {post.title}")

print("Done!")
