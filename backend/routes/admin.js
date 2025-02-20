// routes/admin.js
const express = require('express');
const router = express.Router();
const db = require('../db');
const { basicAuth, adminAuth } = require('../middlewares/auth');

// All admin routes use basic auth followed by admin check
router.use(basicAuth);
router.use(adminAuth);

/**
 * @swagger
 * /api/admin/rooms:
 *   post:
 *     summary: Create a new room (by location) with a price
 *     security:
 *       - basicAuth: []
 *     requestBody:
 *       description: Room details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               location:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       201:
 *         description: Room created
 */
router.post('/rooms', async (req, res) => {
  const { location, price } = req.body;
  if (!location || !price)
    return res.status(400).json({ error: 'Missing room details' });
  try {
    const [id] = await db('rooms').insert({ location, price });
    res.status(201).json({ message: 'Room created', roomId: id });
  } catch (err) {
    res.status(500).json({ error: 'Room creation failed' });
  }
});

/**
 * @swagger
 * /api/admin/rooms/{id}:
 *   delete:
 *     summary: Delete a room by ID
 *     security:
 *       - basicAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Room deleted
 */
router.delete('/rooms/:id', async (req, res) => {
  const roomId = req.params.id;
  try {
    const count = await db('rooms').where({ id: roomId }).del();
    if (count) {
      res.status(200).json({ message: 'Room deleted' });
    } else {
      res.status(404).json({ error: 'Room not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Deletion failed' });
  }
});

/**
 * @swagger
 * /api/admin/bookings:
 *   get:
 *     summary: Get all bookings
 *     security:
 *       - basicAuth: []
 *     responses:
 *       200:
 *         description: List of all bookings
 */
router.get('/bookings', async (req, res) => {
  try {
    const bookings = await db('bookings');
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

/**
 * @swagger
 * /api/admin/bookings/{id}:
 *   delete:
 *     summary: Delete any booking by ID
 *     security:
 *       - basicAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Booking deleted
 */
router.delete('/bookings/:id', async (req, res) => {
  const bookingId = req.params.id;
  try {
    const count = await db('bookings').where({ id: bookingId }).del();
    if (count) {
      res.status(200).json({ message: 'Booking deleted' });
    } else {
      res.status(404).json({ error: 'Booking not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Deletion failed' });
  }
});

/**
 * @swagger
 * /api/admin/notifications:
 *   get:
 *     summary: Get admin notifications (dummy endpoint)
 *     security:
 *       - basicAuth: []
 *     responses:
 *       200:
 *         description: List of notifications
 */
router.get('/notifications', async (req, res) => {
  res.status(200).json([{ message: 'New booking received' }]);
});

module.exports = router;
