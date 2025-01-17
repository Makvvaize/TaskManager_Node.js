const express = require('express')
const app = express()
const tasks = require('./routes/tasks')
const connectDB = require('./db/connect')
require('dotenv').config()
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

//middleware
app.use(express.static('./public'))
app.use(express.json())

//routes
app.use('/api/v1/tasks',tasks)
// notFound is for all routes that's why It should come after all routes that i used.
app.use(notFound)
// there is a built in error handler in express. I built one errorhandlerMiddleware for custom purposes.
app.use(errorHandlerMiddleware)



const port = process.env.PORT || 3000

const start = async()=>{
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log('Port 3000 is listening....'))
    } catch (error) {
        console.log(error)
    }
}

start()


