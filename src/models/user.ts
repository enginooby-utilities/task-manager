import { model, Schema } from 'mongoose'

// 1. Create an interface representing a document in MongoDB.
interface User {
        name: string,
        age: number
}

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<User>({
        name: { type: String, required: true },
        age: { type: Number, required: true }
})

// 3. Create a Model.
const User = model<User>('User', userSchema);

// REMOVE: try adding doc using the Model
const me = new User({
        name: 'enginoobz',
        age: '2et5'
}).save().then(() => {
        // console.log(me);
}).catch((error) => {
        console.log('Error on saving doc', error)
})

// export with ES6 style
export { User };