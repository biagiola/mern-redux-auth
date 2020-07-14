const router = require('express').Router();
let User = require('../models/user.model');
const { registerValidation, loginValidation } = require('../../src/validation');
const Joi = require('@hapi/joi');

router.route('/register').post(async (req, res) => {
    //Validate the email
    const { error } = registerValidation(req.body);
    if (error) {
        console.log('auth.js in-error ', error.details[0].message );
        return res.status(400).send(error.details[0].message);
    }

    //Cheking if the user is already in the data base
    const emailExist =  await User.findOne({ email: req.body.email });
    if(emailExist) {
        console.log('auth if, Email already exists');
        return res.status(403).send('Email already exists');
    }

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    try{
        const savedUser = await user.save();
        console.log('auth.js /register', savedUser);
        savedUser.message = "user has been saved";
        res.send(savedUser);
    }catch( err ) {
        console.log('auth.js ERROR');
        res.status(404).send(err);
    }
});

router.post('/login', async (req, res) => {
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
