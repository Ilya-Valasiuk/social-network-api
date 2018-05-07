const path = require('path');
require('app-module-path').addPath(path.join(__dirname, 'app'));

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const passport = require('passport');
const APIRouter = require('./app/routes/api');

const { connectToDatabase } = require('./app/config/database');

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'POST, PUT, GET, OPTIONS');
  next();
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('combined'));
app.use(passport.initialize());
app.use(passport.session());
require('./app/middlewares/passport');

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

connectToDatabase();

app.use('/api', APIRouter());

app.listen(3000, () => console.log('Example app listening on port 3000!'));
