// controllers/roomController.js
const Room = require('../models/Room');

exports.createRoom = async (req, res) => {
  const { name, price, roomType } = req.body;
  try {
    const room = await Room.create({ name, price, roomType });
    res.status(201).json({ message: 'Room created', room });
  } catch (error) {
    res.status(500).json({ message: 'Error creating room', error });
  }
};

exports.deleteRoom = async (req, res) => {
  const roomId = parseInt(req.params.id);
  try {
    const room = await Room.findByPk(roomId);
    if (!room) return res.status(404).json({ message: 'Room not found' });
    await room.destroy();
    res.json({ message: 'Room deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting room', error });
  }
};

exports.updateRoom = async (req, res) => {
  const roomId = parseInt(req.params.id);
  try {
    const room = await Room.findByPk(roomId);
    if (!room) return res.status(404).json({ message: 'Room not found' });
    const { name, price, roomType } = req.body;
    room.name = name || room.name;
    room.price = price || room.price;
    room.roomType = roomType || room.roomType;
    await room.save();
    res.json({ message: 'Room updated', room });
  } catch (error) {
    res.status(500).json({ message: 'Error updating room', error });
  }
};

exports.getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.findAll();
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching rooms', error });
  }
};

exports.getOneRoom = async (req, res) => {
  const roomId = parseInt(req.params.id);
  try {
    const room = await Room.findByPk(roomId);
    if (!room) return res.status(404).json({ message: 'Room not found' });
    res.json(room);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching room', error });
  }
};