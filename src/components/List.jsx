import React from 'react';
import CreateLead from './CreateLead.jsx';
import Lead from './Lead.jsx';

const List = (props) => {
  const classes = `${props.status} droppable`;
  return (
    <div className='board'>
      <h2>{props.title}</h2>
      <div
        className={classes}
        data-status={props.status}
        onDragOver={(ev) => props.dragOver(ev)}
        onDrop={(ev, el) => props.drop(ev, props.status)}
      >
        { props.leads.map(lead => (
            <Lead
              key={lead._id}
              lead={lead}
              showInfoForm={props.showInfoForm}
              dragStart={props.dragStart}
            />
          )
        )}
      </div>
      { props.title === 'Leads' &&
        <div>
          <div className='newItem' onClick={(ev) => props.toggleLeadForm(ev)}>
            <p>+ Add another lead</p>
          </div>
          <CreateLead addALead={props.addALead} toggleLeadForm={props.toggleLeadForm} />
        </div>
      }
    </div>
  )
}

export default List;
