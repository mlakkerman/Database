const Router = require('express')
const router = new Router()
const eventRouter = require('./eventRouter')
const userRouter = require('./userRouter')
const categoryRouter = require('./categoryRouter')
const speakerRouter = require('./speakerRouter')
const addressRouter = require('./addressRouter')
const sponsorRouter = require('./sponsorRouter')

router.use('/user', userRouter)
router.use('/speaker', speakerRouter)
router.use('/category', categoryRouter)
router.use('/event', eventRouter)
router.use('/address', addressRouter)
router.use('/sponsor', sponsorRouter)

module.exports = router
