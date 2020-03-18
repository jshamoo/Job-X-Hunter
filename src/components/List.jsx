import React from 'react';
import CreateALead from './createLeads.jsx'

const List = (props) => {
  return (
    <div className='board'>
      <h2>{props.title}</h2>
      <div
        className='droppable'
        className={props.status}
        data-status={props.status}
        onDragOver={(ev) => props.dragOver(ev)}
        onDrop={(ev, el) => props.drop(ev, props.status)}
      >
        {props.leads.map((lead) => {
            return (
              <div
                className='item'
                data-status={lead._id}
                id={lead._id}
                key={lead._id}
                draggable={true}
                onDragStart={(ev) => props.dragStart(ev)}
              >
                <div data-target={lead._id} onClick={(ev) => props.showInfoForm(ev)}>
                  {lead.company}  |  {lead.position}  |  {lead.location}
                </div>
                <a href={lead.jobPost} target='_blank' className="arrow">&#10138;</a>
              </div>
            );
          }
        )}
      </div>
      { props.title === 'Leads' &&
        <div>
          <div className='newItem' onClick={(ev) => props.toggleLeadForm(ev)}><p>+ Add another lead</p></div>
          <CreateALead addALead={props.addALead} toggleLeadForm={props.toggleLeadForm} />
        </div>
      }
    </div>
  )
}

export default List;
