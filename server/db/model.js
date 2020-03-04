const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const { compareHash } = require('../hashHelper');

const url = process.env.MONGODB_URL || 'mongodb://localhost:27017/jobs';
const connection = mongoose.createConnection(url);

autoIncrement.initialize(connection);

const { Schema } = mongoose;
const leadsSchema = new Schema({
  user: String,
  jobPost: String,
  company: String,
  position: String,
  location: String,
  status: { type: String, required: true },
  notes: String,
  _updateAt: { type: Date, default: Date.now },
});

leadsSchema.plugin(autoIncrement.plugin, 'Leads');
const Leads = mongoose.model('Leads', leadsSchema);

const userSchema = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  salt: { type: String, required: true },
});

userSchema.methods.validPassword = function(pwd) {
  return compareHash(pwd, this.password, this.salt);
}

userSchema.plugin(autoIncrement.plugin, 'Users');
const Users = mongoose.model('Users', userSchema);

module.exports = { Leads, Users };
