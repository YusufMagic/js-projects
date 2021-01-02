const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const postRouter = require('./routes/post')
const keys = require('./keys')
const app=express()

const port = process.env.PORT || 5000
const clientPath = path.join(__dirname, 'client')

mongoose.connect(keys.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(()=>{console.log('Mongo DB connected')})
    .catch(err => console.error(err))



app.use('/api/post', postRouter)
app.use(express.static(clientPath))

app.listen(port, () =>{
    console.log(`Server has been started on port ${port}`)
})