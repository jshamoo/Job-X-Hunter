import React from 'react';
import CreateALead from './createLeads.jsx';

const LeadsList = (props) => {
  return (
    <div className='board'>
      <h2>Leads</h2>
      <div
        className='leads droppable'
        data-status='leads'
        onDragOver={(ev) => props.dragOver(ev)}
        onDrop={(ev, el) => props.drop(ev, 'leads')}
      >
        {props.leads.map((lead) => {
            return (
              <div
                className='item'
                id={lead._id}
                key={lead._id}
                draggable={true}
                onDragStart={(ev, st) => props.dragStart(ev, 'leads')}
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
      <div className='newItem' onClick={(ev) => props.toggleLeadForm(ev)}><p>+ Add another lead</p></div>
      <CreateALead addALead={props.addALead} toggleLeadForm={props.toggleLeadForm}/>
    </div>
  )
};

export default LeadsList;
