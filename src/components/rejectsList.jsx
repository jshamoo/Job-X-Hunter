import React from 'react';

const RejectsList = (props) => {
  const dragStartHandler = (ev) => {
    props.dragStart(ev);
  }

  const dropHandler = (ev, el) => {
    props.drop(ev, el);
  }

  const dragOverHandler = (ev) => {
    props.dragOver(ev);
  }

  return (
    <div className='board'>
      <h2>Their Loss</h2>
      <div
        className='rejected'
        data-status='rejected'
        onDragOver={ev => dragOverHandler(ev)}
        onDrop={ev => dropHandler(ev, 'rejected')}
      >
        {props.leads.map((lead) => {
            return (
              <div className='item' key={lead._id} id={lead._id} draggable={true} onDragStart={ev => dragStartHandler(ev)}>
                <span>{lead.company}  |  {lead.position}  |  {lead.location}</span>
                <a href={lead.jobPost} target='_blank'><i class="fas fa-link xs"></i></a>
              </div>
            );
          }
        )}
      </div>

    </div>
  )
};

export default RejectsList;
