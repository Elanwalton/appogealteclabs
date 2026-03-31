const express = require('express');
const router = express.Router();
const { db } = require('../config/firebase');

// POST /api/newsletter/subscribe
router.post('/subscribe', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'Email is required.' });

    // Check if already subscribed
    const existing = await db.collection('newsletter').where('email', '==', email).limit(1).get();
    if (!existing.empty) return res.status(400).json({ error: 'Email is already subscribed.' });

    await db.collection('newsletter').add({ email, subscribed_at: new Date().toISOString(), is_active: true });
    res.status(201).json({ message: 'Successfully subscribed!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/newsletter/unsubscribe
router.post('/unsubscribe', async (req, res) => {
  try {
    const { email } = req.body;
    const snapshot = await db.collection('newsletter').where('email', '==', email).limit(1).get();
    if (snapshot.empty) return res.status(404).json({ error: 'Email not found.' });
    await snapshot.docs[0].ref.update({ is_active: false });
    res.json({ message: 'Successfully unsubscribed.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/newsletter/subscribers — Admin: list all subscribers
const { authenticate, requireAdmin } = require('../middleware/auth');
router.get('/subscribers', authenticate, requireAdmin, async (req, res) => {
  try {
    const snapshot = await db.collection('newsletter').orderBy('subscribed_at', 'desc').get();
    const subscribers = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(subscribers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/newsletter/subscribers/:id — Admin
router.delete('/subscribers/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    await db.collection('newsletter').doc(req.params.id).delete();
    res.json({ message: 'Subscriber removed.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

