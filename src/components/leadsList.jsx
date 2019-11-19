import React from 'react';

const LeadsList = (props) => {
  return (
    <div className='leads'>
      <h3>Leads</h3>
      <ol>
        {props.leads.map((lead) => {
          if (lead.applied === false) {
            return (
              <li key={lead._id}>
                {lead.company}  |  {lead.position}  |  {lead.location}
                <a href={lead.jobPost} target='_blank'><button>Read More</button></a><button id={lead._id} onClick={props.moveToApply}>Applied</button>
              </li>
            );
          }
        })}
      </ol>
    </div>
  )
};

export default LeadsList;
