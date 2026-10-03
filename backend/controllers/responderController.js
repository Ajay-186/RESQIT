const Responder = require('../models/Responder');
const Incident = require('../models/Incident');

exports.getResponders = async (req, res) => {
  try {
    const { type, status } = req.query;
    const filter = {};
    if (type) filter.type = type;
    if (status) filter.status = status;

    const responders = await Responder.find(filter);
    res.json({ success: true, count: responders.length, responders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateResponderLocation = async (req, res) => {
  try {
    const { latitude, longitude, speedKmH } = req.body;
    const responder = await Responder.findOneAndUpdate(
      { responderCode: req.params.code },
      {
        'location.coordinates': [longitude, latitude],
        'location.speedKmH': speedKmH || 60,
        'location.lastUpdated': new Date()
      },
      { new: true }
    );
    res.json({ success: true, responder });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.respondToIncident = async (req, res) => {
  try {
    const { action } = req.body; // 'ACCEPT' or 'REJECT'
    const { code, incidentId } = req.params;

    if (action === 'ACCEPT') {
      await Responder.findOneAndUpdate({ responderCode: code }, { status: 'En Route', currentIncident: incidentId });
      await Incident.findByIdAndUpdate(incidentId, { status: 'En Route', 'timestamps.enRouteAt': new Date() });
      return res.json({ success: true, message: 'Incident accepted. Navigation underway.' });
    } else {
      await Responder.findOneAndUpdate({ responderCode: code }, { status: 'Available', currentIncident: null });
      return res.json({ success: true, message: 'Incident rejected. Re-queuing to next available unit.' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
