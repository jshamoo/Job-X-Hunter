import React from 'react';
import $ from 'jquery';
import axios from 'axios';

class OnsiteInterviewsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: {},
    };
    this.expand = this.expand.bind(this);
    this.updateOnsiteInteview = this.updateOnsiteInteview.bind(this);
  }

  expand(e) {
    const { id } = e.target;
    this.setState((state) => ({
        isExpanded: {
          ...state.isExpanded,
          [id]: !state.isExpanded[id],
        }
      })
    )
  }

  updateOnsiteInteview(e) {
    e.preventDefault();
    const { id } = e.target;
    const formData = $('.onsite-interview-info-form').serializeArray().reduce((acc, cur) => {
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
      <div className='onsite-interviews'>
        <h3>Upcoming onsite Interviews</h3>
        {this.props.leads.map((lead) => {
          if (lead.onsiteInterview === true && lead.rejectedAtOnsite !== true && lead.offer !== true) {
            return (
              <div key={lead._id}>
                <i className="far fa-square fa-xs" id={lead._id}></i>
                {lead.company} | {lead.position} | {lead.location}
                {lead.onsiteInterviewDate && <span> | on {lead.onsiteInterviewDate.slice(0, 10)} at {lead.onsiteInterviewTime} with {lead.onsiteInterviewHR}</span>}
                <button id={lead._id} onClick={this.expand}>Edit</button>
                <a href={lead.jobPost} target='_blank'><button>Read More</button></a>
                <button id={lead._id} onClick={this.props.moveToOffer}>Offer</button>
                <button id={lead._id} onClick={this.props.moveToReject}>Reject</button>
                {this.state.isExpanded[lead._id] &&
                <form className='onsite-interview-info-form' id={lead._id} onSubmit={this.updateOnsiteInteview}>
                  <label forid='onsiteInterviewDate'>Onsite Date</label>
                  <input type='date' name='onsiteInterviewDate' id='onsiteInterviewDate' />
                  <label forid='onsiteInterviewTime'>Onsite Time</label>
                  <input type='text' name='onsiteInterviewTime' id='onsiteInterviewTime' />
                  <label forid='onsiteInterviewHR'>Onsite With</label>
                  <input type='text' name='onsiteInterviewHR' id='onsiteInterviewHR' />
                  <button type='submit'>save</button>
                </form>}
              </div>
            );
          }
        })}
      </div>
    )
  }
};

export default OnsiteInterviewsList;
