// routes/user.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../db');
const { basicAuth } = require('../middlewares/auth');

/**
 * @swagger
 * /api/user/register:
 *   post:
 *     summary: Register a new user
 *     requestBody:
 *       description: User credentials
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 */
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ error: 'Missing username or password' });
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await db('users').insert({ username, password: hashedPassword, isAdmin: false });
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: Log in an existing user (basic auth)
 *     responses:
 *       200:
 *         description: Logged in successfully
 */
router.post('/login', basicAuth, (req, res) => {
  res.status(200).json({ message: 'Logged in successfully' });
});

/**
 * @swagger
 * /api/user/bookings:
 *   post:
 *     summary: Create a new booking
 *     security:
 *       - basicAuth: []
 *     requestBody:
 *       description: Booking details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               location:
 *                 type: string
 *               bookingDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Booking created
 */
router.post('/bookings', basicAuth, async (req, res) => {
  const { location, bookingDate } = req.body;
  if (!location || !bookingDate)
    return res.status(400).json({ error: 'Missing booking details' });
  try {
    const [id] = await db('bookings').insert({
      user_id: req.user.id,
      location,
      booking_date: bookingDate,
    });
    res.status(201).json({ message: 'Booking created', bookingId: id });
  } catch (err) {
    res.status(500).json({ error: 'Booking creation failed' });
  }
});

/**
 * @swagger
 * /api/user/bookings:
 *   get:
 *     summary: Get bookings for the logged-in user
 *     security:
 *       - basicAuth: []
 *     responses:
 *       200:
 *         description: List of bookings
 */
router.get('/bookings', basicAuth, async (req, res) => {
  try {
    const bookings = await db('bookings').where({ user_id: req.user.id });
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

/**
 * @swagger
 * /api/user/bookings/{id}:
 *   delete:
 *     summary: Delete a booking by ID (only if it belongs to the user)
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
router.delete('/bookings/:id', basicAuth, async (req, res) => {
  const bookingId = req.params.id;
  try {
    const count = await db('bookings')
      .where({ id: bookingId, user_id: req.user.id })
      .del();
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
 * /api/user/notifications:
 *   get:
 *     summary: Get user notifications (dummy endpoint)
 *     security:
 *       - basicAuth: []
 *     responses:
 *       200:
 *         description: List of notifications
 */
router.get('/notifications', basicAuth, (req, res) => {
  res.status(200).json([{ message: 'Your booking is confirmed' }]);
});

/**
 * @swagger
 * /api/user/payment:
 *   post:
 *     summary: Process a mock payment
 *     security:
 *       - basicAuth: []
 *     responses:
 *       200:
 *         description: Payment processed successfully
 */
router.post('/payment', basicAuth, async (req, res) => {
  // Here you could integrate with a real payment gateway.
  res.status(200).json({ message: 'Payment processed successfully' });
});

module.exports = router;
