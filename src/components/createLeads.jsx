import React from 'react';

const CreateALead = (props) => {
  return (
    <form className='create-a-lead hidden' onSubmit={(ev) => props.addALead(ev)}>
      <div>
      <label forid='jobPost'>Job Post&nbsp;</label>
        <input type='text' id='jobPost' name='jobPost'required />
      </div>
      <div>
        <label forid='company'>Company</label>
        <input type='text' id='company' name='company' required />
      </div>
      <div>
      <label forid='position'>Position&nbsp;&nbsp;</label>
        <input type='text' id='position' name='position' required />
      </div>
      <div>
      <label forid='location'>Location&nbsp;</label>
        <input type='text' id='location' name='location' />
      </div>
      <button className='btn-add-lead' type='submit'>Add Lead</button>
      <button className='btn-close' type='button' onClick={() => props.toggleLeadForm()}>{'\u2715'}</button>
    </form>
  )
};

export default CreateALead;
