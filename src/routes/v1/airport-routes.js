const express = require('express');
const { AirportController } = require('../../controllers')
const { AirportMiddleware } = require('../../middlewares')

const router = express.Router();

// /api/v1/airports/
router.post('/', AirportMiddleware.validateCreateRequest, AirportController.createAirport);

router.get('/', AirportController.getAirports);

router.get('/:id', AirportController.getAirport);

router.delete('/:id', AirportController.destroyAirport);

router.patch('/', AirportController.updateAirport);

module.exports = router;