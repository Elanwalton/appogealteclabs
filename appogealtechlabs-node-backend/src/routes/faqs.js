const express = require('express');
const router = express.Router();
const { db } = require('../config/firebase');
const { authenticate, requireAdmin } = require('../middleware/auth');

// GET /api/faqs
router.get('/', async (req, res) => {
  try {
    // Optional query param: ?category=services (to fetch service-specific FAQs)
    let query = db.collection('faqs').where('is_active', '==', true);
    if (req.query.category) {
      query = query.where('category', '==', req.query.category);
    }
    const snapshot = await query.orderBy('order_index').get();
    const faqs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(faqs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/faqs (Admin)
router.post('/', authenticate, requireAdmin, async (req, res) => {
  try {
    const { question, answer, category, order_index } = req.body;
    const data = { 
      question, answer, category: category || 'general',
      order_index: order_index || 99, is_active: true, created_at: new Date().toISOString() 
    };
    const ref = await db.collection('faqs').add(data);
    res.status(201).json({ id: ref.id, ...data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/faqs/:id (Admin)
router.put('/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    await db.collection('faqs').doc(req.params.id).update({ ...req.body, updated_at: new Date().toISOString() });
    res.json({ message: 'FAQ updated.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/faqs/:id (Admin)
router.delete('/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    await db.collection('faqs').doc(req.params.id).delete();
    res.json({ message: 'FAQ deleted.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
