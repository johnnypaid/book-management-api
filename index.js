const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const auth = require('./helpers/auth');
const errorHandler = require('./helpers/error-handler');
require('dotenv').config();

const app = express();

//Midlewares
app.use(cors());
app.options('*', cors());
app.use(express.json());
app.use(morgan('tiny'));
app.use(auth());
app.use('/public/uploads', express.static(__dirname + '/public/uploads'));
app.use(errorHandler);


//Routes
const author = require('./routes/author');
const books = require('./routes/books');

app.use('/api/author', author);
app.use('/api/books', books);


//Db connection
mongoose.connect(process.env.DB_HOST).then(
    () => { console.log('Connected to database.'); },
    err => { console.log(err); }
  );



const port = process.env.PORT || 3000;

app.listen(port, () => { 
    console.log(`Server is listineing at port: ${port}`) 
});