let mongoose = require('mongoose');

let userSchema = mongoose.Schema({
    login :{
        type : String,
        required: 'Login is required',
        unique : true,
        minlength: 5,
        maxlength: 20
    },
    email :{
        type : String,
        required: 'Enter a valid email', 
        unique : true,
        match : /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}$/
    },
    password :{
        type : String,
        required : 'Enter a password'
    },
    admin :{
        type : Boolean,
        default : false
    }
});

const user = module.exports = mongoose.model('user', userSchema);