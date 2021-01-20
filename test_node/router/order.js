const Router = require("koa-router")
const router = new Router()
const passport = require('koa-passport')
const controller = require('../controllers/order')

router.post('/api/order', passport.authenticate('jwt', {session:false}), controller.create)
router.get('/api/order', passport.authenticate('jwt', {session:false}), controller.getAll)

module.exports = router
