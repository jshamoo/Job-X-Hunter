import React from 'react';


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
    <div className='board'>
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
                <span>{lead.company}  |  {lead.position}  |  {lead.location}</span>
                <a href={lead.jobPost} target='_blank'><i class="fas fa-link xs"></i></a>
              </div>
            );
          }
        )}
        <div className='newItem' onClick={() => {}}>+ Add another lead</div>
      </div>
    </div>
  )
};

export default LeadsList;
