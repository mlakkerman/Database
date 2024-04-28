const { Sponsors } = require('../models/models')
const ApiError = require('../error/ApiError');
const uuid = require('uuid')
const path = require('path');

class SponsorRouter {
    async create(req, res) {
        const { name, websiteUrl } = req.body
        const { logo } = req.files
        let fileName = uuid.v4() + ".jpg"
        logo.mv(path.resolve(__dirname, '..', 'static', fileName))
        const sponsor = await Sponsors.create({ name, websiteUrl, logo: fileName })
        return res.json(sponsor)
    }

    async getAll(req, res) {
        const sponsors = await Sponsors.findAll()
        return res.json(sponsors)
    }
}

module.exports = new SponsorRouter()
