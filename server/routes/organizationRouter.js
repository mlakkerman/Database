const Router = require('express')
const router = new Router()
const organizationController = require('../controllers/organizationController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), organizationController.create)
router.get('/', organizationController.getAll)

module.exports = router