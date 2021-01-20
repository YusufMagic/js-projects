const Category = require('../models/Category')
const Position = require('../models/Position')
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = async function (ctx) {
    try {
        const categories = await Category.find({user: ctx.state.user})
        ctx.status = 200
        ctx.body = categories
    } catch(e) {
        errorHandler(ctx, e)
    }
}


module.exports.getById = async function (ctx) {
    try {
        console.log(ctx.params.id)
        const category = await Category.findById(ctx.params.id)
        ctx.status = 200
        ctx.body = category
    } catch(e) {
        errorHandler(ctx, e)
    }
}

module.exports.remove = async function (ctx) {
    try {
        await Category.remove({_id: ctx.params.id})
        await Position.remove({category: ctx.params.id})
        ctx.status = 200
        ctx.body = 'Категория удалена'
    } catch(e) {
        errorHandler(ctx, e)
    }
}

module.exports.create = async function (ctx) {
const category = new Category({
    name:ctx.request.body["name"],
    user: ctx.state.user,
    imageSrc: ctx.request.file ? ctx.request.file.path : ''
})

    try {
        await category.save()
        ctx.status = 201
        ctx.body = category
    } catch(e) {
        errorHandler(ctx, e)
    }
}

module.exports.update = async function (ctx) {
    const updated = {
        name: ctx.request.body['name']
    }

    if (ctx.request.file) {
        updated.imageSrc = ctx.request.file.path
    }
    try {
        const category = await Category.findOneAndUpdate({_id: ctx.params.id}, {$set: updated}, {new: true})
        ctx.status = 200
        ctx.body = category
    } catch(e) {
        errorHandler(ctx, e)
    }
}
