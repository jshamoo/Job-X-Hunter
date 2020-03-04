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
        onDragOver={(ev) => props.dragOver(ev)}
        onDrop={(ev, el) => props.drop(ev, 'onsiteInterview')}
      >
        {props.leads.map((lead) => {
            return (
              <div
                className='item'
                key={lead._id}
                id={lead._id}
                draggable={true}
                onDragStart={(ev, st) => props.dragStart(ev, 'onsiteInterview')}
              >
                <div data-target={lead._id} onClick={(ev) => props.showInfoForm(ev)}>
                  {lead.company}  |  {lead.position}  |  {lead.location}
                </div>
                <a href={lead.jobPost} target='_blank' className="arrow">&#10138;</a>
              </div>
            );
          }
        )}
      </div>
    </div>
  )
}


export default OnsiteInterviewsList;
