/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
import React from 'react';
import $ from 'jquery';
import axios from 'axios';
import InfoForm from './components/InfoForm.jsx';
import List from './components/List.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      leads: [],
      targetLeadId: null,
      dragElementId: null,
      user: '',
      newStatus: '',
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
    axios.get('/')
      .then(res => this.setState({ user: res.headers.user}))
      .catch(err => console.log(err));
    this.getLeads();
  }

  getLeads() {
    axios.get('/leads',)
      .then((res) => {
        this.setState({
          leads: res.data
        });
      })
      .catch((err) => console.error('Client GET fail', err));
  }

  toggleLeadForm() {
    $('.newItem').toggle('hidden');
    $('.create-a-lead').toggle('hidden');
  }

  addALead(ev) {
    ev.preventDefault();
    const formData = $('.create-a-lead').serializeArray().reduce((acc, cur) => {
      acc[cur.name] = cur.value;
      acc.status = 'leads';
      return acc;
    }, {});
    axios.post('/leads', formData)
      .then((_res) => {
        this.getLeads();
        $('.create-a-lead input[type="text"]').val('');
        this.toggleLeadForm();
      })
      .catch((err) => console.error('Client POST fail', err));
  }

  dragStart(ev, st) {
    this.setState({
      dragElementId: ev.target.id,
    });
  }

  dragOver(ev) {
    ev.preventDefault();
  }

  drop(ev, el) {
    const id = this.state.dragElementId;
    const targetElement = document.getElementsByClassName(el)[0];

    let newStatus = targetElement.getAttribute('data-status')
    this.updateStatus(id, newStatus);

  }

  updateStatus(id, newStatus) {
    axios.patch(`/leads/${id}`, { status: newStatus })
      .then((_res) => this.getLeads())
      .catch((err) => console.error('Client PATCH fail', err));
  }

  showInfoForm(ev) {
    this.setState({ targetLeadId: ev.target.getAttribute('data-target') }, () => {
      $('.info-form-wrapper').removeClass('hidden');
      $('.info-form-wrapper').css('display', 'flex');
      $('.info-form-wrapper').css('z-index', '3');
    });
  }

  hideInfoForm() {
    $('.info-form-wrapper').removeAttr('style');
    $('.info-form-wrapper').addClass('hidden');
  }

  edit(ev) {
    // ev.preventDefault();
    const formData = $('.info-form').serializeArray().reduce((acc, cur) => {
      if(cur.value) {
        acc[cur.name] = cur.value;
      }
      return acc;
    }, {});

    const id = this.state.targetLeadId || Array.prototype.slice.call(arguments, 1)[0];
    axios.patch(`/leads/${id}`, formData)
      .then((_res) => this.hideInfoForm())
      .then(() => this.getLeads())
      .catch((err) => console.error('Client POST fail', err));
  }

  moveToTrash(ev, id) {
    ev.preventDefault();
    axios.delete(`/leads/${id}`, { rejected: true })
      .then((_res) => this.hideInfoForm())
      .then(() => this.getLeads())
      .catch((err) => console.error('Client DELETE fail', err));
  }

  render() {
    return (
      <div id="app">
        <header>
          <h1>Job X Hunter</h1>
          <div className="user">Hello, {this.state.user}<a href="/logout" className="logout">Logout</a></div>
        </header>
        <div id='main'>
          {this.props.board.map(list => (
            <List
              key={list.id}
              title={list.title}
              status={list.status}
              leads={this.state.leads.filter(lead => lead.status === list.status)}
              toggleLeadForm={this.toggleLeadForm}
              addALead={this.addALead}
              dragStart={this.dragStart}
              dragOver={this.dragOver}
              drop={this.drop}
              showInfoForm={this.showInfoForm}
              edit={this.edit}
            />
          ))}
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
