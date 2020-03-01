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
    this.handleSubmit = this.handleSubmit.bind(this);
    this.dragStartHandler = this.dragStartHandler.bind(this);
    this.dropHandler = this.dropHandler.bind(this);
    this.dragOverHandler = this.dragOverHandler.bind(this);
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

  handleSubmit(e) {
    this.props.updateOnsiteInteview(e);
    this.expand(e);
  }

  dragStartHandler(ev) {
    this.props.dragStart(ev);
  }

  dropHandler(ev) {
    this.props.drop(ev);
  }

  dragOverHandler(ev) {
    this.props.dragOver(ev);
  }

  render() {
    return (
      <div className='onsite-interviews'>
        <h2>Onsite Interviews</h2>
        <ol onDragOver={ev => this.dragOverHandler(ev)} onDrop={ev => this.dropHandler(ev)}>
          {this.props.leads.map((lead) => {
            let gLink;
            if (lead.onsiteInterviewDate) {
              gLink = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${lead.company}+onsite+interview&dates=${lead.onsiteInterviewDate.slice(0, 10).replace(/\-/gi, '')}/${lead.onsiteInterviewDate.slice(0, 10).replace(/\-/gi, '')}&details=''`;
            } else {
              gLink = '#'
            }

            if (lead.onsiteInterview === true && lead.rejectedAtOnsite !== true && lead.offer !== true && lead.rejected !== true) {
              return (
                <li key={lead._id} id={lead._id} draggable={true} onDragStart={ev => this.dragStartHandler(ev)}>
                  <span>{lead.company} | {lead.position} | {lead.location}</span>
                  <button id={lead._id} onClick={this.expand}>Edit</button>
                  <button id={lead._id} onClick={this.props.moveToOffer}>I got an offer!</button>
                  <i id={lead._id} className="far fa-trash-alt" onClick={this.props.moveToReject}></i><br />
                  {lead.onsiteInterviewDate &&
                    <div>
                      <a href={gLink} target='_blank'><i id={lead._id} className="far fa-calendar-alt"></i></a>
                      <span className='interviewInfo'>{lead.onsiteInterviewDate.slice(0, 10)} at {lead.onsiteInterviewTime} with {lead.onsiteInterviewHR}</span>
                    </div>
                  }
                  {this.state.isExpanded[lead._id] &&
                    <form className='onsite-interview-info-form' id={lead._id} onSubmit={this.handleSubmit}>
                      <div>
                        <label forid='onsiteInterviewDate'>Onsite Date</label>
                      <input type='date' name='onsiteInterviewDate' id='onsiteInterviewDate' required/>
                      </div>
                      <div>
                        <label forid='onsiteInterviewTime'>Onsite Time</label>
                      <input type='text' name='onsiteInterviewTime' id='onsiteInterviewTime' required/>
                      </div>
                      <div>
                        <label forid='onsiteInterviewHR'>Onsite With</label>
                        <input type='text' name='onsiteInterviewHR' id='onsiteInterviewHR' />
                      </div>
                      <button type='submit'>save</button>
                    </form>
                  }
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
