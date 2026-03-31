const express = require('express');
const router = express.Router();
const { db } = require('../config/firebase');
const { authenticate, requireAdmin } = require('../middleware/auth');
const slugify = require('../utils/slugify');

// --- PUBLIC ROUTES ---

// GET /api/blog/categories
router.get('/categories', async (req, res) => {
  try {
    const snapshot = await db.collection('categories').get();
    const categories = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/blog/tags
router.get('/tags', async (req, res) => {
  try {
    const snapshot = await db.collection('tags').get();
    const tags = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(tags);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/blog/posts  (supports ?category=slug, ?tag=slug, ?featured=true, ?search=term)
router.get('/posts', async (req, res) => {
  try {
    let query = db.collection('posts').where('is_active', '==', true).orderBy('published_at', 'desc');

    if (req.query.featured === 'true') {
      query = query.where('featured', '==', true);
    }
    if (req.query.category) {
      query = query.where('category_slug', '==', req.query.category);
    }

    const snapshot = await query.get();
    let posts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    // Filter by tag (Firestore doesn't support array-contains with other where clauses easily)
    if (req.query.tag) {
      posts = posts.filter(p => p.tags && p.tags.includes(req.query.tag));
    }

    // Basic search filter
    if (req.query.search) {
      const term = req.query.search.toLowerCase();
      posts = posts.filter(p =>
        (p.title && p.title.toLowerCase().includes(term)) ||
        (p.excerpt && p.excerpt.toLowerCase().includes(term))
      );
    }

    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/blog/posts/id/:id  (admin — fetch by Firestore doc ID)
router.get('/posts/id/:id', async (req, res) => {
  try {
    const doc = await db.collection('posts').doc(req.params.id).get();
    if (!doc.exists) return res.status(404).json({ error: 'Post not found.' });
    res.json({ id: doc.id, ...doc.data() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/blog/posts/:slug
router.get('/posts/:slug', async (req, res) => {
  try {
    const snapshot = await db.collection('posts').where('slug', '==', req.params.slug).limit(1).get();
    if (snapshot.empty) return res.status(404).json({ error: 'Post not found.' });

    const doc = snapshot.docs[0];
    // Increment views
    await doc.ref.update({ views: (doc.data().views || 0) + 1 });
    res.json({ id: doc.id, ...doc.data(), views: (doc.data().views || 0) + 1 });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// --- ADMIN ROUTES ---

// POST /api/blog/posts
router.post('/posts', authenticate, requireAdmin, async (req, res) => {
  try {
    const { title, excerpt, content, image, category_slug, category_name, tags, featured, read_time } = req.body;
    const slug = slugify(title);
    const newPost = {
      title, slug, excerpt, content, image: image || null,
      focus_keyword: focus_keyword || null,
      category_slug: category_slug || null, category_name: category_name || null,
      tags: tags || [],
      author_uid: req.user.uid, author_email: req.user.email,
      featured: featured || false, read_time: read_time || 0,
      views: 0, is_active: is_active !== undefined ? is_active : true,
      published_at: new Date().toISOString(), updated_at: new Date().toISOString(),
    };
    const ref = await db.collection('posts').add(newPost);
    res.status(201).json({ id: ref.id, ...newPost });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/blog/posts/:id
router.put('/posts/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    const updates = { ...req.body, updated_at: new Date().toISOString() };
    if (updates.title) updates.slug = slugify(updates.title);
    await db.collection('posts').doc(req.params.id).update(updates);
    res.json({ message: 'Post updated.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/blog/posts/:id
router.delete('/posts/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    await db.collection('posts').doc(req.params.id).delete();
    res.json({ message: 'Post deleted.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/blog/categories
router.post('/categories', authenticate, requireAdmin, async (req, res) => {
  try {
    const { name } = req.body;
    const slug = slugify(name);
    const ref = await db.collection('categories').add({ name, slug });
    res.status(201).json({ id: ref.id, name, slug });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
