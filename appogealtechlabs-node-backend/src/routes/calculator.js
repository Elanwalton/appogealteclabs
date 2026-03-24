const express = require('express');
const router = express.Router();
const { db } = require('../config/firebase');
const { authenticate, requireAdmin } = require('../middleware/auth');

// GET /api/calculator/options — Public: get all calculator options
router.get('/options', async (req, res) => {
  try {
    const snapshot = await db.collection('calculator_options').where('is_active', '==', true).orderBy('category').get();
    const options = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    // Group by category
    const grouped = { type: [], feature: [] };
    options.forEach(opt => {
      if (grouped[opt.category] !== undefined) grouped[opt.category].push(opt);
    });

    res.json(grouped);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/calculator/options (Admin)
router.post('/options', authenticate, requireAdmin, async (req, res) => {
  try {
    const { category, name, label, price, description, icon } = req.body;
    if (!category || !name || !label || price === undefined) {
      return res.status(400).json({ error: 'category, name, label, and price are required.' });
    }
    const data = { category, name, label, price: parseFloat(price), description: description || '', icon: icon || '', is_active: true, created_at: new Date().toISOString() };
    const ref = await db.collection('calculator_options').add(data);
    res.status(201).json({ id: ref.id, ...data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/calculator/options/:id (Admin)
router.put('/options/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    const updates = { ...req.body, updated_at: new Date().toISOString() };
    if (updates.price) updates.price = parseFloat(updates.price);
    await db.collection('calculator_options').doc(req.params.id).update(updates);
    res.json({ message: 'Option updated.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/calculator/options/:id (Admin)
router.delete('/options/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    await db.collection('calculator_options').doc(req.params.id).delete();
    res.json({ message: 'Option deleted.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
