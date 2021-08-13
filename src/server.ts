import express, { Application } from 'express'
import * as db from './db/mongoose'
import { User } from './models/user'

const app: Application = express()
const port = process.env.PORT || 3002

// to recognize the incoming POST/PUT request object as Json object, retrieved from req,body
app.use(express.json())

app.post('/users', (req, res) => {
        console.log(req.body)
        res.send('Testing')
})

app.listen(port, () => {
        console.log(`App is running at http://localhost:${port}`)
})
