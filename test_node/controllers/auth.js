const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const keys = require('../config/keys')
const errorHandle = require('../utils/errorHandler')

module.exports.login = async function (ctx) {
    const candidate = await User.findOne({email: ctx.request.body['email']})
    if(candidate) {
        const passwordResult = bcrypt.compareSync(ctx.request.body['password'], candidate['password'])
        if (passwordResult) {
            const token = jwt.sign({
                email:candidate.email,
                userId: candidate._id
            }, keys.jwt, {expiresIn: 3600})
            ctx.response.status = 200
            ctx.body = `Bearer ${token}`
        }
        else {
            ctx.response.status = 401
            ctx.body = 'Пароли не совпадают. Попробуйте снова'
        }
    } else {
        ctx.response.status = 404
        ctx.body = 'Пользователь с таким email не найден.'
    }
}

module.exports.register = async function (ctx) {
    const candidate = await User.findOne({email: ctx.request.body['email']})

    if (candidate) {
        ctx.response.status = 409
        ctx.body = 'Такой email занят. Попробуйте еще раз.'
    }
    else {
        const salt = bcrypt.genSaltSync(10)
        const password = ctx.request.body['password']
        const user = new User({
            email: ctx.request.body['email'],
            password: bcrypt.hashSync(password, salt)
        })
        try{
            await user.save().then(() => console.log('User created'))
            ctx.response.status = 201
            ctx.body = user
        } catch(e) {
            errorHandle(ctx, e)
        }
    }
}
