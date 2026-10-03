const mongoose = require('mongoose');

const EmergencyContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  relationship: { type: String, default: 'Family' },
  notifyViaSMS: { type: Boolean, default: true },
  notifyViaWhatsApp: { type: Boolean, default: true }
});

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  phone: { type: String, required: true, unique: true, index: true },
  email: { type: String, lowercase: true, trim: true },
  role: { 
    type: String, 
    enum: ['CITIZEN', 'RESPONDER', 'ADMIN'], 
    default: 'CITIZEN' 
  },
  bloodGroup: { 
    type: String, 
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'Unknown'],
    default: 'Unknown'
  },
  medicalNotes: { type: String, default: '' },
  allergies: [{ type: String }],
  emergencyContacts: [EmergencyContactSchema],
  activeLocation: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], default: [78.4071, 17.4325] } // [longitude, latitude]
  },
  isVerified: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

UserSchema.index({ activeLocation: '2dsphere' });

module.exports = mongoose.model('User', UserSchema);
