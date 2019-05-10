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

/// Routes
let usersRouter = require('./Routes/users');
let articlesRouter = require('./Routes/article');
let followsRouter = require('./Routes/follow');
let banRouter = require('./Routes/ban');
app.use('/', usersRouter);
app.use('/', articlesRouter);
app.use('/', followsRouter);
app.use('/', banRouter);

app.listen(4242);
module.exports = app;