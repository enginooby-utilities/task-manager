"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const mongoose_1 = __importStar(require("mongoose"));
const DB_URL = 'mongodb://127.0.0.1:27017';
const DB_NAME = 'task-manager';
connectToDbWithMongoose();
// createModel();
function connectToDbWithMongoose() {
    return __awaiter(this, void 0, void 0, function* () {
        mongoose_1.default.connect(`${DB_URL}/${DB_NAME}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        }).then(() => {
            console.log('Connected to db using Mongoose');
        }).catch((error) => {
            console.log('Unable to connect to db', error);
        });
    });
}
function createModel() {
    // 2. Create a Schema corresponding to the document interface.
    const userSchema = new mongoose_1.Schema({
        name: { type: String, required: true },
        age: { type: Number, required: true }
    });
    // 3. Create a Model.
    const UserModel = mongoose_1.model('User', userSchema);
    // try adding doc using the Model
    const me = new UserModel({
        name: 'enginoobz',
        age: '2et5'
    }).save().then(() => {
        // console.log(me);
    }).catch((error) => {
        console.log('Error on saving doc', error);
    });
}
// REMOVE
function connectToDbWithMongoClient() {
    //@ts-ignore
    mongodb_1.MongoClient.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
        if (error)
            return console.log('Unable to connect to database!');
        const db = client.db(DB_NAME);
        db.collection('vips').insertOne({
            name: 'enginoobz',
            age: 25
        }, (error, result) => {
            if (error)
                return console.log('Unable to insert data');
        });
    });
}
//# sourceMappingURL=app.js.map