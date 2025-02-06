const { StatusCodes } = require('http-status-codes')
const { CityRepository } = require('../repositories')

const  AppError = require('../utils/errors/app-error')

const cityRepository = new CityRepository();

async function createCity(data) {
    try {
        const city = await cityRepository.create(data);
        return city;
    } catch (error) {
        if(error.name == 'SequelizeValidationError' || error.name == 'SequelizeUniqueConstraintError') {
            let explanation = [];
            error.errors.forEach(err => {
                explanation.push(err.message)
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST)
        }
        throw new AppError('Cannot create a new city object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function destroyCity(id) {
    try {
        const res = await cityRepository.destroy(id);
        return res;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND) {
            throw new AppError('The city you requested is not present', error.statusCode)
        }
        throw new AppError('Could not delete city', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function updateCity(id, data) {
    try {
        const city = await cityRepository.update(id, data);
        return city;
    } catch (error) {
        if(error.name == 'SequelizeValidationError') {
            let explanation = [];
            error.errors.forEach(err => {
                explanation.push(err.message)
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST)
        }
        throw new AppError('Cannot update the city object', error.statusCode);
    }
}

module.exports = {
    createCity,
    destroyCity,
    updateCity
}