let mongoose = require('mongoose');

let articleSchema = mongoose.Schema({
    idCreator:{
        type: String,
    },
    image :{
        type : String,
        required: 'Path is required',
    },
    description :{
        type : String,
        maxlength: 140,
        required : 'Enter a description'
    }
},
    {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    }
);

const article = module.exports = mongoose.model('article', articleSchema);

