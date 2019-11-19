/* eslint-disable no-console */
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const db = require('../db/index');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('dist'));

app.post('/leads', (req, res) => {
  db.create(req.body)
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.error('POST fail', err.stack);
      res.sendStatus(500);
    });
});

app.get('/leads', (req, res) => {
  db.read(req.body)
    .then((docs) => res.json(docs))
    .catch((err) => {
      console.error('GET fail', err.stack);
      res.sendStatus(500);
    });
});

app.get('/leads/:_id', (req, res) => {
  db.read(req.params)
    .then((docs) => res.json(docs))
    .catch((err) => {
      console.error('GET fail', err.stack);
      res.sendStatus(500);
    });
});

app.patch('/leads/:_id', (req, res) => {
  db.update(req.params, req.body)
    .then(() => res.sendStatus(202))
    .catch((err) => {
      console.error('PATCH fail', err.stack);
      res.sendStatus(500);
    });
});

app.delete('/leads/:_id', (req, res) => {
  db.destroy(req.params)
    .then(() => res.sendStatus(202))
    .catch((err) => {
      console.error('PATCH fail', err.stack);
      res.sendStatus(500);
    });
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Server is listening on port', port);
});
