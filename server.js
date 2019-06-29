const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
require('dotenv').config();
const cors = require('cors');
const config = require('./config/local');
const userRoutes = require('./routes/user.route');
const groupRoutes = require('./routes/groups.route');
const transactionRoutes = require('./routes/transaction.route');


app.use(cors());
app.use(bodyParser.json({
    limit: '10mb'
}));
app.use(bodyParser.urlencoded({
    limit: '10mb',
    extended: true
}));
// app.use(express.json());

app.use(expressValidator());
app.use('/', userRoutes);
app.use('/', groupRoutes);
app.use('/', transactionRoutes);
mongoose.Promise = global.Promise;

function startMongo(mongoObj) {
    mongoose.set('useCreateIndex', true);
    mongoose.connect(mongoObj.url, mongoObj.options);
    mongoose.connection.on("connected", () => {
        console.log("connected to mongodb on %s", mongoObj.url);
    })
    mongoose.connection.on("error", (err) => {
        if (err) {
            console.log("not connected to mongodb due to %s", err);
            process.exit();
        }
    })
}

app.use(function (err, req, res, next) {
    console.error(err);
    var error = {
        status: false,
        status_code: 500,
        message: "Something bad happened. Please contact system administrator or try again"
    };
    res.send(error);
});

app.get('/', (req, res) => {
    res.json('Welcome to splitwise');
});

app.listen(config.PORT, () => {
    console.log("Server is listening on port " + config.PORT);
    startMongo(config.mongo);
});