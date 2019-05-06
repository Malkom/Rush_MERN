const express = require('express');
const router = express.Router();
let crypto = require('crypto');
const jwt = require('jsonwebtoken');
user = require('../Models/users');

process.env.SECRET_KEY = 'secret';

router.get('/users/findUsers', (request, response) => {
    let param = request.query.email;
    user.find({ email: { $ne: param } }, function(err, users){
        //console.log(users);
        if(err) console.log(err);
        else{
            response.json(users);
        }    
    });
})

router.post('/users/login', (request, response) => {
    let email = request.body.email;
    let password = request.body.password;

    /// create login hash password
    const hash = crypto.createHash('sha1');
    let pass_hash = hash.update(password, 'utf-8');
    new_hash= pass_hash.digest('hex');
    var query = { email: email };

    user.findOne(query, function(err, user){
        //console.log(user);
        if (err) {
            response.send(JSON.stringify({
                //extra: data,
                message: 'Failed to login.'
            }));
        }
        else if (user === null) 
        {
            response.send(JSON.stringify({
                //extra: data,
                message: 'Failed to login. User does not exist'
            }));
        }
        else
        {
            str_name = JSON.stringify(user.login);
            if(user.password != new_hash){
                response.send(JSON.stringify({
                    message: 'Failed to login. Wrong password'
                }));
            }
            else{
                const payload = {
                    _id: user._id,
                    login: user.login,
                    email: user.email
                }
                let token = jwt.sign(payload, process.env.SECRET_KEY, {
                    expiresIn:1440
                })
                response.send(
                    JSON.stringify({
                        name: user.login,
                        message: 'Successful', 
                        token: token
                }));
            }
        }
    });
});

router.post('/users/register', (request, response) => {
    let name = request.body.name
    let email = request.body.email
    let password = request.body.password
    let confpass = request.body.confPass

    /// create hash password
    const hash = crypto.createHash('sha1');
    let pass_hash = hash.update(password, 'utf-8');
    gen_hash= pass_hash.digest('hex');

    //////// Insert params into mongo ///////////
    var newUser = new user({
        login:name,
        email:email,
        password:gen_hash,
        });

    newUser.save((err)=> {
        if(err){
            response.send(JSON.stringify({
                //extra: data,
                message: "Error registration"
            }));
        }
        else {
            response.send(JSON.stringify({
                //extra: data,
                message: "Successful"
            }));
        }
    }); 
})

router.post('/users/edit', (request, response) => {
    /// create hash password
    const hash = crypto.createHash('sha1');
    let pass_hash = hash.update(request.body.password, 'utf-8');
    gen_hash= pass_hash.digest('hex');

    var query = { _id: request.body.id };
    var update = { 
        login: request.body.name,
        email: request.body.email,
        password: gen_hash
    };
    //////// Insert params into mongo ///////////
    user.findOneAndUpdate(query, update, {new: true}, function(err, user){
        console.log(user);
        if(err) 
        {   
            response.send(JSON.stringify({
            message: 'Oops, Something went wrong.'
            }));
            console.log(err)
        }

        else {
            const payload = {
                _id: user._id,
                login: user.login,
                email: user.email
            }
            let token = jwt.sign(payload, process.env.SECRET_KEY, {
                expiresIn:1440
            })
            response.send(JSON.stringify({
            message: 'Successful',
            token: token,
            editName: user.login
            }));
        }
    }); 
})

router.delete('/users/delete', (request, response) => {
    let param = request.query.id;
    //var query = { _id: request.body.id };
    //console.log(query);
    //////// Insert params into mongo ///////////
    user.findByIdAndRemove(param, function(err){
        if(err) 
        {   
            response.send(JSON.stringify({
            message: 'Oops, Something went wrong. We cannot delete your account.'
            }));
            console.log(err)
        }

        else {
            response.send(JSON.stringify({
            message: 'Successful'
            }));
        }
    }); 
})



module.exports = router;