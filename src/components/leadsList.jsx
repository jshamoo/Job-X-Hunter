import React from 'react';

const LeadsList = (props) => {
  return (
    <div className='leads'>
      <h2>Leads</h2>
      <ol>
        {props.leads.map((lead) => {
          if (lead.applied === false && lead.rejected !== true) {
            return (
              <li key={lead._id}>
                <a href={lead.jobPost} target='_blank'>{lead.company}  |  {lead.position}  |  {lead.location}</a>
                <button id={lead._id} onClick={props.moveToApply}>Applied</button>
                <button id={lead._id} onClick={props.moveToReject}>Nah</button>
              </li>
            );
          }
        })}
      </ol>
    </div>
  )
};

export default LeadsList;
