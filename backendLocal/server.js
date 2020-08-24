const express = require('express');
const session = require('express-session')
const app = express();

const bodyParser = require("body-parser");
const cors = require('cors');

const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session)

// set port and env
require('dotenv').config();
const port = process.env.PORT || 5000;

// mongodb connection
const uri = 'mongodb://localhost/test1';
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false });
mongoose.connection.once('open', function(){
    console.log('Connection has been made, now make fireworks...');
}).on('error', function(error){
    console.log('Connection error:', error);
}); 

// middlewares
app.use(express.json());
//app.use(express.urlencoded({extended: true})); //bodyparser
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// node-session setup
app.use(session({
    name: 'sid',
    resave: false, //save even if the session was never modified 
    saveUninitialized: false, //force a session that is uninitialized to be saved to the store
    secret: 'jñlasdjfñlaskdjf',
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 2 , //maxime time for a session 
        sameSite: true, //stric
        secure: false //in our case, this will be false
    }
}))

// this middleware will execute everytime
app.use((req, res, next) => {
    //console.log('server.js req.body.email', req.body.email)
    //console.log('server.js req.session', req.session)
    //console.log('server.js req.session', req.session)
    const { userId } = req.session

    if(userId) {
        console.log('testing00')
        res.locals.user = users.find(
            user => user.id === userId
        )
    }
    //console.log('server.js res.locals.user', res.locals.user)
    next()
})

// headers configuration
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );

    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
      return res.status(200).json({});
    }
    next();
});

// Routes
const articlesRouter = require('./routes/articles');
const lenguageRouter = require('./routes/lenguages');
const authRouter = require('./routes/auth');
const bitcoin = require('./routes/bitcoin');
app.use('/articles', articlesRouter);
app.use('/lenguages', lenguageRouter);
app.use('/auth', authRouter);
app.use('/bitcoin', bitcoin);

// express is listening the port
app.listen(port, () => 
    console.log(`Server is running on port ${port}`
));

