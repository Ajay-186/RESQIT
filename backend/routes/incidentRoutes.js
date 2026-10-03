const express = require('express');
const router = express.Router();
const incidentController = require('../controllers/incidentController');

router.post('/sos', incidentController.createIncident);
router.post('/auto-crash', incidentController.reportAutoCrash);
router.post('/cancel-safe', incidentController.cancelFalseAlarm);
router.get('/', incidentController.getIncidents);
router.get('/:id', incidentController.getIncidentById);
router.patch('/:id/status', incidentController.updateIncidentStatus);

module.exports = router;

