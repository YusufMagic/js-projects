const Router = require("koa-router")
const router = new Router()
const passport = require('koa-passport')
const controller = require('../controllers/position')


router.get('/api/position/:categoryId',passport.authenticate('jwt', {session:false}), controller.getByCategoryId)
router.post('/api/position',passport.authenticate('jwt', {session:false}), controller.create)
router.patch('/api/position/:id',passport.authenticate('jwt', {session:false}), controller.update)
router.delete('/api/position/:id',passport.authenticate('jwt', {session:false}), controller.remove)

module.exports = router
