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
    this.toggleLeadForm = this.toggleLeadForm.bind(this);
    this.getLeads = this.getLeads.bind(this);
    this.moveToTrash = this.moveToTrash.bind(this);
    this.updateOffer = this.updateOffer.bind(this);
    this.updateOnsiteInteview = this.updateOnsiteInteview.bind(this);
    this.updatePhoneIntervew = this.updatePhoneIntervew.bind(this);
    this.dragStart = this.dragStart.bind(this);
    this.dragOver = this.dragOver.bind(this);
    this.drop = this.drop.bind(this);
    this.updateStatus = this.updateStatus.bind(this);

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

  toggleLeadForm() {
    $('.newItem').toggle('hidden');
    $('.create-a-lead').toggle('hidden');
  }

  addALead(ev) {
    const formData = $('.create-a-lead').serializeArray().reduce((acc, cur) => {
      acc[cur.name] = cur.value;
      acc.leads = true;
      return acc;
    }, {});
    axios.post('/leads', formData)
      .then((_res) => this.getLeads())
      .catch((err) => console.error('Client POST fail', err));
  }

  moveToTrash(ev) {
    const { id } = ev.target;
    axios.delete(`/leads/${id}`, { rejected: true })
      .then((_res) => {
        this.getLeads()
      })
      .catch((err) => console.error('Client DELETE fail', err));
  }

  updateOffer(ev) {
    ev.preventDefault();
    const { id } = ev.target;
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

  updateOnsiteInteview(ev) {
    ev.preventDefault();
    const { id } = ev.target;
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

  updatePhoneIntervew(ev) {
    ev.preventDefault();
    const { id } = ev.target;
    const formData = $('.create-a-lead').serializeArray().reduce((acc, cur) => {
      acc[cur.name] = cur.value;
      return acc;
    }, {});
    axios.patch(`/leads/${id}`, formData)
      .then((_res) => {
        this.getLeads();
      })
      .catch((err) => console.error('Client PATCH fail', err));
  }

  dragStart(ev, st) {
    ev.dataTransfer.setData("id", ev.target.id);
    ev.dataTransfer.setData("currentStatus", st);
    ev.dataTransfer.effectAllowed = 'move';
    ev.target.style.cursor = 'grab';
  }


  dragOver(ev, el) {
    ev.preventDefault();
    ev.target.style.cursor = 'grab';
  }

  drop(ev, el) {
    ev.preventDefault();
    console.log('en.target on drop', ev.target)
    ev.dataTransfer.dropEffect = "move";
    const id = ev.dataTransfer.getData('id');
    const parentEl = document.getElementsByClassName(el)[0];
    console.log('parent Element', parentEl)
    parentEl.appendChild(document.getElementById(id));
    let newStatus = parentEl.getAttribute('data-status')
    let currentStatus = ev.dataTransfer.getData('currentStatus');
    if (newStatus !== currentStatus) {
      this.updateStatus(id, newStatus, currentStatus);
    }
    ev.dataTransfer.clearData();
  }


  updateStatus(id, newStatus, currentStatus) {
    axios.patch(`/leads/${id}`, { [newStatus]: true, [currentStatus]: false })
      .then((_res) => {})
      .catch((err) => console.error('Client PATCH fail', err));
  }

  render() {
    return (
      <div id='main'>
        <LeadsList
          leads={this.state.leads.filter(lead => lead.leads === true)}
          toggleLeadForm={this.toggleLeadForm}
          addALead={this.addALead}
          dragStart={this.dragStart}
          dragOver={this.dragOver}
          drop={this.drop}
        />
        <AppliedList
          leads={this.state.leads.filter(lead => lead.applied === true )}
          dragStart={this.dragStart}
          dragOver={this.dragOver}
          drop={this.drop}
        />
        <PhoneInterviewsList
          leads={this.state.leads.filter(lead => lead.phoneInterview === true)}
          updatePhoneIntervew={this.updatePhoneIntervew}
          getLeads={this.getLeads}
          dragStart={this.dragStart}
          dragOver={this.dragOver}
          drop={this.drop}
        />
        <OnsiteInterviewsList
          leads={this.state.leads.filter(lead => lead.onsiteInterview === true)}
          updateOnsiteInteview={this.updateOnsiteInteview}
          getLeads={this.getLeads}
          dragStart={this.dragStart}
          dragOver={this.dragOver}
          drop={this.drop}
        />
        <OffersList
          leads={this.state.leads.filter(lead => lead.offer === true)}
          getLeads={this.getLeads}
          updateOffer={this.updateOffer}
          dragStart={this.dragStart}
          dragOver={this.dragOver}
          drop={this.drop}
        />
        <RejectsList
          leads={this.state.leads.filter(lead => lead.rejected === true)}
          dragStart={this.dragStart}
          dragOver={this.dragOver}
          drop={this.drop}
        />
      </div>
    );
  }
}

export default App;
