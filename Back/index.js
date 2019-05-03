const config = require('./Config/config.js');
let app = require('express')();
const path = require('path');
let bodyParser = require("body-parser");
const mongoose = require('mongoose');
const session = require('express-session');
var cors = require('cors');

// Bypass CORS security
app.use(cors());

// Mongoose DB connection
mongoose.connect("mongodb://localhost:27042/Epitech");
let db = mongoose.connection;

//Check connection
db.once('open', function(){
    console.log('Connection to MongoDB successfull');
});

//Check DB errors
db.on('error', function(err){
    console.log(err);
});

// Template
app.set('view engine', 'pug');
app.use(session({secret: 'ssshhhhh'}));


// MiddleWare
app.use(bodyParser.urlencoded({ extend: true}));
app.use(bodyParser.json());

///Route
var indexRouter = require('./Routes/index');
var usersRouter = require('./Routes/users');
var articlesRouter = require('./Routes/article');
app.use('/', indexRouter);
app.use('/', usersRouter);
app.use('/', articlesRouter);


app.listen(4242);
module.exports = app;