const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

const corsOptions = {
    "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
  };

app.use(cors(corsOptions));
app.use(express.json());

const uri = 'mongodb://localhost/test1';

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false });

mongoose.connection.once('open', function(){
    console.log('Connection has been made, now make fireworks...');
}).on('error', function(error){
    console.log('Connection error:', error);
});    

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

