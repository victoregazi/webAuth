//Dependencies
const express = require('express');
const exphbs = require('express-handlebars');

const app = express();


const mongoose = require('mongoose');
//DB connection
const db = require('./config/key').MongoURI;
//CONNECT TO MONGODB
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected..'))
  .catch(err => console.log(err));
// Static Files
app.use(express.static('public'));
//Layout Using Handlebars
const handlebars = exphbs.create({ extname: '.hbs',});
app.engine('.hbs', handlebars.engine);
app.set('view engine', '.hbs');

app.use(express.json());
app.use(express.urlencoded({extended: true}));


//Routes
app.use('/', require('./routes/index'));
app.use('/user', require('./routes/user'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Server started on ${PORT}`));