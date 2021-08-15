import { Model, model, Schema } from 'mongoose'
import bcrypt from 'bcrypt'

// 1. Create an interface representing a document in MongoDB.
interface User {
        name: string,
        age: number,
        email: string
        pwd: string
}

// 2. Create a Schema corresponding to the document interface.
export const userSchema = new Schema<User>({
        name: { type: String, required: true },
        age: { type: Number, required: false },
        email: { type: String, required: true, unique: true, trim: true },
        pwd: { type: String, required: true },
})

// add static method from schema so that we can invoke from the model: User.findByCredentials()
userSchema.statics.findByCredentials = async (email: string, pwd: string) => {
        const user = await User.findOne({ email })
        if (!user) throw Error('Email is not registered.')

        const isPwdMatch = await bcrypt.compare(pwd, user.pwd)
        if (!isPwdMatch) throw Error('Password does not match')

        return user
}
// in case creating statics for shema/model, create an interface with the static function to  work w/ TS
interface UserModel extends Model<User> {
        findByCredentials(email: string, pwd: string): Model<User>
}

//Optional: setup middleware ( ! this must performs before create model from schema)
// hook schema to middleware to perform hashing pwd before saving for Create & Update request
userSchema.pre('save', async function (next) {
        const user = this
        if (user.isModified('pwd')) user.pwd = await bcrypt.hash(user.pwd, 8)
        next()
})

// 3. Create a Model.
const User = model<User, UserModel>('User', userSchema);

// export with ES6 style
export { User };