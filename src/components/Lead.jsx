import React from 'react';

const Lead = (props) => (
  <div
    className='item'
    id={props.lead._id}
    draggable={true}
    onDragStart={(ev) => props.dragStart(ev)}
  >
    <div data-target={props.lead._id} onClick={(ev) => props.showInfoForm(ev)}>
      {props.lead.company}  |  {props.lead.position}  |  {props.lead.location}
    </div>
    <a href={props.lead.jobPost} target='_blank' className="arrow">&#10138;</a>
  </div>
)

export default Lead;
