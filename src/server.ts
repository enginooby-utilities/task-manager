import express, { Application } from 'express'
import * as db from './db/mongoose'
import { User } from './models/user'

const app: Application = express()
const port = process.env.PORT || 3002

app.post('/users', (req, res) => {
        res.send('Testing')
})

app.listen(port, () => {
        console.log(`App is running at http://localhost:${port}`)
})
