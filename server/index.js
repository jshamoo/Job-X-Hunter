/* eslint-disable no-console */
const express = require('express');
const ejs = require('ejs');
const session = require('express-session');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const db = require('../db/index');
const { Users } = require('../db/model');
const router = require('./router');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('tiny'));

app.set('views', `${__dirname}/views`);
app.set('view engine', 'ejs');

app.use(session({
  secret: 'rainbow cat',
  name: 'jobxhunter',
  proxy: true,
  resave: true,
  saveUninitialized: true
}));

passport.use(new localStrategy(
  function (username, password, done) {
    Users.findOne({ username: username }, function (err, user) {
      if (err) { console.log('<>>>', err); return done(err); }
      if (!user) {
        console.log('incorrect username???')
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        console.log('!!!!')
        return done(null, false, { message: 'Incorrect password.' });
      }
      console.log('#', user);
      return done(null, user);
    });
}));


app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

passport.serializeUser(function (user, done) {
  done(null, user.id);
}),

passport.deserializeUser(function (id, done) {
  Users.findById(id, function (err, user) {
    done(err, user);
  });
}),

app.get('/',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    // send failure message back
  })
);

app.use(express.static('dist'));
app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', function (req, res, next) {
  console.log('req body', req.body)
  passport.authenticate('local', function (err, user, info) {
    console.log('%%%', user);
    if (err) { return next(err); }
    if (!user) { return res.redirect('/login'); }
    req.logIn(user, function (err) {
      if (err) { return next(err); }
      // return res.redirect('/users/' + user.username);
      return res.render('index')
    });
  })(req, res, next);
});

// app.post('/login',
//   passport.authenticate('local', {
//     successRedirect: '/',
//     failureRedirect: '/login',
//     // send failure message back
//   })
// );

app.get('/signup', (req, res) => {
  res.render('signup');
});

app.post('/signup', (req, res) => {
  Users.create(req.body)
    .then(() => res.redirect('/login'))
    .catch(err => {
      console.error('signup error', err);
      res.sendStatus(500);
    });
})

app.get('/leads', router.leads.get);
app.post('/leads', router.leads.post);
app.get('/leads/:_id', router.lead.get);
app.patch('/leads/:_id', router.lead.patch);
app.delete('/leads/:_id', router.lead.delete);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Server is listening on port', port);
});
