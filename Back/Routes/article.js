let express = require('express');
let router = express.Router();

let article = require('../Models/articles');
let user = require('../Models/users');
let follow = require('../Models/follows');

router.get('/articles', (request, response) => {
    article.find({})
        .sort({updated_at: -1})
        .exec(function(err, articles){
        // console.log(articles);
        if(err) console.log(err);
        else{
            response.json(articles);
        }
    });
});

router.get('/articlesByFollow', (request, response) => {
    let query = {id_follower : request.query.id};
    follow.find(query)
    .select('id_leader -_id')
    .exec(function(err, follower){
        if(err) console.log(err);
        else{
            myarray=[];
            //console.log(follower[0].id_leader);
            follower.forEach(function(item){
                myarray.push(item.id_leader);
            })
            myarray.push(request.query.id.toString());
            // console.log(myarray);
            article.find({idCreator: {$in: myarray}}, null, {sort: {updated_at: -1}}, function(err, articles){
                if(err){
                    console.log(err);
                }
                else{
                    //console.log(articles);
                    response.json(articles);
                }
            })
        }
    });
});

router.post('/article/add', (request, response) => {
    //const image = request.body.image;
    const idCreator = request.body.id;
    const description = request.body.description;

    var newArticle = new article({
        idCreator: idCreator,
        image:'image',
        description: description
    })
    

        newArticle.save((err)=> {
            if(err){
            console.log(err);
            return;
            }
            else {
                response.send(JSON.stringify({
                    message: 'Successful'
                }));
            }
        });
})

router.get('/article/display', (request, response) => {
    let param = request.query.id;
    console.log(param);
    article.findById(param, function(err, article){
        if(err) 
            {response.send(JSON.stringify({
            message: 'Oops, Something went wrong.'
            }));
            console.log(err)}
        else 
        {
            response.json(article);   
        }
    }); 
});

router.post('/article/edit', (request, response) => {
    var query = { _id: request.body.id };
    // console.log(query);
    var update = {
        description: request.body.description};

    article.findOneAndUpdate(query, update, function(err, articles){
        if(err) 
        {   
            response.send(JSON.stringify({
            message: 'Oops, Something went wrong.'
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

router.delete('/article/delete', (request, response) => {
    let param = request.query.id;
    //var query = { _id: request.body.id };
    //console.log(query);
    //////// Insert params into mongo ///////////
    article.findByIdAndRemove(param, function(err){
        if(err) 
        {   
            response.send(JSON.stringify({
            message: 'Oops, Something went wrong. We cannot delete your message.'
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