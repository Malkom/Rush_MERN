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
});

router.get('/follow', (request, response) => {
    let query = {id_follower: request.query.id};
    follow.find(query)
    .select('id_leader')
    .populate('id_leader') // multiple path names in one requires mongoose >= 3.6
    .exec(function(err, usersDocuments) {
        if(err){
            console.log(err);
        }
        else
        {
            // console.log('%j', usersDocuments);
            response.json(usersDocuments);
        }
    });
});

router.get('/leader', (request, response) => {
    let query = {_id: request.query.id};
    user.find(query)
        .select('follows')
        .exec(function(err, Leaders) {
            if(err){
                console.log(err);
            }
            else
            {
                user.find({_id : { $in : Leaders[0].follows} })
                    .select('login')
                    // .select("-password")
                    .exec(function(err, usersLeaders) {
                        if(err){
                            console.log(err);
                        }
                        else {
                            response.json(usersLeaders);
                        }
                    })


            }
        });
});

module.exports = router;