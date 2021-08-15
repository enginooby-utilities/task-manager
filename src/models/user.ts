import { model, Schema } from 'mongoose'
import bcrypt from 'bcrypt'

// 1. Create an interface representing a document in MongoDB.
interface User {
        name: string,
        age: number,
        pwd: string
}

// 2. Create a Schema corresponding to the document interface.
export const userSchema = new Schema<User>({
        name: { type: String, required: true },
        age: { type: Number, required: true },
        pwd: { type: String, required: true },
})

//Optional: setup middleware ( ! this must performs before create model from schema)
// hook schema to middleware to perform hashing pwd before saving for Create & Update request
userSchema.pre('save', async function (next) {
        const user = this
        if (user.isModified('pwd')) user.pwd = await bcrypt.hash(user.pwd, 8)
        next()
})

// 3. Create a Model.
const User = model<User>('User', userSchema);

// export with ES6 style
export { User };