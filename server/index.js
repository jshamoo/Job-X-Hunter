/* eslint-disable no-console */
const express = require('express');
const ejs = require('ejs');
const session = require('express-session');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const bodyParser = require('body-parser');
const morgan = require('morgan');
const db = require('../db/index');
const router = require('./router');

const app = express();

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
    db.Users.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('tiny'));

app.get('/',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect:'/login',
  })
);

app.get('/login', (req, res) => {
  res.render('login');
})

app.use(express.static('dist'));
app.get('/leads', router.leads.get);
app.post('/leads', router.leads.post);
app.get('/leads/:_id', router.lead.get);
app.patch('/leads/:_id', router.lead.patch);
app.delete('/leads/:_id', router.lead.delete);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Server is listening on port', port);
});
