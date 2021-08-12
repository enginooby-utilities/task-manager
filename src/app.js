"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const connectionUrl = 'mongodb://127.0.0.1:27017';
const dbName = 'task-manager';
//@ts-ignore
mongodb_1.MongoClient.connect(connectionUrl, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error)
        return console.log('Unable to connect to database!');
    const db = client.db(dbName);
    db.collection('vips').insertOne({
        name: 'enginoobz',
        age: 25
    });
});
//# sourceMappingURL=app.js.map