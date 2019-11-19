import React from 'react';

const LeadsList = (props) => {
  return (
    <div className='leads'>
      <h3>Leads</h3>
      {props.leads.map((lead) => {
        if (lead.applied === false) {
          return (
            <div key={lead._id}>
              <i className="far fa-square fa-xs"></i>  {lead.company}  |  {lead.position}  |  {lead.location}
              <a href={lead.jobPost} target='_blank'><button>Read More</button></a><button id={lead._id} onClick={props.moveToApply}>Applied</button>
            </div>
          );
        }
      })}
    </div>
  )
};

export default LeadsList;
