import React from 'react';

class CreateLeads extends React.Component {
  constructor(props){
    super(props);
    this.state = { isShown: false };
    this.toggle = this.toggle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggle() {
    this.setState({
      isShown: !this.state.isShown
    })
  }

  handleSubmit(e) {
    this.props.addALead(e);
    this.toggle();
  }

  render() {
    return (
      <div className='create-leads'>
        {!this.state.isShown && <button className='btn-add-a-lead' onClick={this.toggle}>Add a Lead</button>}
        {this.state.isShown &&
          <form className='create-leads-form' onSubmit={this.handleSubmit}>
            <div>
              <label forid='jobPost'>Job Post</label>
              <input type='text' id='jobPost' name='jobPost' required />
            </div>
            <div>
              <label forid='company'>Company</label>
              <input type='text' id='company' name='company' required />
            </div>
            <div>
              <label forid='position'>Position</label>
              <input type='text' id='position' name='position' required />
            </div>
            <div>
              <label forid='location'>Location</label>
              <input type='text' id='location' name='location' />
            </div>
            <button type='submit'>save</button>
            <button onClick={this.toggle}>close</button>
          </form>
        }
      </div>
    )
  }
}

export default CreateLeads;
