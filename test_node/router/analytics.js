const Router = require("koa-router")
const router = new Router()

const controller = require('../controllers/analyticks')

router.get('/api/analyticts/overview', controller.overview)
router.get('/api/analyticts/analytics', controller.analytics)

module.exports = router
