import { MongoClient } from 'mongodb';
import mongoose, { model, Schema } from 'mongoose';

const DB_URL = 'mongodb://127.0.0.1:27017';
const DB_NAME = 'task-manager';

connectToDbWithMongoose();
// createModel();

async function connectToDbWithMongoose() {
        mongoose.connect(`${DB_URL}/${DB_NAME}`, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
                useCreateIndex: true
        }).then(() => {
                console.log('Connected to db using Mongoose')
        }).catch((error) => { // does not work even w/ bad url?
                console.log('Unable to connect to db', error)
        })

}

function createModel() {
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
        const UserModel = model<User>('User', userSchema);

        // try adding doc using the Model
        const me = new UserModel({
                name: 'enginoobz',
                age: '2et5'
        }).save().then(() => {
                // console.log(me);
        }).catch((error) => {
                console.log('Error on saving doc', error)
        })
}

// REMOVE
function connectToDbWithMongoClient() {
        //@ts-ignore
        MongoClient.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
                if (error) return console.log('Unable to connect to database!')

                const db = client.db(DB_NAME)
                db.collection('vips').insertOne({
                        name: 'enginoobz',
                        age: 25
                }, (error, result) => {
                        if (error) return console.log('Unable to insert data')
                })
        })
}



