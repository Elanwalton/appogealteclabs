const express = require('express');
const router = express.Router();
const { db } = require('../config/firebase');
const { authenticate, requireAdmin } = require('../middleware/auth');
const slugify = require('../utils/slugify');

// GET /api/projects
router.get('/', async (req, res) => {
  try {
    const snapshot = await db.collection('projects').where('is_active', '==', true).orderBy('created_at', 'desc').get();
    const projects = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/projects/:slug
router.get('/:slug', async (req, res) => {
  try {
    const snapshot = await db.collection('projects').where('slug', '==', req.params.slug).limit(1).get();
    if (snapshot.empty) return res.status(404).json({ error: 'Project not found.' });
    const doc = snapshot.docs[0];
    res.json({ id: doc.id, ...doc.data() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/projects (Admin)
router.post('/', authenticate, requireAdmin, async (req, res) => {
  try {
    const { title, description, image, tech_stack, live_url, repo_url, featured } = req.body;
    const slug = slugify(title);
    const data = { title, slug, description, image: image || null, tech_stack: tech_stack || [], live_url: live_url || null, repo_url: repo_url || null, featured: featured || false, is_active: true, created_at: new Date().toISOString() };
    const ref = await db.collection('projects').add(data);
    res.status(201).json({ id: ref.id, ...data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/projects/:id (Admin)
router.put('/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    const updates = { ...req.body, updated_at: new Date().toISOString() };
    if (updates.title) updates.slug = slugify(updates.title);
    await db.collection('projects').doc(req.params.id).update(updates);
    res.json({ message: 'Project updated.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/projects/:id (Admin)
router.delete('/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    await db.collection('projects').doc(req.params.id).delete();
    res.json({ message: 'Project deleted.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
