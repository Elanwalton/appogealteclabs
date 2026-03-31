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
    const { 
      title, tagline, description, image, heroImage, client, category, tags, duration, teamSize, completedDate,
      overview, challenge, solution, techStack, results, testimonial,
      liveUrl, repoUrl, githubUrl, featured, relatedProjects 
    } = req.body;
    
    const slug = slugify(title);
    const data = { 
      title, slug, tagline: tagline || '', description: description || '',
      image: image || null, heroImage: heroImage || null, client: client || null,
      category: category || 'Development', tags: tags || [], duration: duration || '', 
      teamSize: teamSize || 1, completedDate: completedDate || null,
      overview: overview || '', challenge: challenge || null, solution: solution || null,
      techStack: techStack || null, results: results || null, testimonial: testimonial || null,
      liveUrl: liveUrl || null, repoUrl: repoUrl || githubUrl || null, githubUrl: githubUrl || repoUrl || null,
      featured: featured || false, relatedProjects: relatedProjects || [],
      is_active: true, created_at: new Date().toISOString() 
    };
    
    // Backwards compatibility for older fields
    if (req.body.tech_stack) data.tech_stack = req.body.tech_stack;
    if (req.body.live_url) data.liveUrl = req.body.live_url;
    if (req.body.repo_url) data.githubUrl = req.body.repo_url;
    
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
