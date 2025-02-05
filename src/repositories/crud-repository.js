const { Sequelize } = require("sequelize");
const { Logger } = require("../config")

class CrudRepository {
    constructor(model) {
        this.model = model
    }

    async create(data) {
            const res = await this.model.create(data);
            return res;
    }

    async destroy(data) {
        try {
            const res = await this.model.destroy({
                where: {
                    id: data
                }
            });
            return res;
        } catch (error) {
            Logger.error('Something went wrong in the CRUD Repo : Destroy');
            throw error;   
        }
    }

    async get(data) {
        try {
            const res = await this.model.findbyPk(data);
            return res;
        } catch (error) {
            Logger.error('Something went wrong in the CRUD Repo : Get');
            throw error;   
        }
    }

    async getAll() {
        try {
            const res = await this.model.findAll();
            return res;
        } catch (error) {
            Logger.error('Something went wrong in the CRUD Repo : Get');
            throw error;   
        }
    }

    async update(id, data) {
        try {
            const res = await this.model.update(data, {
                where: {
                    id: id
                }
            });
            return res;
        } catch (error) {
            Logger.error('Something went wrong in the CRUD Repo : Get');
            throw error;   
        }
    }
}

module.exports = CrudRepository;