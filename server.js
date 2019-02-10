const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
let db = require('./config/db');

const app = express();

const port = 8000;

app.use(bodyParser.urlencoded({extended: true}));

MongoClient.connect(db.url,(err,client)=>{
    if(err)
        return console.log(err);

    
    require('./app/routes')(app,client.db("user_demo"));
    app.listen(port, () => {
        console.log('Listening to port 8000');
    });
});




