const Booking = require('../Models/bookingModel')

//create booking
exports.createBooking = async (req, res) => {
    try {
      const booking = new Booking(req.body);
      await booking.save();
      res.status(201).json({ success: true, booking });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  };

  //get all bookings
exports.getAllBookings = async (req, res) => {
    try {
      const bookings = await Booking.find()
        .populate('service_id')
        .populate('user_id')
        .sort({ createdAt: -1 });
      res.json({ success: true, bookings });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
// Get bookings by user
exports.getBookingsByUser = async (req, res) => {
    try {
      const bookings = await Booking.find({ user_id: req.params.userId })
        .populate('service_id')
        .sort({ date_time: 1 });
      res.json({ success: true, bookings });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
