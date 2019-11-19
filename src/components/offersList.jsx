import React from 'react';

const OffersList = (props) => (
  <div className='offers'>
    <h3>Offers</h3>
    {props.leads.map((lead) => {
      if (lead.offer === true && lead.rejected !== true) {
        return (
          <div key={lead._id}>
            <i className="far fa-square fa-xs" id={lead._id}></i>
            {lead.company}  |  {lead.position}  |  {lead.location}
            <a href={lead.jobPost} target='_blank'><button>Read More</button></a>
            <button id={lead._id} onClick={props.moveToReject}>Reject</button>
          </div>
        );
      }
    })}
  </div>
);

export default OffersList;
