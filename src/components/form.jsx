import React from 'react';

const InfoForm = (props) => {
  return (
    <div className='info-form-wrapper hidden'>
      <form className='info-form' onSubmit={() => props.handleSubmit()}>
        <div>
          <label forid='phoneInterviewDate'>Interview Date</label>
          <input type='date' name='phoneInterviewDate' id='phoneInterviewDate' required />
        </div>
        <div>
          <label forid='phoneInterviewTime'>Interview Time</label>
          <input type='text' name='phoneInterviewTime' id='phoneInterviewTime' required />
        </div>
        <div>
          <label forid='phoneInterviewHR'>Interview With</label>
          <input type='text' name='phoneInterviewHR' id='phoneInterviewHR' />
        </div>
        <button type='submit'>save</button>
        <button className='btn-close' type='button' onClick={() => props.hideInfoForm()}>{'\u2715'}</button>
      </form>
    </div>
  )
}

export default InfoForm;
