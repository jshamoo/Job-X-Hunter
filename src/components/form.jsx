import React from 'react';

const InfoForm = (props) => {
  const lead = props.leads.filter(lead => lead._id == props.targetId)[0] || {};
  return (
    <div className='info-form-wrapper hidden'>
      <form className='info-form' onSubmit={(ev) => props.edit(ev, lead._id)}>
        <div>
          <label>Job Post&nbsp;&nbsp;</label>
          <input type='text' name='jobPost' placeholder={lead.jobPost}/>
        </div>
        <div>
          <label>Company&nbsp;</label>
          <input type='text' name='company' placeholder={lead.company}/>
        </div>
        <div>
          <label>Position&nbsp;&nbsp;&nbsp;</label>
          <input type='text' name='position' placeholder={lead.position}/>
        </div>
        <div>
          <label>Location&nbsp;</label>
          <input type='text' name='location' placeholder={lead.location}/>
        </div>
        <div>
          <label>Notes&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
          <textarea name='notes' placeholder={lead.notes || 'Add some notes'}></textarea>
        </div>
        <button type='submit' className='btn-submit'>Save Info</button>
        <button type='button' className='btn-submit' onClick={(ev) => props.moveToTrash(ev, lead._id)}>Delete Lead</button>
        <button className='btn-close' type='button' onClick={() => props.hideInfoForm()}>{'\u2715'}</button>
      </form>
    </div>
  )
}


export default InfoForm;
