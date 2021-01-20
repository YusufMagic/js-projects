const multer = require('@koa/multer');
const path = require('path')
const fs = require('fs');

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const filefil = (req, file, cb) => {
    if (file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const limits  = {
    fileSize: 1024 * 1024 * 5
}


const upload = multer({
    storage:storage,
    limits:limits,
    filefilter:filefil
})

module.exports = upload
