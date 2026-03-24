const express = require('express');
const router = express.Router();
const { db } = require('../config/firebase');
const { authenticate, requireAdmin } = require('../middleware/auth');

// POST /api/inquiries — Public: submit a contact/inquiry form
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, service, message } = req.body;
    if (!name || !email || !message) return res.status(400).json({ error: 'Name, email, and message are required.' });

    const data = { name, email, phone: phone || null, service: service || null, message, is_read: false, submitted_at: new Date().toISOString() };
    const ref = await db.collection('inquiries').add(data);
    res.status(201).json({ id: ref.id, message: 'Inquiry submitted successfully. We will get back to you soon!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/inquiries — Admin: list all inquiries
router.get('/', authenticate, requireAdmin, async (req, res) => {
  try {
    const snapshot = await db.collection('inquiries').orderBy('submitted_at', 'desc').get();
    const inquiries = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(inquiries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/inquiries/:id/read — Admin: mark as read
router.put('/:id/read', authenticate, requireAdmin, async (req, res) => {
  try {
    await db.collection('inquiries').doc(req.params.id).update({ is_read: true });
    res.json({ message: 'Marked as read.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/inquiries/:id (Admin)
router.delete('/:id', authenticate, requireAdmin, async (req, res) => {
  try {
    await db.collection('inquiries').doc(req.params.id).delete();
    res.json({ message: 'Inquiry deleted.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
