const express = require('express');
const router = express.Router();
const { db } = require('../config/firebase');
const { authenticate, requireAdmin } = require('../middleware/auth');
const slugify = require('../utils/slugify');

// GET /api/documentation
router.get('/', async (req, res) => {
  try {
    const snapshot = await db.collection('documentation').orderBy('order', 'asc').get();
    const records = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(records);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/documentation/:id
router.get('/:id', async (req, res) => {
  try {
    // Try by ID first, then by slug if not found
    let doc = await db.collection('documentation').doc(req.params.id).get();
    
    if (!doc.exists) {
      const snapshot = await db.collection('documentation').where('slug', '==', req.params.id).limit(1).get();
      if (snapshot.empty) return res.status(404).json({ error: 'Documentation not found.' });
      doc = snapshot.docs[0];
      return res.json({ id: doc.id, ...doc.data() });
    }
    
    res.json({ id: doc.id, ...doc.data() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/documentation (Admin)
router.post('/', authenticate, requireAdmin, async (req, res) => {
  try {
    const { title, description, content, section, icon, order } = req.body;
    const slug = slugify(title);
    const data = { 
      title, slug, description: description || '', content: content || '', 
      section: section || 'General', icon: icon || 'BookOpen', 
      order: order || 0,
      created_at: new Date().toISOString() 
    };
    const ref = await db.collection('documentation').add(data);
    res.status(201).json({ id: ref.id, ...data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/documentation/:id (Admin)
router.put('/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    const updates = { ...req.body, updated_at: new Date().toISOString() };
    if (updates.title) updates.slug = slugify(updates.title);
    await db.collection('documentation').doc(req.params.id).update(updates);
    res.json({ message: 'Documentation updated.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/documentation/:id (Admin)
router.delete('/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    await db.collection('documentation').doc(req.params.id).delete();
    res.json({ message: 'Documentation deleted.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
