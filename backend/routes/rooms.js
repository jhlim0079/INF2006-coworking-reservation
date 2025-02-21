// routes/rooms.js
const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');
const { authenticateToken, authorizeAdmin } = require('../middleware/auth');

/**
 * @swagger
 * /api/rooms:
 *   post:
 *     summary: Create a new room (Admin only)
 *     tags: [Rooms]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *               - roomType
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               roomType:
 *                 type: string
 *     responses:
 *       201:
 *         description: Room created successfully
 */
router.post('/', authenticateToken, authorizeAdmin, roomController.createRoom);

/**
 * @swagger
 * /api/rooms/{id}:
 *   delete:
 *     summary: Delete a room (Admin only)
 *     tags: [Rooms]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Room deleted successfully
 */
router.delete('/:id', authenticateToken, authorizeAdmin, roomController.deleteRoom);

/**
 * @swagger
 * /api/rooms/{id}:
 *   put:
 *     summary: Update a room (Admin only)
 *     tags: [Rooms]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               roomType:
 *                 type: string
 *     responses:
 *       200:
 *         description: Room updated successfully
 */
router.put('/:id', authenticateToken, authorizeAdmin, roomController.updateRoom);

/**
 * @swagger
 * /api/rooms:
 *   get:
 *     summary: Retrieve a list of all rooms
 *     tags: [Rooms]
 *     responses:
 *       200:
 *         description: A list of rooms
 */
router.get('/', roomController.getAllRooms); // Use controller function

/**
 * @swagger
 * /api/rooms/{id}:
 *   get:
 *     summary: Retrieve a single room by ID
 *     tags: [Rooms]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Room details retrieved successfully
 *       404:
 *         description: Room not found
 */
router.get('/:id', roomController.getOneRoom);

module.exports = router;
