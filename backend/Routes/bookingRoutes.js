const express = require("express");
const bookingController = require("../Controllers/bookingController");
const router = express.Router();

router.post('/create', bookingController.createBooking);
router.get('/all', bookingController.getAllBookings);
router.get('/booking/:userId', bookingController.getBookingsByUser);


module.exports = router;
