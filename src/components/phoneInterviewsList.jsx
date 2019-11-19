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
    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleSubmit(e) {
    this.props.updatePhoneIntervew(e);
    this.expand(e);
  }

  render() {
    return (
      <div className='phone-interviews'>
        <h2>Phone Interviews</h2>
        <ol>
          {this.props.leads.map((lead) => {
            let gLink;
            if (lead.phoneInterviewDate) {
              gLink = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${lead.company}+phone+interview&dates=${lead.phoneInterviewDate.slice(0, 10).replace(/\-/gi, '')}/${lead.phoneInterviewDate.slice(0, 10).replace(/\-/gi, '')}&details=''`;
            } else {
              gLink = '#'
            }
            if (lead.phoneInterview === true && lead.onsiteInterview !== true && lead.rejected !== true) {
              return (
                <li key={lead._id}>
                  <a href={lead.jobPost} target='_blank'>{lead.company} | {lead.position} | {lead.location}</a>
                  <button id={lead._id} onClick={this.expand}>Edit</button>
                  <button id={lead._id} onClick={this.props.moveToOnsite}>Woohoo, onsite </button>
                  <i id={lead._id} className="far fa-trash-alt" onClick={this.props.moveToReject}></i><br />
                  {lead.phoneInterviewDate &&
                    <div>
                      <a href={gLink} target='_blank'><i id={lead._id} className="far fa-calendar-alt"></i></a>
                      <span className='interviewInfo'> {lead.phoneInterviewDate.slice(0, 10)} at {lead.phoneInterviewTime} with {lead.phoneInterviewHR}</span>
                    </div>
                  }
                  {this.state.isExpanded[lead._id] &&
                    <form id={this.state.currentId} className='phone-interview-info-form' id={lead._id} onSubmit={this.handleSubmit}>
                      <div>
                        <label forid='phoneInterviewDate'>Interview Date</label>
                        <input type='date' name='phoneInterviewDate' id='phoneInterviewDate' required/>
                      </div>
                      <div>
                        <label forid='phoneInterviewTime'>Interview Time</label>
                      <input type='text' name='phoneInterviewTime' id='phoneInterviewTime' required/>
                      </div>
                      <div>
                        <label forid='phoneInterviewHR'>Interview With</label>
                        <input type='text' name='phoneInterviewHR' id='phoneInterviewHR' />
                      </div>
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
