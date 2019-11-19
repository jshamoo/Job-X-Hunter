import React from 'react';
import CreateLeads from './createLeads.jsx';

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
                <i id={lead._id} className="far fa-trash-alt" onClick={props.moveToReject}></i>
              </li>
            );
          }
        })}
      </ol>
      <CreateLeads addALead={props.addALead} />
    </div>
  )
};

export default LeadsList;
