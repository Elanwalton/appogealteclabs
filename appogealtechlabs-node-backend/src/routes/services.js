const express = require('express');
const router = express.Router();
const { db } = require('../config/firebase');
const { authenticate, requireAdmin } = require('../middleware/auth');
const slugify = require('../utils/slugify');

// GET /api/services
router.get('/', async (req, res) => {
  try {
    const snapshot = await db.collection('services').where('is_active', '==', true).get();
    const services = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(services);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/services/:slug
router.get('/:slug', async (req, res) => {
  try {
    const snapshot = await db.collection('services').where('slug', '==', req.params.slug).limit(1).get();
    if (snapshot.empty) return res.status(404).json({ error: 'Service not found.' });
    const doc = snapshot.docs[0];
    res.json({ id: doc.id, ...doc.data() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/services (Admin)
router.post('/', authenticate, requireAdmin, async (req, res) => {
  try {
    const { name, description, icon, packages } = req.body;
    const slug = slugify(name);
    const data = { name, slug, description, icon: icon || '', packages: packages || [], is_active: true, created_at: new Date().toISOString() };
    const ref = await db.collection('services').add(data);
    res.status(201).json({ id: ref.id, ...data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/services/:id (Admin)
router.put('/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    const updates = { ...req.body, updated_at: new Date().toISOString() };
    if (updates.name) updates.slug = slugify(updates.name);
    await db.collection('services').doc(req.params.id).update(updates);
    res.json({ message: 'Service updated.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/services/:id (Admin)
router.delete('/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    await db.collection('services').doc(req.params.id).delete();
    res.json({ message: 'Service deleted.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
