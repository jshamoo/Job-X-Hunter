import React from 'react';

const AppliedList = (props) => {
  const dragStartHandler = (ev) => {
    props.dragStart(ev);
  }

  const dropHandler = (ev) => {
    props.drop(ev);
  }

  const dragOverHandler = (ev) => {
    props.dragOver(ev);
  }

  return (
    <div className='applied'>
      <h2>Applied</h2>
      <ol onDragOver={ev => dragOverHandler(ev)} onDrop={ev => dropHandler(ev)}>
        {props.leads.map((lead) => {
          if (lead.applied === true && lead.phoneInterview !== true && lead.rejected !== true) {
            return (
              <li key={lead._id} id={lead._id} draggable={true} onDragStart={ev => dragStartHandler(ev)} >
                <span>{lead.company}  |  {lead.position}  |  {lead.location}</span>
                <button id={lead._id} onClick={props.moveToPhone} >Yay, phone interview</button>
                <i id={lead._id} className="far fa-trash-alt" onClick={props.moveToReject}></i>
              </li>
            );
          }
        })}
      </ol>
    </div>
  )
}

export default AppliedList;
