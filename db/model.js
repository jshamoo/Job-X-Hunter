const mongoose = require('mongoose');

const { Schema } = mongoose;
const leadsSchema = new Schema({
  jobPost: String,
  company: String,
  position: String,
  location: String,
  applied: Boolean,
  phoneInterview: Boolean,
  phoneInterviewHR: String,
  phoneInterviewDate: Date,
  phoneInterviewTime: String,
  onsiteInterview: Boolean,
  onsiteInterviewHR: String,
  onsiteInterviewDate: Date,
  onsiteInterviewTime: String,
  rejected: Boolean,
  offer: Boolean,
  annualSalary: Number,
  offerExpiration: Date,
  _updateAt: { type: Date, default: Date.now },
});

const Leads = mongoose.model('Leads', leadsSchema);

module.exports = { Leads };
