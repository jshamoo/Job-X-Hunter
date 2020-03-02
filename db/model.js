const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const connection = mongoose.createConnection('mongodb://localhost:27017/jobs');

autoIncrement.initialize(connection);

const { Schema } = mongoose;
const leadsSchema = new Schema({
  jobPost: String,
  company: String,
  position: String,
  location: String,
  leads: Boolean,
  applied: Boolean,
  phoneInterview: Boolean,
  onsiteInterview: Boolean,
  rejected: Boolean,
  offer: Boolean,
  notes: String,
  _updateAt: { type: Date, default: Date.now },
});

leadsSchema.plugin(autoIncrement.plugin, 'Leads');
const Leads = mongoose.model('Leads', leadsSchema);

const userSchema = new Schema({
  username: String,
  password: String,
});

userSchema.methods.validPassword = function(pwd) {
  return (this.password === pwd);
}

userSchema.plugin(autoIncrement.plugin, 'Users');
userSchema.plugin(autoIncrement.plugin, { model: 'Users', field: 'id' });
const Users = mongoose.model('Users', userSchema);

module.exports = { Leads, Users };
