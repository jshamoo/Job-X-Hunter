import React from 'react';

const RejectsList = (props) => (
  <div className='rejects'>
    <h3>Rejects</h3>
    <ol>
      {props.leads.map((lead) => {
        if (lead.rejected === true) {
          return (
            <li key={lead._id}>
              {lead.company}  |  {lead.position}  |  {lead.location}
              <a href={lead.jobPost} target='_blank'><button>Read More</button></a>
            </li>
          );
        }
      })}
    </ol>

  </div>
);

export default RejectsList;
