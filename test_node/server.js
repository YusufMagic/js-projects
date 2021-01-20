const Koa = require('koa')
const app = new Koa()
const koaBody = require('koa-body')
const morgan = require('morgan')
const authRouter = require('./router/auth')
const analyticRouter = require('./router/analytics')
const categoryRouter = require('./router/category')
const orderRouter = require('./router/order')
const positionRouter = require('./router/position')
const keys = require('./config/keys')
const mongoose = require('mongoose')
const passport = require('koa-passport')
const logger = require('koa-logger')
const serve = require('koa-static')
const path = require('path')

const staticDirPath = path.join(__dirname, 'uploads');
app.use(serve(staticDirPath))

app.use(passport.initialize())
require('./middleware/passport')(passport)


mongoose
    .connect(keys.mongoURI,
        { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
    .then(() => console.log( 'Database Connected' ))
    .catch(err => console.log( err ));

const PORT = 3000
app.use(koaBody())

app.use(authRouter.routes())
app.use(authRouter.allowedMethods())

app.use(analyticRouter.routes())
app.use(analyticRouter.allowedMethods())

app.use(categoryRouter.routes())
app.use(categoryRouter.allowedMethods())

app.use(orderRouter.routes())
app.use(orderRouter.allowedMethods())

app.use(positionRouter.routes())
app.use(positionRouter.allowedMethods())

app.use(logger())

app.listen(PORT, () => {
    console.log('Work!')
})

