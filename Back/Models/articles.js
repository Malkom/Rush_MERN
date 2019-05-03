let mongoose = require('mongoose');

let articleSchema = mongoose.Schema({
    idCreator:{
        type: String,
    },
    image :{
        type : String,
        required: 'Path is required',
    },
    title :{
        type : String,
        required: 'Enter a title', 
        unique : true
    },
    description :{
        type : String,
        required : 'Enter a description'
    }
});

const article = module.exports = mongoose.model('article', articleSchema);

