/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
import React from 'react';
import $ from 'jquery';
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
    this.addALead = this.addALead.bind(this);
  }

  addALead(e) {
    e.preventDefault();
    const formData = $('.create-leads').serializeArray().reduce((acc, cur) => {
      acc[cur.name] = cur.value;
      return acc;
    }, {});
  }

  render() {
    return (
      <div>
        <CreateLeads addALead={this.addALead}/>
        <LeadsList />
        <AppliedList />
        <PhoneInterviewsList />
        <OnsiteInterviewsList />
        <RejectsList />
        <OffersList />
      </div>
    );
  }
}

export default App;
