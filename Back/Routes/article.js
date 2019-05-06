let express = require('express');
let router = express.Router();

let article = require('../Models/articles');

router.get('/articles', (request, response) => {
    article.find({}, null, {sort:{updated_at: -1}}, function(err, articles){
        console.log(articles);
        if(err) console.log(err);
        else{
            response.json(articles);
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
})

router.post('/article/edit', (request, response) => {
    var query = { _id: request.body.id };
    console.log(query);
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

module.exports = router;