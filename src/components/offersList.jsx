import React from 'react';

const OffersList = (props) => (
  <div className='offers'>
    <h3>Offers</h3>
    <ol>
      {props.leads.map((lead) => {
        if (lead.offer === true && lead.rejected !== true) {
          return (
            <li key={lead._id}>
              {lead.company}  |  {lead.position}  |  {lead.location}
              <a href={lead.jobPost} target='_blank'><button>Read More</button></a>
              <button id={lead._id} onClick={props.moveToReject}>Reject</button>
            </li>
          );
        }
      })}
    </ol>

  </div>
);

export default OffersList;
