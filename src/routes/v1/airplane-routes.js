const express = require('express');
const { AirplaneController } = require('../../controllers')
const { AirplaneMiddleware } = require('../../middlewares')

const router = express.Router();

// /api/v1/airplanes/
router.post('/', AirplaneMiddleware.validateCreateRequest, AirplaneController.createAirplane);

router.get('/', AirplaneController.getAirplanes);

router.get('/:id', AirplaneController.getAirplane);

router.delete('/:id', AirplaneController.destroyAirplane);

router.patch('/', AirplaneController.updateAirplane);

module.exports = router;