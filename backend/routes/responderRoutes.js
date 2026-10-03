const express = require('express');
const router = express.Router();
const responderController = require('../controllers/responderController');

router.get('/', responderController.getResponders);
router.patch('/:code/location', responderController.updateResponderLocation);
router.post('/:code/incident/:incidentId/respond', responderController.respondToIncident);

module.exports = router;
