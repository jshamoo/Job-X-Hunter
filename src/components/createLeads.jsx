import React from 'react';

const CreateLeads = (props) => (
  <form className='create-leads' onSubmit={props.addALead}>
    <div>
      <label forid='jobPost'>Job Post</label>
      <input type='text' id='jobPost' name='jobPost' required/>
    </div>
    <div>
      <label forid='company'>Company</label>
      <input type='text' id='company' name='company' required/>
    </div>
    <div>
      <label forid='position'>Position</label>
      <input type='text' id='position' name='position' required/>
    </div>
    <div>
      <label forid='location'>Location</label>
      <input type='text' id='location' name='location' />
    </div>
    <input type='submit' value='Add A Lead' />
  </form>
);

export default CreateLeads;
