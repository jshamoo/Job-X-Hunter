import React from 'react';

const AppliedList = (props) => (
  <div className='applied'>
    <h2>Applied</h2>
    <ol>
      {props.leads.map((lead) => {
        if (lead.applied === true && lead.phoneInterview !== true && lead.rejected !== true) {
          return (
            <li key={lead._id}>
              <a href={lead.jobPost} target='_blank'>{lead.company}  |  {lead.position}  |  {lead.location}</a>
              <button id={lead._id} onClick={props.moveToPhone}>Yay, phone interview</button>
              <i id={lead._id} className="far fa-trash-alt" onClick={props.moveToReject}></i>
            </li>
          );
        }
      })}
    </ol>

  </div>
);

export default AppliedList;
