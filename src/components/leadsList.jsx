import React from 'react';
import CreateALead from './createLeads.jsx';

const LeadsList = (props) => {
  return (
    <div className='board'>
      <h2>Leads</h2>
      <div
        className='leads droppable'
        data-status='leads'
        onDragOver={ev => props.dragOver(ev, 'leads')}
        onDrop={ev => props.drop(ev, 'leads')}
      >
        {props.leads.map((lead) => {
            return (
              <div
                className='item'
                key={lead._id}
                id={lead._id}
                draggable={true}
                onDragStart={ev => props.dragStart(ev, 'leads')}
                onClick={() => props.showInfoForm()}
              >
                <div>{lead.company}  |  {lead.position}  |  {lead.location}</div>
                <a href={lead.jobPost} target='_blank'><i className="fas fa-link xs"></i></a>
              </div>
            );
          }
        )}
      </div>
      <div className='newItem' onClick={(ev) => props.toggleLeadForm()}><p>+ Add another lead</p></div>
      <CreateALead addALead={props.addALead} toggleLeadForm={props.toggleLeadForm}/>
    </div>
  )
};

export default LeadsList;
