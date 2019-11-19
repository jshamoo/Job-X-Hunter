import React from 'react';

const OffersList = (props) => (
  <div className='offers'>
    <h2>Offers</h2>
    <ol>
      {props.leads.map((lead) => {
        if (lead.offer === true && lead.rejected !== true) {
          return (
            <li key={lead._id}>
              <a href={lead.jobPost} target='_blank'>{lead.company}  |  {lead.position}  |  {lead.location}</a>
              <i id={lead._id} className="far fa-trash-alt" onClick={props.moveToReject}></i>
            </li>
          );
        }
      })}
    </ol>

  </div>
);

export default OffersList;
