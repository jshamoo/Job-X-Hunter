import React from 'react';
import $ from 'jquery';
import axios from 'axios';

class PhoneInterviewsList extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: {},
    };
    this.expand = this.expand.bind(this);
    this.updatePhoneIntervew = this.updatePhoneIntervew.bind(this);
  }

  expand(e) {
    const { id } = e.target;
    console.log('click', id)
    this.setState((state) => ({
      isExpanded: {
        ...state.isExpanded,
        [id]: !state.isExpanded[id],
      }
    })
    )
  }

  updatePhoneIntervew(e) {
    e.preventDefault();
    const { id } = e.target;
    const formData = $('.phone-interview-info-form').serializeArray().reduce((acc, cur) => {
      acc[cur.name] = cur.value;
      return acc;
    }, {});
    console.log(id, formData);
    axios.patch(`/leads/${id}`, formData)
      .then((_res) => {
        this.props.getLeads();
      })
      .catch((err) => console.error('Client PATCH fail', err));
    this.expand(e);
  }

  render() {
    return (
      <div className='phone-interviews'>
        <h3>Upcoming Phone Interviews</h3>
        <ol>
          {this.props.leads.map((lead) => {
            if (lead.phoneInterview === true && lead.onsiteInterview !== true) {
              return (
                <li key={lead._id}>
                  {lead.company} | {lead.position} | {lead.location}
                  {lead.phoneInterviewDate && <span>| on {lead.phoneInterviewDate.slice(0, 10)} at {lead.phoneInterviewTime} with {lead.phoneInterviewHR}</span>}
                  <button id={lead._id} onClick={this.expand}>Edit</button>
                  <a href={lead.jobPost} target='_blank'><button>Read More</button></a>
                  <button id={lead._id} onClick={this.props.moveToOnsite}>Onsite</button>
                  <button id={lead._id} onClick={this.props.moveToReject}>Reject</button>
                  {this.state.isExpanded[lead._id] &&
                    <form id={this.state.currentId} className='phone-interview-info-form' id={lead._id} onSubmit={this.updatePhoneIntervew}>
                      <label forid='phoneInterviewDate'>Interview Date</label>
                      <input type='date' name='phoneInterviewDate' id='phoneInterviewDate' />
                      <label forid='phoneInterviewTime'>Interview Time</label>
                      <input type='text' name='phoneInterviewTime' id='phoneInterviewTime' />
                      <label forid='phoneInterviewHR'>Interview With</label>
                      <input type='text' name='phoneInterviewHR' id='phoneInterviewHR' />
                      <button type='submit'>save</button>
                    </form>}
                </li>
              );
            }
          })}
        </ol>
      </div>
    )
  }
};

export default PhoneInterviewsList;
