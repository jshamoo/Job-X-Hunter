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

  dropHandler(ev, el) {
    console.log(el)
    this.props.drop(ev, el);
  }

  dragOverHandler(ev) {
    this.props.dragOver(ev);
  }
  render() {
    return (
      <div className='board'>
        <h2>Onsite Interviews</h2>
        <div
          className='onsiteInterview droppable'
          data-status='onsiteInterview'
          onDragOver={ev => this.dragOverHandler(ev)}
          onDrop={ev => this.dropHandler(ev, 'onsiteInterview')}
        >
          {this.props.leads.map((lead) => {
            let gLink;
            if (lead.onsiteInterviewDate) {
              gLink = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${lead.company}+onsite+interview&dates=${lead.onsiteInterviewDate.slice(0, 10).replace(/\-/gi, '')}/${lead.onsiteInterviewDate.slice(0, 10).replace(/\-/gi, '')}&details=''`;
            } else {
              gLink = '#'
            }
              return (
                <div className='item' key={lead._id} id={lead._id} draggable={true} onDragStart={ev => this.dragStartHandler(ev)}>
                  <div>{lead.company}  |  {lead.position}  |  {lead.location}</div>
                  <a href={lead.jobPost} target='_blank'><i className="fas fa-link xs"></i></a>
                  {/* {lead.onsiteInterviewDate &&
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
                  } */}
                </div>
              );
            }
          )}
        </div>
      </div>
    )
  }
};

export default OnsiteInterviewsList;
