const router = require('express').Router();
let Article = require('../models/article.model');
const checkAuth = require('../middleware/check-auth');

// read all the articles
router.get('/', checkAuth, (req, res, next)  => {
    Article.find()
        .then( articles => res.json(articles) )
        .catch( err => res.status(400).json('Error ' + err) );
});

// read unique the article
router.get('/:id', (req, res) => {
    Article.findById( req.params.id )
        .then( article => res.json( article ) )
        .catch( err => res.status(400).json('Error: ' + err) );
});

// detele an article
router.delete('/:id', (req, res) => {
    Article.findByIdAndDelete( req.params.id )
        .then( () => res.json( 'Article deleted!' ) )
        .catch( err => res.status(400).json('Error: ' + err) );      
});

// add a new article
router.post('/add', (req, res) => {
    const lenguage = req.body.lenguage
    const title = req.body.title
    const description = req.body.description
    const date = Date.parse(req.body.date)

    console.log('post /add req: ', req.body)

    const newArticle = new Article({
        lenguage,
        title,
        description,
        date
    })

    newArticle.save()
        .then( () => res.json('Article added!'))
        .catch( (err) => res.status(400).json( 'Error: ' + err ))
})

// update an article
router.post('/update/:id', (req, res) => {
    Article.findById( req.params.id )
        .then( article => {
            article.lenguage = req.body.lenguage
            article.title = req.body.title
            article.description = req.body.description
            article.data = Date.parse( req.body.date )

            article.save()
                .then( () => res.json('Article updated!'))
                .catch( err => res.status(400).json( 'Error: ' + err))
        })
        .catch( err => res.status(400).json('Error: ' + err) )
})

module.exports = router;
