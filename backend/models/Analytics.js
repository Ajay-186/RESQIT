const mongoose = require('mongoose');

const AnalyticsSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now, index: true },
  totalReported: { type: Number, default: 0 },
  totalResolved: { type: Number, default: 0 },
  averageResponseTimeSeconds: { type: Number, default: 0 },
  averageDispatchTimeSeconds: { type: Number, default: 0 },
  goldenHourAdherencePercent: { type: Number, default: 92.5 },
  breakdownByType: {
    roadAccident: { type: Number, default: 0 },
    cardiacEmergency: { type: Number, default: 0 },
    fireHazard: { type: Number, default: 0 },
    assaultCrime: { type: Number, default: 0 }
  },
  breakdownBySeverity: {
    minor: { type: Number, default: 0 },
    medium: { type: Number, default: 0 },
    critical: { type: Number, default: 0 }
  },
  duplicatesPreventedCount: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Analytics', AnalyticsSchema);
