import mongoose from 'mongoose'

const DB_URL = 'mongodb://127.0.0.1:27017';
const DB_NAME = 'task-manager';

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

