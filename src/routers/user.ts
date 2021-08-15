import { User, userSchema } from '../models/user'
import { Schema } from 'mongoose'
import { Request, Router } from 'express'

const userRouter = Router()

userRouter.post('/', async (req, res) => {
        try {
                const user = await new User(req.body).save();
                res.status(201).send(user)
        } catch (error) {
                res.status(400).send(error)
        }
})

userRouter.get('/', async (req, res) => {
        try {
                // use empty filter {} to get all
                const users = await User.find({});
                res.send(users)
        } catch (error) {
                res.status(500).send()
        }
})

// use :{param}  and retrieve value from req.params.{param}
userRouter.get('/:id', async (req, res) => {
        try {
                const user = await User.findById(req.params.id)
                return user ? res.send(user) : res.status(404).send()
        } catch (error) {
                res.status(500).send()
        }
})

userRouter.patch('/:id', async (req, res) => {
        const isRequestValid = validateRequestByKeys(req, userSchema)
        if (!isRequestValid) return res.status(400).send({ error: "Invalid request" });

        try {
                const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
                return user ? res.send(user) : res.status(404).send()
        } catch (error) {
                res.status(500).send()
        }
})

// UTIL
function validateRequestByKeys(req: Request, schema: Schema<any>, unupdatableKeys: string[] = ['_id', '__v']) {
        const schemaKeys = Object.keys(schema.paths);
        const requestKeys = Object.keys(req.body)
        const updatableKeys = schemaKeys.filter(key => !unupdatableKeys.includes(key))
        const isRequestValid = requestKeys.every(key => updatableKeys.includes(key))
        return isRequestValid;
}

userRouter.delete('/:id', async (req, res) => {
        try {
                const user = await User.findByIdAndDelete(req.params.id)
                user ? res.send(user) : res.sendStatus(404)
        } catch (error) {
                res.sendStatus(500)
        }
})

export { userRouter }