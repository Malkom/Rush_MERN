let express = require('express');
let router = express.Router();

let follow = require('../Models/follows');
let user = require('../Models/users');

router.post('/follow', (request, response) => {
    const follower = request.body.user_id;
    const leader = request.body.leader_id;

    user.findOne( {_id: leader, baned: follower }, function(err, ban){
        if(err)
        {
            console.log(err);
        }
        else if(!ban)
        {
            //console.log("You can follow this user");
            let newFollow = new follow({
                id_follower: follower,
                id_leader : leader
            });
        
            newFollow.save((err) => {
                if(err){
                    console.log(err);
                }
                else {
                    response.send(JSON.stringify({
                        message: 'Successful Follow :D'
                    }));
                }
            })
        }
        else
        {
            //console.log(ban);
            response.send(JSON.stringify({
                message: 'Error'
            }));
        }

    });
});

router.get('/follow', (request, response) => {
    let query = {id_follower: request.query.id};
    //console.log(query);
    follow.find(query)
    .select('id_leader')
    .populate('id_leader') // multiple path names in one requires mongoose >= 3.6
    .exec(function(err, usersDocuments) {
        if(err){
            console.log(err);
        }
        else
        {
            //console.log('%j', usersDocuments);
            response.json(usersDocuments);
        }
    });
});

router.get('/leader', (request, response) => {
    let query = {id_leader : request.query.id};
    follow.find(query)
        .select('id_follower')
        .populate('id_follower', 'login')
        .exec(function(err, Leaders) {
            if(err){
                console.log(err);
            }
            else
            {
                console.log(Leaders);
                response.json(Leaders);
            }
        });
});

router.delete('/follow', (request, response) => {
    let query = {id_leader: request.query.id};
    //console.log(query);
    follow.findOneAndRemove(query, function(err, usersDocuments) {
        if(err){
            console.log(err);
        }
        else
        {
            response.send(JSON.stringify({
                message: 'Successful'
                }));
        }
    });
});




module.exports = router;