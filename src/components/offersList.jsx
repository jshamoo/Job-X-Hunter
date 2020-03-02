import React from 'react';

const OffersList = (props) => {
  return(
    <div className='board'>
      <h2>Offers</h2>
      <div
        className='offer droppable'
        data-status='offer'
        onDragOver={(ev) => props.dragOver(ev)}
        onDrop={(ev, el) => props.drop(ev, 'offer')}
      >
        {props.leads.map((lead) => {
            return (
              <div
                className='item'
                key={lead._id}
                id={lead._id}
                draggable={true}
                onDragStart={(ev, st) => props.dragStart(ev, 'offer')}
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

export default OffersList;
