const express = require("express");
const bookingController = require("../Controllers/bookingController");
const router = express.Router();

router.post('/create', bookingController.createBooking);
router.get('/all', bookingController.getAllBookings);
router.get('/:Id', bookingController.getBookingsById);
router.get('/booking/:userId', bookingController.getBookingsByUser);
router.delete('/booking/:id', bookingController.deleteBooking);
router.put('/update/:id', bookingController.updateBooking);
router.put('/:id/status', bookingController.updateStatus);



module.exports = router;
