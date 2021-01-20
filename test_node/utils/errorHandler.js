module.exports = (ctx, error) => {
    ctx.status = 500
    ctx.body = JSON.stringify({
        success: false,
        message: error.message ? error.message : error
    })
}
