const mongoose = require('mongoose');
const express = require('express');
const app = express();
const cors = require('cors');
const session = require('express-session')
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
app.use(express.urlencoded({extended: true})); //bodyparser
app.use(cors());
app.use(express.json());
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
        secure: 'development' === 'production' //in our case, this will be false
    }
}))
// this middleware will execute everytime
app.use((req, res, next) => {
    console.log('hola')
    const { userId } = req.session
    if(userId) {
        res.locals.user = users.find(
            user => user.id === userId
        )
    }
    next()
})

// Routes
const articlesRouter = require('./routes/articles');
const lenguageRouter = require('./routes/lenguages');
const authRoute = require('./routes/auth');
app.use('/articles', articlesRouter);
app.use('/lenguages', lenguageRouter);
app.use('/auth', authRoute);

// express is listening the port
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

