const Position = require('../models/Position')
const errorHandler = require('../utils/errorHandler')

module.exports.getByCategoryId = async function (ctx) {
    try {
        const positions = await Position.find({
            category: ctx.request.query,
            user: ctx.request.user
        })

        ctx.status = 200
        ctx.body = positions
    } catch (e) {
        errorHandler(ctx, e)
    }

}
module.exports.create = async function (ctx) {
    try {
        const position = await new Position({
            name:ctx.request.body["name"],
            cost:ctx.request.body["cost"],
            category: ctx.req.body["category"],
            user: ctx.request.user.id
        }).save()

        ctx.status = 201
        ctx.body(position)
    } catch (e) {
        errorHandler(ctx, e)
    }
}
module.exports.remove = async function (ctx) {
    try {
        await Position.remove({_id: ctx.request.query})
        ctx.status = 200
        ctx.body = "Позиция удалена."
    } catch (e) {
        errorHandler(ctx, e)
    }
}
module.exports.update = async function (ctx) {
    try {
        const position = await Position.findOneAndUpdate({
            _id:ctx.request.query},
            {$set: ctx.request.body},
            {new: true})

        ctx.status = 200
        ctx.body = position
    } catch (e) {
        errorHandler(ctx, e)
    }
}
