let express = require('express');
let router = express.Router();

let follow = require('../Models/follows');

router.post('/follow', (request, response) => {
    const follower = request.body.user_id;
    const leader = request.body.leader_id;

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

router.get('/follow', (request, response) => {
    let query = {id_follower: request.body.id};
    console.log(query);
    follow.find(query, function(err, followers){
        console.log(followers);
        if(err){
            console.log(err);
        }
        else {
            response.json(followers);
        }
    })
})

module.exports = router;