const router = require('express').Router();
let User = require('../models/user.model');

console.log('auth.js');

router.route('/').get( (req, res) => {
    console.log('auth.js get');
    User.find()
        .then( users => res.json(users) )
        .catch( err => res.status(400).json( 'Error: ' + err) );
});

router.route('/register').post(async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    try{
        const savedUser = await user.save();
        res.send(savedUser);
    } catch(err) {
        res.status(400).send(err)
    }
});

module.exports = router;
