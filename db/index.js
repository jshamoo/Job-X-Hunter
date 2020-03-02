/* eslint-disable no-console */
const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const { Leads, Users } = require('./model');

const url = process.env.MONGODB_URL || 'mongodb://localhost:27017/jobs';
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('mongodb connected'))
  .catch((err) => console.error('mongodb connection fail', err.stack));

const create = (data) => (
  new Promise((resolve, reject) => {
    Leads.create(data)
      .then(() => resolve())
      .catch((err) => {
        console.log('CREATE fail', err.stack);
        reject(err);
      });
  })
);

const read = (identifier) => (
  new Promise((resolve, reject) => {
    Leads.find(identifier)
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        console.error('READ fail', err.stack);
        reject(err);
      });
  })
);

const update = (identifier, data) => (
  new Promise((resolve, reject) => {
    Leads.updateOne(identifier, data)
      .exec((err, result) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(result);
        }
      });
  })
);

const destroy = (identifier) => (
  new Promise((resolve, reject) => {
    Leads.remove(identifier)
      .exec((err, result) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(result);
        }
      });
  })
);

module.exports = {
  create,
  read,
  update,
  destroy,
};
