// models/Booking.js
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  customer_name: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  date_time: {
    type: Date,
    required: true
  },
  service_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'service',
    required: true
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending'
  }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);