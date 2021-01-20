const Order = require('../models/Order')
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = async function (ctx) {
        const query = {
            user: ctx.state.user
        }
        //start - date start
        if (ctx.request.query.start) {
            query.date = {
                //Берем дату больше или равную (после старта)
                $gte: ctx.request.query.start
            }
        }

        if (ctx.request.query.end) {
            if (!query.start) {
                query.date = {}
            }

            //Берем дату меньше или равную end
            query.date['$lte'] = ctx.request.query.end
        }

        if (ctx.request.query.order) {
            query.order = +ctx.request.query.order
        }
        try {

            ctx.body = await Order
                .findById(query)
                .sort({date: -1})
                .skip(+ctx.request.query.offset)
                .limit(+ctx.request.query.limit)
            ctx.status = 200
        } catch (e) {
            errorHandler(ctx.response, e)
        }
}

module.exports.create = async function (ctx) {
    try {
        const lastOrder = await Order.findOne({user:ctx.state.user}).sort({date: -1})
        const maxOrder = lastOrder ? lastOrder.order : 0
        const order = await new Order({
            list: ctx.request.body['list'],
            user: ctx.state.user,
            order:maxOrder + 1
        }).save()
        ctx.status = 200
        ctx.body = order
    } catch (e) {
        errorHandler(ctx.response, e)
    }

}
