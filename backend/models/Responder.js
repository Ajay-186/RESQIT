const mongoose = require('mongoose');

const ResponderSchema = new mongoose.Schema({
  responderCode: { type: String, required: true, unique: true }, // e.g. AMB-104, POL-201, FIRE-301
  name: { type: String, required: true },
  type: { 
    type: String, 
    enum: ['Ambulance', 'Police', 'Fire Department'], 
    required: true 
  },
  subType: { type: String, default: 'ALS (Advanced Life Support)' },
  phone: { type: String, required: true },
  
  status: {
    type: String,
    enum: ['Available', 'Assigned', 'En Route', 'Reached', 'Treatment Started', 'Offline'],
    default: 'Available',
    index: true
  },

  location: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], required: true }, // [longitude, latitude]
    speedKmH: { type: Number, default: 0 },
    headingDeg: { type: Number, default: 0 },
    lastUpdated: { type: Date, default: Date.now }
  },

  currentIncident: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Incident',
    default: null 
  },

  crewMembers: [{
    name: String,
    role: String
  }],

  equipment: [{ type: String }], // e.g. Ventilator, Defibrillator, Hydraulic Cutter
  stationName: { type: String, default: 'Metropolitan Central Station' }
}, { timestamps: true });

ResponderSchema.index({ location: '2dsphere' });
ResponderSchema.index({ type: 1, status: 1 });

module.exports = mongoose.model('Responder', ResponderSchema);
