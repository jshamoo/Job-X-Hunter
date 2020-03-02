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
import InfoForm from './components/form.jsx';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      leads: [],
      targetLeadId: null,
    };
    this.addALead = this.addALead.bind(this);
    this.toggleLeadForm = this.toggleLeadForm.bind(this);
    this.getLeads = this.getLeads.bind(this);
    this.moveToTrash = this.moveToTrash.bind(this);
    this.dragStart = this.dragStart.bind(this);
    this.dragOver = this.dragOver.bind(this);
    this.drop = this.drop.bind(this);
    this.updateStatus = this.updateStatus.bind(this);
    this.showInfoForm = this.showInfoForm.bind(this);
    this.hideInfoForm = this.hideInfoForm.bind(this);
    this.edit = this.edit.bind(this);
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

  dragStart(ev, st) {
    ev.dataTransfer.setData("id", ev.target.id);
    ev.dataTransfer.setData("currentStatus", st);
    ev.dataTransfer.effectAllowed = 'move';
    ev.target.style.cursor = 'grab';
  }


  dragOver(ev, el) {
    ev.preventDefault();
  }

  drop(ev, el) {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = "move";
    const id = ev.dataTransfer.getData('id');
    const parentEl = document.getElementsByClassName(el)[0];
    console.log(parentEl)
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
      .then((_res) => { this.getLeads() })
      .catch((err) => console.error('Client PATCH fail', err));
  }

  showInfoForm(ev) {
    this.setState({ targetLeadId: ev.target.id }, () => {
      console.log('clicked id', this.state.targetLeadId)
      $('.info-form-wrapper').removeClass('hidden');
      $('.info-form-wrapper').css('display', 'flex');
    });
  }

  hideInfoForm() {
    $('.info-form-wrapper').removeAttr('style');
    $('.info-form-wrapper').addClass('hidden');
  }

  edit(ev) {
    ev.preventDefault();
    const formData = $('.info-form').serializeArray().reduce((acc, cur) => {
      if(cur.value) {
        acc[cur.name] = cur.value;
      }
      return acc;
    }, {});
    console.log(formData);
    const id = this.state.targetId || Array.prototype.slice.call(arguments, 1)[0];
    axios.patch(`/leads/${id}`, formData)
      .then((_res) => this.getLeads())
      .catch((err) => console.error('Client POST fail', err));
  }

  moveToTrash(id) {
    axios.delete(`/leads/${id}`, { rejected: true })
      .then((_res) => {
        this.getLeads();
        this.hideInfoForm();
      })
      .catch((err) => console.error('Client DELETE fail', err));
  }

  render() {
    return (
      <div>
        <div id='main'>
          <LeadsList
            leads={this.state.leads.filter(lead => lead.leads === true)}
            toggleLeadForm={this.toggleLeadForm}
            addALead={this.addALead}
            dragStart={this.dragStart}
            dragOver={this.dragOver}
            drop={this.drop}
            showInfoForm={this.showInfoForm}
            edit={this.edit}
          />
          <AppliedList
            leads={this.state.leads.filter(lead => lead.applied === true )}
            dragStart={this.dragStart}
            dragOver={this.dragOver}
            drop={this.drop}
            showInfoForm={this.showInfoForm}
            edit={this.edit}
          />
          <PhoneInterviewsList
            leads={this.state.leads.filter(lead => lead.phoneInterview === true)}
            updatePhoneIntervew={this.updatePhoneIntervew}
            getLeads={this.getLeads}
            dragStart={this.dragStart}
            dragOver={this.dragOver}
            drop={this.drop}
            showInfoForm={this.showInfoForm}
            edit={this.edit}
          />
          <OnsiteInterviewsList
            leads={this.state.leads.filter(lead => lead.onsiteInterview === true)}
            updateOnsiteInteview={this.updateOnsiteInteview}
            getLeads={this.getLeads}
            dragStart={this.dragStart}
            dragOver={this.dragOver}
            drop={this.drop}
            showInfoForm={this.showInfoForm}
            edit={this.edit}
          />
          <OffersList
            leads={this.state.leads.filter(lead => lead.offer === true)}
            getLeads={this.getLeads}
            updateOffer={this.updateOffer}
            dragStart={this.dragStart}
            dragOver={this.dragOver}
            drop={this.drop}
            showInfoForm={this.showInfoForm}
            edit={this.edit}
          />
          <RejectsList
            leads={this.state.leads.filter(lead => lead.rejected === true)}
            dragStart={this.dragStart}
            dragOver={this.dragOver}
            drop={this.drop}
            showInfoForm={this.showInfoForm}
            edit={this.edit}
          />
        </div>
        <InfoForm
          leads={this.state.leads}
          targetId={this.state.targetLeadId}
          hideInfoForm={this.hideInfoForm}
          edit={this.edit}
          moveToTrash={this.moveToTrash}
        />
      </div>
    );
  }
}

export default App;
