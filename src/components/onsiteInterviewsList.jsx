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
        <h2>Onsite Interviews</h2>
        <ol>
          {this.props.leads.map((lead) => {
            if (lead.onsiteInterview === true && lead.rejectedAtOnsite !== true && lead.offer !== true && lead.rejected !== true) {
              return (
                <li key={lead._id}>
                  <a href={lead.jobPost} target='_blank'>{lead.company} | {lead.position} | {lead.location}</a>
                  <button id={lead._id} onClick={this.expand}>Edit</button>
                  <button id={lead._id} onClick={this.props.moveToOffer}>I got an offer!</button>
                  <i id={lead._id} className="far fa-trash-alt" onClick={this.props.moveToReject}></i><br />
                  {lead.onsiteInterviewDate && <span className='interviewInfo'>{lead.onsiteInterviewDate.slice(0, 10)} at {lead.onsiteInterviewTime} with {lead.onsiteInterviewHR}</span>}
                  {this.state.isExpanded[lead._id] &&
                    <form className='onsite-interview-info-form' id={lead._id} onSubmit={this.updateOnsiteInteview}>
                      <div>
                        <label forid='onsiteInterviewDate'>Onsite Date</label>
                        <input type='date' name='onsiteInterviewDate' id='onsiteInterviewDate' />
                      </div>
                      <div>
                        <label forid='onsiteInterviewTime'>Onsite Time</label>
                        <input type='text' name='onsiteInterviewTime' id='onsiteInterviewTime' />
                      </div>
                      <div>
                        <label forid='onsiteInterviewHR'>Onsite With</label>
                        <input type='text' name='onsiteInterviewHR' id='onsiteInterviewHR' />
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

export default OnsiteInterviewsList;
