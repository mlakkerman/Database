const { Organizations } = require('../models/models')
const ApiError = require('../error/ApiError');
const uuid = require('uuid')
const path = require('path');

class OrganizationRouter {
    async create(req, res) {
        const { name, websiteUrl } = req.body
        const { logo } = req.files
        let fileName = uuid.v4() + ".jpg"
        logo.mv(path.resolve(__dirname, '..', 'static', fileName))
        const organization = await Organizations.create({ name, websiteUrl, logo: fileName })
        return res.json(organization)
    }

    async getAll(req, res) {
        const organization = await Organizations.findAll()
        return res.json(organization)
    }
}

module.exports = new OrganizationRouter()
