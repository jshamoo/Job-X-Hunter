/* eslint-disable no-console */
// require('dotenv').config();
const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const Model = require('./model');

const url = process.env.MONGODB_URI;
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('mongodb connected'))
  .catch((err) => console.error('mongodb connection fail', err.stack));

module.exports = {
  Leads: {
    create: (data) => (
      new Promise((resolve, reject) => {
        Model.Leads.create(data)
          .then(() => resolve())
          .catch((err) => {
            console.log('CREATE fail', err.stack);
            reject(err);
          });
      })
    ),
    read: (identifier) => (
      new Promise((resolve, reject) => {
        Model.Leads.find(identifier)
          .then((result) => {
            resolve(result);
          })
          .catch((err) => {
            console.error('READ fail', err.stack);
            reject(err);
          });
      })
    ),
    update: (identifier, data) => (
      new Promise((resolve, reject) => {
        Model.Leads.updateOne(identifier, data)
          .exec((err, result) => {
            if (err) {
              console.log(err);
              reject(err);
            } else {
              resolve(result);
            }
          });
      })
    ),
    destroy: (identifier) => (
      new Promise((resolve, reject) => {
        Model.Leads.remove(identifier)
          .exec((err, result) => {
            if (err) {
              console.log(err);
              reject(err);
            } else {
              resolve(result);
            }
          });
      })
    )
  }
}
