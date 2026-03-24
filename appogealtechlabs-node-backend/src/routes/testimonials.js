const express = require('express');
const router = express.Router();
const { db } = require('../config/firebase');
const { authenticate, requireAdmin } = require('../middleware/auth');

// GET /api/testimonials
router.get('/', async (req, res) => {
  try {
    const snapshot = await db.collection('testimonials').where('is_active', '==', true).orderBy('created_at', 'desc').get();
    const testimonials = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/testimonials (Admin)
router.post('/', authenticate, requireAdmin, async (req, res) => {
  try {
    const { client_name, client_title, client_company, content, rating, avatar } = req.body;
    const data = { client_name, client_title: client_title || '', client_company: client_company || '', content, rating: rating || 5, avatar: avatar || null, is_active: true, created_at: new Date().toISOString() };
    const ref = await db.collection('testimonials').add(data);
    res.status(201).json({ id: ref.id, ...data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/testimonials/:id (Admin)
router.put('/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    await db.collection('testimonials').doc(req.params.id).update({ ...req.body, updated_at: new Date().toISOString() });
    res.json({ message: 'Testimonial updated.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/testimonials/:id (Admin)
router.delete('/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    await db.collection('testimonials').doc(req.params.id).delete();
    res.json({ message: 'Testimonial deleted.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
