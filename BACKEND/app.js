import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './routes/index.js';
let createCollectionsScripts = require('./middlewares/createCollectionsScripts');

const app = express();

// connect to db
mongoose.connect('mongodb://localhost:27017/cms', { useNewUrlParser: true }, function(err, response){
    if(err)
        console.log("There is error in connecting with mongodb.");
    console.log("Connection has been added");
});

createCollectionsScripts.createRoles();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// catch 400
app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(400).send(`Error: ${res.originUrl} not found`);
    next();
});

// catch 500
app.use((err, req, res, next) => {
    console.log(err.stack)
    res.status(500).send(`Error: ${err}`);
    next();
});

routes(app);

export default app;