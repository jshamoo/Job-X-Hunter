/* eslint-disable class-methods-use-this */
import React from 'react';
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
  }

  render() {
    return (
      <div>
        <CreateLeads />
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
