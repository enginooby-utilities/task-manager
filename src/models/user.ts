import { model, Schema } from 'mongoose'

// 1. Create an interface representing a document in MongoDB.
interface User {
        name: string,
        age: number
}

// 2. Create a Schema corresponding to the document interface.
export const userSchema = new Schema<User>({
        name: { type: String, required: true },
        age: { type: Number, required: true }
})

// hook schema to middleware to perform hashing pwd before saving for Create & Update request
// ! this must performs before create model from schema
userSchema.pre('save', async function (next) {
        const user = this
        console.log('before saving')
        next()
})

// 3. Create a Model.
const User = model<User>('User', userSchema);



// export with ES6 style
export { User };