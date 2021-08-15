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

// 3. Create a Model.
const User = model<User>('User', userSchema);

// export with ES6 style
export { User };