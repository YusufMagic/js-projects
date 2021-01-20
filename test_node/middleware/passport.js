const ExtractJwt = require('passport-jwt').ExtractJwt
const JwtStrategy = require('passport-jwt').Strategy
const mongoose = require('mongoose')
const keys = require('../config/keys')
const User = mongoose.model('users')


const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //Берем токен из хедеров
    secretOrKey: keys.jwt
}

module.exports = function (passport) {
    passport.use(                    //Добавление стратегии
        new JwtStrategy(options, async (payload, done) => {
            try {
                const user = await User.findById(payload.userId)
                console.log(user)
                if (user) {
                    done(null, user)
                } else {
                    done(null, false, {message: 'Нет такого пользователя или пароль ложный'})
                }
            } catch(e) {
                console.log(e)
            }
        })
    )
}
