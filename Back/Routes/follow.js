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
    let query = {id_leader: request.query.id};
    follow.find(query)
        // .select('id_follower')
        // .populate('id_follower') // multiple path names in one requires mongoose >= 3.6
        .exec(function(err, Leaders) {
            if(err){
                console.log(err);
            }
            else
            {
                console.log(Leaders);
                console.log(Leaders[0].id_leader);
                user.find({_id : { $in : Leaders[0].id_leader} })
                    .select("-follows")
                    .select("-password")
                    .exec(function(err, usersLeaders) {
                        if(err){
                            console.log(err);
                        }
                        else {
                            console.log(usersLeaders);
                            // console.log(usersLeaders[0].login);
                            response.json(usersLeaders);
                        }
                    })


            }
        });
});

module.exports = router;