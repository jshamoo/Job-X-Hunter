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

module.exports = { Leads };
