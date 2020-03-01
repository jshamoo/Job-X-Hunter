import React from 'react';

const RejectsList = (props) => {
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
    <div className='rejects'>
      <h2>Their Loss</h2>
      <ol onDragOver={ev => dragOverHandler(ev)} onDrop={ev => dropHandler(ev)}>
        {props.leads.map((lead) => {
          if (lead.rejected === true) {
            return (
              <li key={lead._id} id={lead._id} draggable={true} onDragStart={ev => dragStartHandler(ev)}>
                <span>{lead.company}  |  {lead.position}  |  {lead.location}  </span><i id={lead._id} className="far fa-trash-alt" onClick={props.moveToTrash}></i>
              </li>
            );
          }
        })}
      </ol>

    </div>
  )
};

export default RejectsList;
