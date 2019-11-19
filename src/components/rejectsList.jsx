import React from 'react';

const RejectsList = (props) => (
  <div className='rejects'>
    <h3>Rejects</h3>
    {props.leads.map((lead) => {
      if (lead.rejected === true) {
        return (
          <div key={lead._id}>
            <i className="far fa-square fa-xs" id={lead._id}></i>
            {lead.company}  |  {lead.position}  |  {lead.location}
            <a href={lead.jobPost} target='_blank'><button>Read More</button></a>
          </div>
        );
      }
    })}
  </div>
);

export default RejectsList;
