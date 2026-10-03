const mongoose = require('mongoose');

const IncidentSchema = new mongoose.Schema({
  incidentId: { 
    type: String, 
    required: true, 
    unique: true, 
    default: () => `INC-${Math.floor(100000 + Math.random() * 900000)}` 
  },
  reporter: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  },
  reporterName: { type: String, default: 'Citizen' },
  reporterPhone: { type: String },
  
  description: { type: String, required: true },
  images: [{ type: String }],
  videos: [{ type: String }],

  location: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], required: true }, // [longitude, latitude]
    address: { type: String, default: 'Street Location' },
    landmark: { type: String }
  },

  // Incident Source & Detection Method
  detectionMethod: {
    type: String,
    enum: ['MANUAL_SOS', 'SMART_AUTO_DETECT', 'CCTV_AI', 'ECALL_IOT'],
    default: 'MANUAL_SOS',
    index: true
  },
  sensorTelemetry: {
    impactForceG: { type: Number, default: 0 },
    preCrashSpeedKmH: { type: Number, default: 0 },
    orientationDeltaDeg: { type: Number, default: 0 },
    postImpactInactivitySec: { type: Number, default: 0 },
    sensorFusionScore: { type: Number, min: 0, max: 100, default: 0 }
  },
  confirmationStatus: {
    type: String,
    enum: ['CONFIRMED_HELP', 'TIMEOUT_UNRESPONSIVE', 'CANCELLED_SAFE', 'PENDING_USER_RESPONSE'],
    default: 'CONFIRMED_HELP'
  },

  // Gemini AI Analysis
  aiClassification: {
    category: { type: String, default: 'Road Accident' }, // Road Accident, Cardiac Arrest, Fire, Assault
    severity: { 
      type: String, 
      enum: ['Minor', 'Medium', 'Critical'], 
      default: 'Critical' 
    },
    confidenceScore: { type: Number, min: 0, max: 100, default: 95 },
    suggestedResponder: { 
      type: String, 
      enum: ['Ambulance', 'Police', 'Fire Department', 'Multi-Agency'], 
      default: 'Ambulance' 
    },
    duplicateDetected: { type: Boolean, default: false },
    duplicateOf: { type: mongoose.Schema.Types.ObjectId, ref: 'Incident', default: null },
    rawGeminiExplanation: { type: String }
  },

  // Assigned Responder
  assignedResponder: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Responder' 
  },
  assignedUnitCode: { type: String }, // e.g. AMB-104

  // Status Lifecycle
  status: {
    type: String,
    enum: [
      'Reported',
      'Assigned',
      'En Route',
      'Reached',
      'Treatment Started',
      'Resolved'
    ],
    default: 'Reported',
    index: true
  },

  etaSeconds: { type: Number, default: 220 }, // live calculated
  
  // Chronological timestamps for response time analytics
  timestamps: {
    reportedAt: { type: Date, default: Date.now },
    assignedAt: { type: Date },
    enRouteAt: { type: Date },
    reachedAt: { type: Date },
    treatmentStartedAt: { type: Date },
    resolvedAt: { type: Date }
  },

  notes: [{
    author: String,
    message: String,
    createdAt: { type: Date, default: Date.now }
  }]
}, { timestamps: true });

IncidentSchema.index({ location: '2dsphere' });
IncidentSchema.index({ 'aiClassification.severity': 1, status: 1 });

module.exports = mongoose.model('Incident', IncidentSchema);
