const router = require('express').Router();
let User = require('../models/user.model');
const Joi = require('@hapi/joi');

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

router.route('/login').post(async (req, res) => {
    //Lets validate the data
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    });
    const { error } = schema.validate(req.body);
    if(error) return res.status(400).send(error.details[0].message)

    //Cheking if the email already exists
    const user = await User.findOne({ email: req.body.email });
    if(!user) return res.status(400).send('Email is not found');
    res.send(user);

});

module.exports = router;
