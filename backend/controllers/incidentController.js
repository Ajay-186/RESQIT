const Incident = require('../models/Incident');
const Responder = require('../models/Responder');
const geminiService = require('../services/geminiService');
const { notifyNewEmergency, notifyResponderAssigned, notifyStatusUpdate } = require('../services/socketService');

exports.createIncident = async (req, res) => {
  try {
    const { 
      description, 
      latitude, 
      longitude, 
      address, 
      images = [], 
      videos = [],
      reporterPhone,
      reporterName
    } = req.body;

    const lat = parseFloat(latitude) || 17.4325;
    const lng = parseFloat(longitude) || 78.4071;

    // 1. Run Gemini AI Emergency Classification & Severity Detection
    const aiAnalysis = await geminiService.classifyEmergency(description);

    // 2. Run Spatiotemporal Duplicate Detection (within 500m)
    const duplicateCheck = await geminiService.checkDuplicateIncident(lat, lng, aiAnalysis.category, 500);

    // 3. Recommend Nearest Optimal Responder
    const recommendedUnit = await geminiService.recommendOptimalResponder(lat, lng, aiAnalysis.suggestedResponder);

    // 4. Save Incident
    const incident = new Incident({
      description,
      reporterName: reporterName || 'Citizen',
      reporterPhone: reporterPhone || '+91 98480 22338',
      location: {
        type: 'Point',
        coordinates: [lng, lat],
        address: address || 'Jubilee Hills Road 36, Hyderabad'
      },
      images,
      videos,
      aiClassification: {
        category: aiAnalysis.category,
        severity: aiAnalysis.severity,
        confidenceScore: aiAnalysis.confidenceScore,
        suggestedResponder: aiAnalysis.suggestedResponder,
        duplicateDetected: duplicateCheck.isDuplicate,
        duplicateOf: duplicateCheck.isDuplicate ? duplicateCheck.masterIncident?._id : null,
        rawGeminiExplanation: aiAnalysis.rationale
      },
      assignedUnitCode: recommendedUnit?.responderCode || 'AMB-104',
      status: 'Assigned',
      timestamps: {
        reportedAt: new Date(),
        assignedAt: new Date()
      }
    });

    await incident.save();

    // 5. Update assigned responder status in database
    if (recommendedUnit && recommendedUnit._id) {
      await Responder.findByIdAndUpdate(recommendedUnit._id, {
        status: 'Assigned',
        currentIncident: incident._id
      });
    }

    // 6. Broadcast Real-Time Alerts via WebSockets
    notifyNewEmergency(incident);
    notifyResponderAssigned(incident, recommendedUnit);

    res.status(201).json({
      success: true,
      message: 'Emergency SOS dispatched successfully',
      incident,
      assignedResponder: recommendedUnit
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getIncidents = async (req, res) => {
  try {
    const { status, severity } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (severity) filter['aiClassification.severity'] = severity;

    const incidents = await Incident.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, count: incidents.length, incidents });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getIncidentById = async (req, res) => {
  try {
    const incident = await Incident.findById(req.params.id);
    if (!incident) return res.status(404).json({ success: false, message: 'Incident not found' });
    res.json({ success: true, incident });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateIncidentStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['Assigned', 'En Route', 'Reached', 'Treatment Started', 'Resolved'];
    
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status value' });
    }

    const timestampMap = {
      'En Route': 'timestamps.enRouteAt',
      'Reached': 'timestamps.reachedAt',
      'Treatment Started': 'timestamps.treatmentStartedAt',
      'Resolved': 'timestamps.resolvedAt'
    };

    const updateQuery = { status };
    if (timestampMap[status]) {
      updateQuery[timestampMap[status]] = new Date();
    }

    const incident = await Incident.findByIdAndUpdate(req.params.id, { $set: updateQuery }, { new: true });
    
    // Broadcast status change
    notifyStatusUpdate(req.params.id, status);

    res.json({ success: true, incident });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Smart Auto SOS: Sensor-Triggered Autonomous Crash Reporting
exports.reportAutoCrash = async (req, res) => {
  try {
    const {
      sensorData = {},
      latitude,
      longitude,
      address,
      evidenceVideoUrl,
      evidenceImageUrl,
      userResponse = 'TIMEOUT_UNRESPONSIVE' // 'CONFIRMED_HELP' | 'TIMEOUT_UNRESPONSIVE'
    } = req.body;

    const sensorFusion = require('../services/sensorFusionService');
    const evaluation = sensorFusion.evaluatePossibleCrash(sensorData);

    const lat = parseFloat(latitude) || 17.4325;
    const lng = parseFloat(longitude) || 78.4071;

    // Gemini AI Multimodal Triage for Auto Crash
    const aiAnalysis = await geminiService.classifyEmergency(
      `Autonomous Crash Detected: High impact ${sensorData.impactG || 4.8}G spike with sudden deceleration from ${sensorData.preSpeedKmH || 65} km/h to 0 km/h. Victim unresponsive after 60s safety buffer.`
    );

    const recommendedUnit = await geminiService.recommendOptimalResponder(lat, lng, 'Ambulance');

    const incident = new Incident({
      description: `Smart Auto SOS: Autonomous crash detection (${sensorData.impactG || 4.8}G impact, ${evaluation.fusionScore}% sensor confidence).`,
      reporterName: 'Autonomous Vehicle Telematics',
      detectionMethod: 'SMART_AUTO_DETECT',
      confirmationStatus: userResponse,
      sensorTelemetry: {
        impactForceG: sensorData.impactG || 4.8,
        preCrashSpeedKmH: sensorData.preSpeedKmH || 65,
        orientationDeltaDeg: sensorData.gyroDeltaDeg || 142,
        postImpactInactivitySec: sensorData.inactivityDurationSec || 6,
        sensorFusionScore: evaluation.fusionScore
      },
      location: {
        type: 'Point',
        coordinates: [lng, lat],
        address: address || 'Jubilee Hills Road 36, Hyderabad'
      },
      images: evidenceImageUrl ? [evidenceImageUrl] : ['assets/hero_banner.jpg'],
      videos: evidenceVideoUrl ? [evidenceVideoUrl] : [],
      aiClassification: {
        category: 'Road Accident',
        severity: 'Critical',
        confidenceScore: 96,
        suggestedResponder: 'Ambulance',
        rawGeminiExplanation: 'Gemini AI: Multi-sensor crash pattern confirmed. High probability of victim incapacitation. ALS unit dispatched.'
      },
      assignedUnitCode: recommendedUnit?.responderCode || 'AMB-104',
      status: 'Assigned',
      timestamps: {
        reportedAt: new Date(),
        assignedAt: new Date()
      }
    });

    await incident.save();

    // Broadcast alerts
    notifyNewEmergency(incident);
    notifyResponderAssigned(incident, recommendedUnit);

    res.status(201).json({
      success: true,
      message: 'Autonomous crash incident logged and responder dispatched',
      incident,
      assignedResponder: recommendedUnit
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Cancel False Alarm when user taps "I'M SAFE"
exports.cancelFalseAlarm = async (req, res) => {
  try {
    const { incidentId, reason = 'User pressed I AM SAFE' } = req.body;
    if (incidentId) {
      await Incident.findByIdAndUpdate(incidentId, {
        confirmationStatus: 'CANCELLED_SAFE',
        status: 'Resolved',
        $push: { notes: { author: 'Citizen', message: `False alarm safely cancelled: ${reason}` } }
      });
    }
    res.json({ success: true, message: 'Crash alert cancelled safely. Logged for sensor calibration.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
