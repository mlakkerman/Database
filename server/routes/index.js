const Router = require('express')
const router = new Router()
const eventRouter = require('./eventRouter')
const userRouter = require('./userRouter')
const categoryRouter = require('./categoryRouter')
const speakerRouter = require('./speakerRouter')
const addressRouter = require('./addressRouter')
const organizationRouter = require('./organizationRouter')
const registrationRouter = require('./registrationRouter');

router.use('/user', userRouter)
router.use('/speaker', speakerRouter)
router.use('/category', categoryRouter)
router.use('/event', eventRouter)
router.use('/address', addressRouter)
router.use('/organization', organizationRouter)
router.use('/registration', registrationRouter)

module.exports = router
