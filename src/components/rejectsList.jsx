import React from 'react';

const RejectsList = (props) => {
  return (
    <div className='board'>
      <h2>Their Loss</h2>
      <div
        className='rejected droppable'
        data-status='rejected'
        onDragOver={(ev) => props.dragOver(ev)}
        onDrop={(ev, el) => props.drop(ev, 'rejected')}
      >
        {props.leads.map((lead) => {
            return (
              <div
                className='item'
                key={lead._id}
                id={lead._id}
                draggable={true}
                onDragStart={(ev, st) => props.dragStart(ev, 'rejected')}
              >
                <div data-target={lead._id} onClick={(ev) => props.showInfoForm(ev)}>
                  {lead.company}  |  {lead.position}  |  {lead.location}
                </div>
                <a href={lead.jobPost} target='_blank'><i className="fas fa-link xs"></i></a>
              </div>
            );
          }
        )}
      </div>

    </div>
  )
};

export default RejectsList;
