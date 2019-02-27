const express = require('express');
const bodyParser = require('body-parser');
const mondodb = require('mongodb');
const ObjectID = mondodb.ObjectID;

const app = express();
app.use(bodyParser.json());

let db;

mondodb.MongoClient.connect("mongodb://localhost:27017/cms", function(err, client){
    if(err){
        console.log(err);
        process.exit(1);
    }

    db = client.db();
    console.log("Database connection ready");

    const server = app.listen(8080, function(){
        const port = server.address().port;
        console.log("App is running on port: ", port);
    })
})