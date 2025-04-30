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

exports.getBookingsById = async (req, res) => {
    try {
     
        const bookings = await Booking.find({_id: req.params.Id })
            .populate('service_id')
            .sort({ date_time: 1 });
        res.json({ success: true, bookings });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update a booking
exports.updateBooking = async (req, res) => {
    try {
      const updated = await Booking.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updated) return res.status(404).json({ success: false, message: 'Booking not found' });
      res.json({ success: true, booking: updated });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  };

exports.updateStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const booking = await Booking.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );
        res.status(200).json({ message: 'Status updated', booking });
    } catch (err) {
        res.status(500).json({ message: 'Error updating status' });
    }
};
  
exports.deleteBooking = async (req, res) => {
    try {
        const deleted = await Booking.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ success: false, message: 'Booking not found' });
        res.json({ success: true, message: 'Booking deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
