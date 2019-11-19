import React from 'react';

const RejectsList = (props) => (
  <div className='rejects'>
    <h2>Their Loss</h2>
    <ol>
      {props.leads.map((lead) => {
        if (lead.rejected === true) {
          return (
            <li key={lead._id}>
              <a href={lead.jobPost} target='_blank'>{lead.company}  |  {lead.position}  |  {lead.location}  </a><i id={lead._id} className="far fa-trash-alt" onClick={props.moveToTrash}></i>
            </li>
          );
        }
      })}
    </ol>

  </div>
);

export default RejectsList;
