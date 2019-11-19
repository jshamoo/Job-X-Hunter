import React from 'react';

const AppliedList = (props) => (
  <div className='applied'>
    <h3>Applied</h3>
    <ol>
      {props.leads.map((lead) => {
        if (lead.applied === true && lead.phoneInterview !== true) {
          return (
            <li key={lead._id}>
              {lead.company}  |  {lead.position}  |  {lead.location}
              <a href={lead.jobPost} target='_blank'><button>Read More</button></a>
              <button id={lead._id} onClick={props.moveToPhone}>Phone</button>
              <button id={lead._id} onClick={props.moveToReject}>Reject</button>
            </li>
          );
        }
      })}
    </ol>

  </div>
);

export default AppliedList;
