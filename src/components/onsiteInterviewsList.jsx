import React from 'react';
import $ from 'jquery';
import axios from 'axios';

const OnsiteInterviewsList = (props) => {
  return (
    <div className='board'>
      <h2>Onsite Interviews</h2>
      <div
        className='onsiteInterview droppable'
        data-status='onsiteInterview'
        onDragOver={ev => props.dragOver(ev)}
        onDrop={ev => props.drop(ev, 'onsiteInterview')}
        onClick={(ev) => props.showInfoForm(ev)}
      >
        {props.leads.map((lead) => {
            return (
              <div className='item' key={lead._id} id={lead._id} draggable={true} onDragStart={ev => props.dragStart(ev)}>
                <div>{lead.company}  |  {lead.position}  |  {lead.location}</div>
                <a href={lead.jobPost} target='_blank'><i className="fas fa-link xs"></i></a>
              </div>
            );
          }
        )}
      </div>
    </div>
  )
}


export default OnsiteInterviewsList;
