import React from 'react';

const CreateALead = (props) => {
  const handleSubmit = (ev) => {
    props.addALead(ev);
  }

  const handleClick = () => {
    props.toggleLeadForm()
  }

  return (
    <form className='create-a-lead hidden' onSubmit={(ev) => handleSubmit(ev)}>
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
        <button type='submit'>Add Lead</button>
        <button type='button' onClick={() => handleClick()}>X</button>
      </form>
  )
};

export default CreateALead;
