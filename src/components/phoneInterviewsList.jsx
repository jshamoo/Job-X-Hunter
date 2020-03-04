import React from 'react';
import $ from 'jquery';
import axios from 'axios';

const PhoneInterviewsList = (props) =>{
  return (
    <div className='board'>
      <h2>Phone Interviews</h2>
      <div
        className='phoneInterview droppable'
        data-status='phoneInterview'
        onDragOver={(ev) => props.dragOver(ev)}
        onDrop={(ev, el) => props.drop(ev, 'phoneInterview')}
      >
        {props.leads.map((lead) => {
            return (
              <div
                className='item'
                id={lead._id}
                key={lead._id}
                draggable={true}
                onDragStart={(ev, st) => props.dragStart(ev, 'phoneInterview')}
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
};

export default PhoneInterviewsList;
