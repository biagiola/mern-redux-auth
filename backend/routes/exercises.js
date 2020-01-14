const router = require('express').Router();
let Exercise = require('../models/exercise.model');

// read all the articles
router.route('/').get( (req, res) => {
    Exercise.find()
        .then( exercises => res.json(exercises) )
        .catch( err => res.status(400).json('Error ' + err) );
});

// add a new article
router.route('/add').post( (req, res) => {
    const lenguage = req.body.lenguage;
    const title = req.body.title;
    const description = req.body.description;
    const date = Date.parse(req.body.date);

    const newExercise = new Exercise({
        lenguage,
        title,
        description,    
        date,
    });

    newExercise.save()
        .then( () => res.json( 'Exercise added!' ) )
        .catch( () => res.status(400).json( 'Error: ' + err) );
});

// grab unique data
router.route('/:id').get( (req, res) => {
    Exercise.findById( req.params.id )
        .then( exercise => res.json( exercise ) )
        .catch( err => res.status(400).json('Error: ' + err) );
});
// detele unique data
router.route('/:id').delete( (req, res) => {
    Exercise.findByIdAndDelete( req.params.id )
        .then( () => res.json( 'Exercise deleted!' ) )
        .catch( err => res.status(400).json('Error: ' + err) );      
});
// update unique data
router.route('/update/:id').post( (req, res) => {
    Exercise.findById( req.params.id )
        .then( exercise => {
            exercise.lenguage = req.body.lenguage;
            exercise.title = req.body.title;
            exercise.description = req.body.description;
            exercise.date = Date.parse( req.body.date );

            exercise.save()
                .then( () => res.json( 'Exercise update!' ))
                .catch( err => res.status(400).json( 'Error: ' + err ) );
        })
        .catch( err => res.status(400).json( 'Error: ' + err ) );
});

module.exports = router;