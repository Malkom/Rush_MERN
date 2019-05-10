let express = require('express');
let router = express.Router();

let user = require('../Models/users');
let follow = require('../Models/follows');

router.post('/ban', (request, response) => {
    const user_id = request.body.user_id;
    const banned = request.body.ban_id;

    user.findOneAndUpdate({_id: user_id}, {$addToSet: {baned: banned}}, function (err) {
        if (err) {
            console.log(err);
        } else {
            response.send(JSON.stringify({
                message: 'Successful Ban :('
            }))
        }
    })
});

router.put('/ban', (request, response) => {
    const user_id = request.body.data.user_id;
    const banned = request.body.data.ban_id;
    console.log(request.body);
    // console.log(request.query);
    console.log('User_id : ' + user_id + ' - Ban_id : ' + banned);

    user.findOneAndUpdate({_id: user_id}, {$pull: {baned: banned}}, function (err) {
        if (err) {
            console.log(err);
        } else {
            // follow.findOneAndRemove()
            response.send(JSON.stringify({
                message: 'Successful UnBan :D'
            }))
        }
    })
});

router.get('/ban', (request, response) => {
    let query = {_id: request.query.id};
    user.find(query)
        .select('baned')
        .populate('baned') // multiple path names in one requires mongoose >= 3.6
        .exec(function(err, BanDocuments) {
            if(err){
                console.log(err);
            }
            else
            {
                // console.log('%j', BanDocuments);
                response.json(BanDocuments);
            }
        });
});


module.exports = router;