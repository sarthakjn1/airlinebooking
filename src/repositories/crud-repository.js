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
        const res = await this.model.destroy({
            where: {
                id: data
            }
        });
        return res;
    }

    async get(data) {
        const res = await this.model.findbyPk(data);
        return res;
    }

    async getAll() {
        const res = await this.model.findAll();
        return res;
    }

    async update(id, data) {
        const res = await this.model.update(data, {
            where: {
                id: id
            }
        });
        return res;
    }
}

module.exports = CrudRepository;