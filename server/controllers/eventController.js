const uuid = require('uuid')
const path = require('path');
const { Events, EventInfo } = require('../models/models')
const ApiError = require('../error/ApiError');

class EventController {
    async create(req, res, next) {
        try {
            let { title, description, info, date, categoryId, addressId, organizationId, speakerId } = req.body
            const { img } = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))
            const event = await Events.create({ title, description, date, categoryId, addressId, organizationId, speakerId, img: fileName });

            if (info) {
                info = JSON.parse(info)
                info.forEach(i =>
                    EventInfo.create({
                        title: i.title,
                        description: i.description,
                        eventId: event.id
                    })
                )
            }
            return res.json(event)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }

    async getAll(req, res) {
        let { categoryId, addressId, organizationId, speakerId, limit, page } = req.query
        page = page || 1
        limit = limit || 8
        let offset = page * limit - limit
        let whereClause = {};
        if (categoryId) whereClause.categoryId = categoryId;
        if (addressId) whereClause.addressId = addressId;
        if (organizationId) whereClause.organizationId = organizationId;
        if (speakerId) whereClause.speakerId = speakerId;
    
        let events = await Events.findAndCountAll({
            where: whereClause,
            limit: limit,
            offset: offset
        })
        return res.json(events)
    }
    

    async getOne(req, res) {
        const { id } = req.params
        const event = await Events.findOne(
            {
                where: { id },
                include: [{ model: EventInfo, as: 'info' }]
            },
        )
        return res.json(event)
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params
            const event = await Events.findOne({ where: { id } })
            if(!event){
                return next(ApiError.badRequest('Event Not Found'))
            }
    
            await event.destroy()
            return res.json({ message: "Event deleted successfully" })
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
    
}

module.exports = new EventController()
