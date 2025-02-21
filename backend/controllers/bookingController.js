// controllers/bookingController.js
const Booking = require('../models/Booking');

exports.createBooking = async (req, res) => {
  const { roomId, date } = req.body;
  console.log(req.body);
  try {
    const booking = await Booking.create({
      userId: req.user.id,
      roomId,
      date,
      confirmed: false
    });
    res.status(201).json({ message: 'Booking created', booking });
  } catch (error) {
    res.status(500).json({ message: 'Error creating booking', error });
  }
};

// New method to get all bookings
exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll(); // Fetch all bookings
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching all bookings', error });
  }
};

exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll({ where: { userId: req.user.id } });
    console.log(bookings);
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookings', error });
  }
};

exports.cancelBooking = async (req, res) => {
  const bookingId = parseInt(req.params.id);
  try {
    const booking = await Booking.findOne({ where: { id: bookingId, userId: req.user.id } });
    if (!booking) return res.status(404).json({ message: 'Booking not found or unauthorized' });
    await booking.destroy();
    res.json({ message: 'Booking cancelled' });
  } catch (error) {
    res.status(500).json({ message: 'Error cancelling booking', error });
  }
};

exports.confirmPayment = async (req, res) => {
  const bookingId = parseInt(req.params.id);
  try {
    const booking = await Booking.findOne({ where: { id: bookingId, userId: req.user.id } });
    if (!booking) return res.status(404).json({ message: 'Booking not found or unauthorized' });
    booking.confirmed = true;
    await booking.save();
    res.json({ message: 'Payment successful, booking confirmed', booking });
  } catch (error) {
    res.status(500).json({ message: 'Error confirming payment', error });
  }
};
