const express = require('express');
const router = express.Router();
const { db } = require('../config/firebase');
const { authenticate, requireAdmin } = require('../middleware/auth');

// GET /api/team
router.get('/', async (req, res) => {
  try {
    const snapshot = await db.collection('team_members').where('is_active', '==', true).orderBy('order_index').get();
    const members = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(members);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/team (Admin)
router.post('/', authenticate, requireAdmin, async (req, res) => {
  try {
    const { name, role, bio, image, skills, social, order_index } = req.body;
    const data = { 
      name, role, bio: bio || '', image: image || null, 
      skills: skills || [], social: social || {}, 
      order_index: order_index || 99, is_active: true, created_at: new Date().toISOString() 
    };
    const ref = await db.collection('team_members').add(data);
    res.status(201).json({ id: ref.id, ...data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/team/:id (Admin)
router.put('/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    await db.collection('team_members').doc(req.params.id).update({ ...req.body, updated_at: new Date().toISOString() });
    res.json({ message: 'Team member updated.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/team/:id (Admin)
router.delete('/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    await db.collection('team_members').doc(req.params.id).delete();
    res.json({ message: 'Team member deleted.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
