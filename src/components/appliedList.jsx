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
    <div>
      <h2>Applied</h2>
      <div
        className='applied'
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
                {lead.company}  |  {lead.position}  |  {lead.location}
              </div>
            );
          }
        )}
      </div>
    </div>
  )
}

export default AppliedList;
