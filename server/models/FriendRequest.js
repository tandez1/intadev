const mongoose = require('mongoose');

const friendRequestSchema = new mongoose.Schema({
  from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'declined'],
    default: 'pending'
  },
  message: {
    type: String,
    maxlength: 200
  }
}, {
  timestamps: true
});

// Compound index to prevent duplicate requests
friendRequestSchema.index({ from: 1, to: 1 }, { unique: true });

// Index for querying requests by recipient
friendRequestSchema.index({ to: 1, status: 1 });

module.exports = mongoose.model('FriendRequest', friendRequestSchema);