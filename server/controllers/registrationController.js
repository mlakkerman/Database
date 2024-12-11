const { User, Events, Registrations } = require('../models/models');
const ApiError = require('../error/ApiError');

class RegistrationController {
    async registerUser(req, res, next) {
        try {
            const { userId, eventId } = req.body;
            const registration = await Registrations.create({
                userId,
                eventId
            });
            return res.json(registration);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getRegisteredEvents(req, res) {
        const { userId } = req.params;
        try {
            const events = await Events.findAll({
                include: [{
                    model: User,
                    as: 'users',
                    through: Registrations,
                    where: { id: userId }
                }]
            });
            res.json(events);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new RegistrationController();