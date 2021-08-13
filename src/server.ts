import express, { Application } from 'express'
// import * as db from './db/mongoose'          // ?this does not run code in mongoose  file to connect to db
require('./db/mongoose')
import { User } from './models/user'

const app: Application = express()
const port = process.env.PORT || 3002

// to recognize the incoming POST/PUT request object as Json object, retrieved from req,body
app.use(express.json())

app.post('/users', (req, res) => {
        new User(req.body).save()
                .then((newUser) => {
                        res.status(201).send(newUser)
                }).catch(error => {
                        res.status(400).send(error)
                })
})

app.get('/users', (req, res) => {
        // use empty filter {} to get all
        User.find({}).then((users) => {
                res.send(users)
        }).catch((error) => {
                res.status(500).send()
        })
})

app.listen(port, () => {
        console.log(`App is running at http://localhost:${port}`)
})
