const Router = require('express')
const router = new Router()
const sponsorController = require('../controllers/sponsorController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), sponsorController.create)
router.get('/', sponsorController.getAll)

module.exports = router
