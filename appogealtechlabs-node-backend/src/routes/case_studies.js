const express = require('express');
const router = express.Router();
const { db } = require('../config/firebase');
const { authenticate, requireAdmin } = require('../middleware/auth');
const slugify = require('../utils/slugify');

// GET /api/case-studies
router.get('/', async (req, res) => {
  try {
    const snapshot = await db.collection('case_studies').orderBy('created_at', 'desc').get();
    const records = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(records);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/case-studies/:id
router.get('/:id', async (req, res) => {
  try {
    const doc = await db.collection('case_studies').doc(req.params.id).get();
    if (!doc.exists) return res.status(404).json({ error: 'Case study not found.' });
    res.json({ id: doc.id, ...doc.data() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/case-studies (Admin)
router.post('/', authenticate, requireAdmin, async (req, res) => {
  try {
    const { title, client, metric, content, industry, image } = req.body;
    const slug = slugify(title);
    const data = { 
      title, slug, client, metric, content: content || '', 
      industry: industry || '', image: image || null,
      created_at: new Date().toISOString() 
    };
    const ref = await db.collection('case_studies').add(data);
    res.status(201).json({ id: ref.id, ...data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/case-studies/:id (Admin)
router.put('/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    const updates = { ...req.body, updated_at: new Date().toISOString() };
    if (updates.title) updates.slug = slugify(updates.title);
    await db.collection('case_studies').doc(req.params.id).update(updates);
    res.json({ message: 'Case study updated.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/case-studies/:id (Admin)
router.delete('/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    await db.collection('case_studies').doc(req.params.id).delete();
    res.json({ message: 'Case study deleted.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
