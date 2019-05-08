let mongoose = require('mongoose');

let followsSchema = mongoose.Schema({
    id_follower : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    id_leader : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    }]
});

const Follow = mongoose.model('Follow', followsSchema);
 module.exports = Follow;