import React from 'react';

class InfoForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      jobPost: '',
      company: '',
      position: '',
      location: '',
      notes: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(ev, id) {
    this.props.edit(ev, id)
    this.setState({
      jobPost: '',
      company: '',
      position: '',
      location: '',
      notes: ''
    })
  }

  handleChange(ev) {
    const value = ev.target.value;
    const name = ev.target.name;
    this.setState({
      [name]: value
    })
  }

  render() {
    if (!this.props.showInfoForm) {
      return null;
    }
    const lead = this.props.targetLead;
    return (
      <div className='info-form-wrapper'>
        <form className='info-form' onSubmit={(ev) => this.handleSubmit(ev, lead._id)}>
          <div>
            <label>Job Post&nbsp;&nbsp;</label>
            <input type='text' name='jobPost' value={this.state.jobPost} placeholder={lead.jobPost} onChange={this.handleChange}/>
          </div>
          <div>
            <label>Company&nbsp;</label>
            <input type='text' name='company' value={this.state.company} placeholder={lead.company} onChange={this.handleChange}/>
          </div>
          <div>
            <label>Position&nbsp;&nbsp;&nbsp;</label>
            <input type='text' name='position' value={this.state.position} placeholder={lead.position} onChange={this.handleChange}/>
          </div>
          <div>
            <label>Location&nbsp;</label>
            <input type='text' name='location' value={this.state.location} placeholder={lead.location} onChange={this.handleChange}/>
          </div>
          <div>
            <label>Notes&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
            <textarea name='notes' value={this.state.notes} placeholder={lead.notes || 'Add some notes'} onChange={this.handleChange}></textarea>
          </div>
          <button type='submit' className='btn-submit'>Save Info</button>
          <button type='button' className='btn-submit' onClick={(ev) => this.props.moveToTrash(ev, lead._id)}>Delete Lead</button>
          <button className='btn-close' type='button' onClick={() => this.props.hideInfoForm()}>{'\u2715'}</button>
        </form>
      </div>
    )
  }
}

export default InfoForm;
