const { Sequelize } = require("sequelize")
const CrudRepository = require('./crud-repository');
const { Flight, Airplane, Airport, City } = require('../models');
const db = require("../models")
const { addRowLockOnFlights } = require('./queries')

class FlightRepository extends CrudRepository {
    constructor() {
        super(Flight);
    }

    async getAllFlights(filter, sort) {
        const res = await Flight.findAll({
            where: filter,
            order: sort,
            include: [{
                model: Airplane,
                required: true,
                as: 'airplaneDetail'
            },
            {
                model: Airport,
                as: 'departureAirport',
                required: true,
                on : {
                    col1: Sequelize.where(Sequelize.col("Flight.departureAirportId"), "=", Sequelize.col("departureAirport.code"))
                },
                include: {
                    model: City,
                    required: true
                }
            },
            {
                model: Airport,
                as: 'arrivalAirport',
                required: true,
                on : {
                    col1: Sequelize.where(Sequelize.col("Flight.arrivalAirportId"), "=", Sequelize.col("arrivalAirport.code"))
                },
                include: {
                    model: City,
                    required: true
                }
            }]
        });
        return res;
    }

    async updateRemainingSeats(flightId, seats, dec = true) {
        const transaction = await db.sequelize.transaction();
        try {
            await db.sequelize.query(addRowLockOnFlights(flightId))
            const flight = await Flight.findByPk(flightId)
            if (+dec) {
                await flight.decrement('totalSeats', {by: seats}, {transaction: transaction});
            } 
            else {
                await flight.increment('totalSeats', {by: seats}, {transaction: transaction});
            }
            await transaction.commit();
            return flight;
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }
}

module.exports = FlightRepository;