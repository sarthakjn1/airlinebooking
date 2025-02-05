const express = require('express');
const { AirplaneController } = require('../../controllers')
const { AirplaneMiddleware } = require('../../middlewares')

const router = express.Router();

// /api/v1/airplanes/
router.post('/', AirplaneMiddleware.validateCreateRequest, AirplaneController.createAirplane);

router.get('/', AirplaneController.getAirplanes);

module.exports = router;