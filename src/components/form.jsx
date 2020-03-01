import React from 'react';

const InfoForm = (props) => {
  const lead = props.leads.filter(lead => lead._id == props.targetId)[0] || {};
  return (
    <div className='info-form-wrapper hidden'>
      <form className='info-form' onSubmit={() => props.edit()}>
        <div>
          <label>Job Post</label>
          <input type='text' name='jobPost' placeholder={lead.jobPost}/>
        </div>
        <div>
          <label>Company</label>
          <input type='text' name='company' placeholder={lead.company}/>
        </div>
        <div>
          <label>Position</label>
          <input type='text' name='position' placeholder={lead.position}/>
        </div>
        <div>
          <label>Location</label>
          <input type='text' name='location' placeholder={lead.location}/>
        </div>
        <div>
          <label>Notes</label>
          <textarea name='notes' placeholder={lead.notes || 'Add some notes'}></textarea>
        </div>
        <button type='submit'>save</button>
        <button className='btn-close' type='button' onClick={() => props.hideInfoForm()}>{'\u2715'}</button>
      </form>
    </div>
  )
}


export default InfoForm;
