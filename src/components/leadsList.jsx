import React from 'react';
import CreateALead from './createLeads.jsx';

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

  const clickHandler = () => {
    props.toggleLeadForm();
  }

  return (
    <div className='board'>
      <h2>Leads</h2>
      <div
        className='leads droppable'
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
                <div>{lead.company}  |  {lead.position}  |  {lead.location}</div>
                <a href={lead.jobPost} target='_blank'><i className="fas fa-link xs"></i></a>
              </div>
            );
          }
        )}
      </div>
      <div className='newItem' onClick={(ev) => clickHandler()}><p>+ Add another lead</p></div>
      <CreateALead addALead={props.addALead} toggleLeadForm={props.toggleLeadForm}/>
    </div>
  )
};

export default LeadsList;
