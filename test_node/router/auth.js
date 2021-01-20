const Router = require("koa-router")
const router = new Router()

const controller = require('../controllers/auth')

router.post('/api/login', controller.login)
router.post('/api/register', controller.register)

module.exports = router
