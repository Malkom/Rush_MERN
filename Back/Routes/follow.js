let express = require('express');
let router = express.Router();

let follow = require('../Models/follows');
let user = require('../Models/users');

router.post('/follow', (request, response) => {
    const follower = request.body.user_id;
    const leader = request.body.leader_id;

    user.findOneAndUpdate({_id: follower}, {$addToSet: {follows: leader}}, {upsert: true}, function(err){
        if(err){
            console.log(err);
        }
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
    }) 
})

router.get('/follow', (request, response) => {
    let query = {id_follower: request.query.id};
    console.log(query);
    follow.find(query, function(err, followers){
        console.log(followers);
        if(err){
            console.log(err);
        }
        else {
            //console.log(follow.id_leader.login);
            response.json(followers);
        }
    })
})

module.exports = router;