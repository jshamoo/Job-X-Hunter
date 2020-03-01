import React from 'react';

const AppliedList = (props) => {
  const dragStartHandler = (ev, st) => {
    props.dragStart(ev, st);
  }

  const dropHandler = (ev, el) => {
    props.drop(ev, el);
  }

  const dragOverHandler = (ev, el) => {
    props.dragOver(ev, el);
  }

  return (
    <div className='board'>
      <h2>Applied</h2>
      <div
        className='applied droppable'
        data-status='applied'
        onDragOver={ev => dragOverHandler(ev, 'leads')}
        onDrop={ev => dropHandler(ev, 'applied')}
      >
        {props.leads.map((lead) => {
            return (
              <div
                className='item'
                data-status={lead._id}
                key={lead._id} id={lead._id}
                draggable={true}
                onDragStart={ev => dragStartHandler(ev, 'applied')}
              >
                <div>{lead.company}  |  {lead.position}  |  {lead.location}</div>
                <a href={lead.jobPost} target='_blank'><i className="fas fa-link xs"></i></a>
              </div>
            );
          }
        )}
      </div>
    </div>
  )
}

export default AppliedList;
