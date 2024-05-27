const Router = require('express')
const router = new Router()
const categoryRouter = require('../controllers/categoryController')
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/', checkRole('ADMIN'), categoryRouter.create)
router.get('/', categoryRouter.getAll)

module.exports = router
