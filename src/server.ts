import express, { Application, Request } from 'express'
import { userRouter } from './routers/user'
// import * as db from './db/mongoose'          // ?this does not run code in mongoose  file to connect to db
require('./db/mongoose')

const app: Application = express()
const port = process.env.PORT || 3002

// to recognize the incoming POST/PUT request object as Json object, retrieved from req,body
app.use(express.json())
app.use('/users', userRouter)

app.listen(port, () => {
        console.log(`App is running at http://localhost:${port}`)
})
