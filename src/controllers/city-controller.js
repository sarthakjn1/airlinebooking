const { CityService } = require('../services');
const {StatusCodes} = require('http-status-codes');
const { SuccessResponse, ErrorResponse } = require('../utils/common')

async function createCity(req, res) {
    try {
        const city = await CityService.createCity({
            name: req.body.name
        });
        SuccessResponse.data = city;
        return res.status(StatusCodes.OK).json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error;
        res.status(error.statusCode).json(ErrorResponse);
    }
}

/**
 * DELETE: cities/:id
 * 
 */

async function destroyCity(req, res) {
    try {
        const city = await CityService.destroyCity(req.params.id);
        SuccessResponse.data = city;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        res.status(error.statusCode).json(ErrorResponse);
    }
}

/**
 * PATCH: cities/
 * 
 */
async function updateCity(req, res) {
    try {
        const city = await CityService.updateCity(req.body.id, req.body);
        SuccessResponse.data = city;
        return res.status(StatusCodes.OK).json(SuccessResponse)
    } catch (error) {
        ErrorResponse.error = error;
        res.status(error.statusCode).json(ErrorResponse);
    }
}

module.exports = {
    createCity,
    destroyCity,
    updateCity
} 