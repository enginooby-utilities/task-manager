import { User } from '../models/user'
import { Model } from 'mongoose'
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

userRouter.post('/login', async (req, res) => {
  try {
    if (!req.body.email || !req.body.pwd) return res.status(400).send({ error: "Email and password are required." })
    const user = await User.findByCredentials(req.body.email, req.body.pwd)
    if (user) res.send(user)
  } catch (error) {
    res.status(400).send(error.message)
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
  const isRequestValid = validateRequestByKeys(req, User)
  if (!isRequestValid) return res.status(400).send({ error: "Invalid request" });

  try {
    //Problem:  findByIdAndUpdate() skip middleware
    // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

    // Solution: use findById(), manually update each key then save() to utilize middleware
    const user = await User.findById(req.params.id)
    if (!user) return res.sendStatus(404)
    const requestKeys = Object.keys(req.body)
    requestKeys.forEach(key => user[key] = req.body[key])
    await user.save();
    return res.send(user);
  } catch (error) {
    res.status(500).send()
  }
})

// UTIL
function validateRequestByKeys(req: Request, model: Model<any>, unupdatableKeys: string[] = ['_id', '__v']) {
  const modalKeys = Object.keys(model.schema.paths);
  const requestKeys = Object.keys(req.body)
  const updatableKeys = modalKeys.filter(key => !unupdatableKeys.includes(key))
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