const express = require('express')
const app = express()
const router = require('express').Router();
let Lenguage = require('../models/lenguage.model');

router.get('/', (req, res) => {
    Lenguage.find()
        .then( lenguages => res.json(lenguages))
        .catch( err => res.status(400).json( 'Error: ' + err))
})

router.post('/add', (req, res) => {
    const lenguage = req.body.lenguage
    const newLenguage = new Lenguage( { lenguage})

    newLenguage.save()
        .then( () => res.json('Lenguage added!'))
        .catch( err => res.status(400).json( 'Error' + err))
})

module.exports = router;

/*
router.route('/').get( (req, res) => {
    Lenguage.find()
    .then( lenguages => res.json(lenguages) )
    .catch( err => res.status(400).json( 'Error: ' + err) );
});

router.route('/add').post( (req, res) => {
    const lenguage = req.body.lenguage;
    
    const newLenguage = new Lenguage( { lenguage } );
    
    newLenguage.save()
    .then( () => res.json('Lenguage added!') )
    .catch( err => res.status(400).json( 'Error: ' + err ) );
    
});*/