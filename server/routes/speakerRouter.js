const Router = require('express')
const router = new Router()
const speakerController = require('../controllers/speakerController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), speakerController.create)
router.get('/', speakerController.getAll)

module.exports = router
