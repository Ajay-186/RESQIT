const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
  recipientRole: {
    type: String,
    enum: ['CITIZEN', 'RESPONDER', 'ADMIN', 'BROADCAST'],
    required: true
  },
  recipientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  incidentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Incident' },
  title: { type: String, required: true },
  message: { type: String, required: true },
  priority: { type: String, enum: ['Normal', 'High', 'Urgent'], default: 'Normal' },
  isRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Notification', NotificationSchema);
