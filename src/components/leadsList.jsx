import React from 'react';
import CreateLeads from './createLeads.jsx';

const LeadsList = (props) => {
  const dragStartHandler = (ev, st) => {
    props.dragStart(ev,st);
  }

  const dropHandler = (ev, el) => {
    props.drop(ev, el);
  }

  const dragOverHandler = (ev, el) => {
    props.dragOver(ev, el);
  }

  return (
    <div>
      <h2>Leads</h2>
      <div
        className='leads'
        data-status='leads'
        onDragOver={ev => dragOverHandler(ev, 'leads')}
        onDrop={ev => dropHandler(ev, 'leads')}
      >
        {props.leads.map((lead) => {
            return (
              <div
                className='item'
                key={lead._id}
                id={lead._id}
                draggable={true}
                onDragStart={ev => dragStartHandler(ev, 'leads')}
              >
              {lead.company}  |  {lead.position}  |  {lead.location}
              </div>
            );
          }
        )}
      </div>
      <CreateLeads addALead={props.addALead} />
    </div>
  )
};

export default LeadsList;
