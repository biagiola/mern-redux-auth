const router = require('express').Router();
let User = require('../models/user.model');

const { registerValidation, loginValidation } = require('../../src/validation');

const Joi = require('@hapi/joi');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    console.log('store multer, file ', file)
    cb(null, file.originalname)
  }
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});


router.post('/login', (req, res) => {
  //Lets validate the data
  const schema = Joi.object({
      email: Joi.string().min(6).required().email(),
      password: Joi.string().min(6).required()
  });
  const { error } = schema.validate(req.body);
  if(error) return res.status(400).send(error.details[0].message)
  
  User.find({ email: req.body.email })
  .exec()
  .then(user => {
    if (user.length < 1) {
      return res.status(401).json({
        message: "Auth failed"
      });
    }
    bcrypt.compare(req.body.password, user[0].password, (err, result) => {
      if (err) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      if (result) {
        const token = jwt.sign(
          {
            email: user[0].email,
            userId: user[0]._id
          },
          'secret',
          {
            expiresIn: "1h"
          }
        );
        return res.status(200).json({
          message: "Auth successful",
          name: user[0].name,
          token: token
        });
      }
      res.status(401).json({
        message: "Auth failed"
      });
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    });
  });

    // search the data in the db
    /*User.findOne({ email: req.body.email })
      .exec()
      .then( response => {
        console.log('user found, response: ', response)
        res.status(200).json({ 
          response: response,
        })
      })
      .catch( err => {
        res.status(404).send('User not found')
      })
    */
});

router.post('/register', upload.single('productImage'), async (req, res) => {
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

    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
          return res.status(500).json({
            error: err
          });
        } else {
          const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hash,
            productImage: req.file.path // req.file is from multer
          });
          user
            .save()
            .then(result => {
              console.log(result);
              res.status(201).json({
                message: "User created"
              });
            })
            .catch(err => {
              console.log(err);
              res.status(500).json({
                error: err
              });
            });
        }
    })

    /*try{
        const savedUser = await user.save();
        console.log('auth.js /register', savedUser);
        savedUser.message = "user has been saved";
        res.send(savedUser);
    }catch( err ) {
        console.log('auth.js ERROR');
        res.status(404).send(err);
    }*/
});

module.exports = router;
