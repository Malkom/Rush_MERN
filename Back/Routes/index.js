var express = require('express');
var router = express.Router();

let article = require('../Models/articles');
let user = require('../Models/users');

router.get('/', (request, response) => {

    article.find({}, function(err, articles){
        if(err) console.log(err)
        else if(request.session.name)
        {   
            response.render('pages/article_index', {
                title: 'Articles',
                articles: articles,
                name: request.session.name
            });

        }
        else response.render('pages/login', {
            title: 'Login',
        });
    });
})

module.exports = router;
