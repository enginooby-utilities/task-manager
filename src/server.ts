import express, { Application } from 'express'
// import * as db from './db/mongoose'          // ?this does not run code in mongoose  file to connect to db
require('./db/mongoose')
import { User } from './models/user'

const app: Application = express()
const port = process.env.PORT || 3002

// to recognize the incoming POST/PUT request object as Json object, retrieved from req,body
app.use(express.json())

app.post('/users', async (req, res) => {
        try {
                const user = await new User(req.body).save();
                res.status(201).send(user)
        } catch (error) {
                res.status(400).send(error)
        }
})

app.get('/users', async (req, res) => {
        try {
                // use empty filter {} to get all
                const users = await User.find({});
                res.send(users)
        } catch (error) {
                res.status(500).send()
        }
})

// use :{param}  and retrieve value from req.params.{param}
app.get('/users/:id', async (req, res) => {
        try {
                const user = await User.findById(req.params.id)
                return user ? res.send(user) : res.status(404).send()
        } catch (error) {
                res.status(500).send()
        }
})

app.listen(port, () => {
        console.log(`App is running at http://localhost:${port}`)
})
