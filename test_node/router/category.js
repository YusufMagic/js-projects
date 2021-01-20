const Router = require("koa-router")
const router = new Router()
const passport = require('koa-passport')
const controller = require('../controllers/category')
const keys = require('../config/keys')
const jwt = require('jsonwebtoken')
const upload = require('../middleware/upload')

router.get('/api/category', passport.authenticate('jwt', {session:false}), controller.getAll)
router.get('/api/category/:id', passport.authenticate('jwt', {session:false}), controller.getById)
router.delete('/api/category/:id', passport.authenticate('jwt', {session:false}), controller.remove)
router.post('/api/category', passport.authenticate('jwt', {session: false}), upload.single('image'),controller.create)
router.patch('/api/category/:id', passport.authenticate('jwt', {session:false}),upload.single('image'), controller.update)

module.exports = router
