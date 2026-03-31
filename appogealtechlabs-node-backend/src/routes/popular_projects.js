const express = require('express');
const router = express.Router();
const { db } = require('../config/firebase');
const { authenticate, requireAdmin } = require('../middleware/auth');

// GET /api/popular-projects
router.get('/', async (req, res) => {
  try {
    const snapshot = await db.collection('popular_projects').where('is_active', '==', true).orderBy('order_index').get();
    const projects = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/popular-projects (Admin)
router.post('/', authenticate, requireAdmin, async (req, res) => {
  try {
    const { name, description, approximate_price, order_index } = req.body;
    const data = { 
      name, description, approximate_price,
      order_index: order_index || 99, 
      is_active: true, 
      created_at: new Date().toISOString() 
    };
    const ref = await db.collection('popular_projects').add(data);
    res.status(201).json({ id: ref.id, ...data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/popular-projects/:id (Admin)
router.put('/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    await db.collection('popular_projects').doc(req.params.id).update({ ...req.body, updated_at: new Date().toISOString() });
    res.json({ message: 'Project updated.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/popular-projects/:id (Admin)
router.delete('/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    await db.collection('popular_projects').doc(req.params.id).delete();
    res.json({ message: 'Project deleted.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
