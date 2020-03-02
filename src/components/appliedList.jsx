import React from 'react';

const AppliedList = (props) => {
  return (
    <div className='board'>
      <h2>Applied</h2>
      <div
        className='applied droppable'
        data-status='applied'
        onDragOver={ev => props.dragOver(ev, 'leads')}
        onDrop={ev => props.drop(ev, 'applied')}
      >
        {props.leads.map((lead) => {
            return (
              <div
                className='item'
                data-status={lead._id}
                key={lead._id} id={lead._id}
                draggable={true}
                onDragStart={ev => props.dragStart(ev, 'applied')}
                onClick={(ev) => {
                  console.log('applied item clicked')
                  props.showInfoForm(ev);}}
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
