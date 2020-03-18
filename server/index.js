/* eslint-disable no-console */
require('dotenv').config();
const express = require('express');
const ejs = require('ejs');
const session = require('express-session');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const mongoStore = require('connect-mongo')(session);
const bodyParser = require('body-parser');
const morgan = require('morgan');
const db = require('./db/index');
const { Users } = require('./db/model');
const router = require('./router');
const { createHash, createSalt } = require('./hashHelper');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('tiny'));

app.set('views', `${__dirname}/views`);
app.set('view engine', 'ejs');

app.use(session({
  secret: process.env.SECRET,
  name: 'jobxhunter',
  proxy: true,
  resave: false,
  saveUninitialized: true,
  store: new mongoStore({ mongooseConnection: mongoose.connection }),
  cookie: {
    maxAge: 3600000,
    expires: new Date(Date.now() + 3600000)
  }
}));

passport.use(new localStrategy(
  function (username, password, done) {
    Users.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username/password' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect username/password' });
      }
      return done(null, user);
    });
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
  done(null, user._id);
}),

passport.deserializeUser(function (id, done) {
  Users.findById(id, function (err, user) {
    done(err, user);
  });
}),

app.get('/', (req, res, next) => {
  if (req.user) {
    res.set({ user: req.user.username});
    next();
  } else {
    res.redirect('/login');
  }
});

app.use(express.static('dist'));

app.get('/login', (req, res) => {
  if (req.user) {
    res.redirect('/');
  } else {
    res.render('login');
  }
});

// custom callback
app.post('/login', function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    if (err) { return next(err); }
    if (!user) { return res.render('login', info); }
    req.logIn(user, function (err) {
      if (err) { return next(err); }
      return res.render('index')
    });
  })(req, res, next);
});

app.get('/signup', (req, res) => {
  res.render('signup');
});

app.post('/signup', (req, res) => {
  const salt = createSalt();
  const hashedPassword = createHash(req.body.password, salt);
  Users.create({ username: req.body.username, password: hashedPassword, salt: salt})
    .then(() => res.render('login', {message: 'Welcome!'}))
    .catch(err => {
      console.error('signup error', err);
        res.render('signup', { message: 'The username is already in use.' })
    });
})

app.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

app.get('/leads', router.leads.get);
app.post('/leads', router.leads.post);
app.get('/leads/:_id', router.lead.get);
app.patch('/leads/:_id', router.lead.patch);
app.delete('/leads/:_id', router.lead.delete);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Server is listening on port', port);
});
