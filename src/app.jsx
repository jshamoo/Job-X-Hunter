/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
import React from 'react';
import $ from 'jquery';
import axios from 'axios';
import CreateLeads from './components/createLeads.jsx';
import LeadsList from './components/leadsList.jsx';
import AppliedList from './components/appliedList.jsx';
import PhoneInterviewsList from './components/phoneInterviewsList.jsx';
import OnsiteInterviewsList from './components/onsiteInterviewsList.jsx';
import RejectsList from './components/rejectsList.jsx';
import OffersList from './components/offersList.jsx';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      leads: []
    };
    this.addALead = this.addALead.bind(this);
    this.getLeads = this.getLeads.bind(this);
    // this.updateALead = this.updateALead.bind(this);
    this.moveToApply = this.moveToApply.bind(this);
    this.moveToPhone = this.moveToPhone.bind(this);
    this.moveToOnsite = this.moveToOnsite.bind(this);
    this.moveToOffer = this.moveToOffer.bind(this);
    this.moveToReject = this.moveToReject.bind(this);
    this.moveToTrash = this.moveToTrash.bind(this);
    this.updateOffer = this.updateOffer.bind(this);
    this.updateOnsiteInteview = this.updateOnsiteInteview.bind(this);
    this.updatePhoneIntervew = this.updatePhoneIntervew.bind(this);
  }

  componentDidMount() {
    this.getLeads();
  }

  getLeads() {
    axios.get('/leads',)
      .then((res) => {
        this.setState({ leads: res.data });
      })
      .catch((err) => console.error('Client GET fail', err));
  }

  addALead(e) {
    e.preventDefault();
    const formData = $('.create-leads-form').serializeArray().reduce((acc, cur) => {
      acc[cur.name] = cur.value;
      acc.applied = false;
      return acc;
    }, {});
    axios.post('/leads', formData)
      .then((_res) => this.getLeads())
      .catch((err) => console.error('Client POST fail', err));
  }

  moveToApply(e) {
    const { id } = e.target;
    axios.patch(`/leads/${id}`, { applied: true })
      .then((_res) => this.getLeads())
      .catch((err) => console.error('Client PATCH fail', err));
  }

  moveToPhone(e) {
    const { id } = e.target;
    axios.patch(`/leads/${id}`, { phoneInterview: true })
      .then((_res) => this.getLeads())
      .catch((err) => console.error('Client PATCH fail', err));
  }

  moveToOnsite(e) {
    const { id } = e.target;
    axios.patch(`/leads/${id}`, { onsiteInterview: true })
      .then((_res) => this.getLeads())
      .catch((err) => console.error('Client PATCH fail', err));
  }

  moveToOffer(e) {
    const { id } = e.target;
    axios.patch(`/leads/${id}`, { offer: true })
      .then((_res) => this.getLeads())
      .catch((err) => console.error('Client PATCH fail', err));
  }

  moveToReject(e) {
    const { id } = e.target;
    axios.patch(`/leads/${id}`, { rejected: true })
      .then((_res) => {
        this.getLeads()
      })
      .catch((err) => console.error('Client PATCH fail', err));
  }

  moveToTrash(e) {
    const { id } = e.target;
    axios.delete(`/leads/${id}`, { rejected: true })
      .then((_res) => {
        this.getLeads()
      })
      .catch((err) => console.error('Client DELETE fail', err));
  }

  updateOffer(e) {
    e.preventDefault();
    const { id } = e.target;
    const formData = $('.offer-info-form').serializeArray().reduce((acc, cur) => {
      acc[cur.name] = cur.value;
      return acc;
    }, {});
    axios.patch(`/leads/${id}`, formData)
      .then((_res) => {
        this.getLeads();
      })
      .catch((err) => console.error('Client PATCH fail', err));
  }

  updateOnsiteInteview(e) {
    e.preventDefault();
    const { id } = e.target;
    const formData = $('.onsite-interview-info-form').serializeArray().reduce((acc, cur) => {
      acc[cur.name] = cur.value;
      return acc;
    }, {});
    axios.patch(`/leads/${id}`, formData)
      .then((_res) => {
        this.getLeads();
      })
      .catch((err) => console.error('Client PATCH fail', err));
  }

  updatePhoneIntervew(e) {
    e.preventDefault();
    const { id } = e.target;
    const formData = $('.phone-interview-info-form').serializeArray().reduce((acc, cur) => {
      acc[cur.name] = cur.value;
      return acc;
    }, {});
    axios.patch(`/leads/${id}`, formData)
      .then((_res) => {
        this.getLeads();
      })
      .catch((err) => console.error('Client PATCH fail', err));
  }

  render() {
    return (
      <div>
        <div className='header'><h1>Job Hunter</h1></div>
        <LeadsList leads={this.state.leads} addALead={this.addALead} moveToApply={this.moveToApply} moveToReject={this.moveToReject}/>
        <AppliedList leads={this.state.leads} moveToPhone={this.moveToPhone} moveToReject={this.moveToReject}/>
        <PhoneInterviewsList leads={this.state.leads} updatePhoneIntervew={this.updatePhoneIntervew} getLeads={this.getLeads} moveToOnsite={this.moveToOnsite} moveToReject={this.moveToReject}/>
        <OnsiteInterviewsList leads={this.state.leads} updateOnsiteInteview={this.updateOnsiteInteview} getLeads={this.getLeads} moveToOffer={this.moveToOffer} moveToReject={this.moveToReject}/>
        <OffersList leads={this.state.leads} getLeads={this.getLeads} updateOffer={this.updateOffer} moveToReject={this.moveToReject}/>
        <RejectsList leads={this.state.leads} moveToTrash={this.moveToTrash}/>
      </div>
    );
  }
}

export default App;
