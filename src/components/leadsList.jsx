import React from 'react';
import CreateLeads from './createLeads.jsx';

const LeadsList = (props) => {
  const dragStartHandler = (ev) => {
    props.dragStart(ev);
  }

  const dropHandler = (ev) => {
    props.drop(ev);
  }

  const dragOverHandler = (ev) => {
    props.dragOver(ev);
  }

  return (
    <div className='leads'>
      <h2>Leads</h2>
      <ol onDragOver={ev => dragOverHandler(ev)} onDrop={ev => dropHandler(ev)}>
        {props.leads.map((lead) => {
          if (lead.applied === false && lead.rejected !== true) {
            return (
              <li key={lead._id} id={lead._id} draggable={true} onDragStart={ev => dragStartHandler(ev)}>
                <span>{lead.company}  |  {lead.position}  |  {lead.location}</span>
                <button id={lead._id} onClick={props.moveToApply}>Applied</button>
                <i id={lead._id} className="far fa-trash-alt" onClick={props.moveToReject}></i>
              </li>
            );
          }
        })}
      </ol>
      <CreateLeads addALead={props.addALead} />
    </div>
  )
};

export default LeadsList;
