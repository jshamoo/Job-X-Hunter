import React from 'react';
import $ from 'jquery';
import axios from 'axios';

class OffersList extends React.Component{
  constructor(props){
    super(props);
    this.state = { isExpanded: {} };
    this.expand = this.expand.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  expand(e) {
    const { id } = e.target;
    this.setState((state) => ({
      isExpanded: {
        ...state.isExpanded,
        [id]: !state.isExpanded[id],
      }
    })
    )
  }

  handleSubmit(e) {
    this.props.updateOffer(e);
    this.expand(e);
  }

  render(){
    return(
      <div className='offers'>
        <h2>Offers</h2>
        <ol>
          {this.props.leads.map((lead) => {
            if (lead.offer === true && lead.rejected !== true) {
              let gLink;
              if(lead.offerDate) {
                gLink = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${lead.company}+offer+deadline&dates=${lead.offerDate.slice(0, 10).replace(/\-/gi, '')}/${lead.offerDate.slice(0, 10).replace(/\-/gi, '')}&details=${lead.offerSpecifics}`;
              } else {
                gLink ='#'
              }
              return (
                <li key={lead._id}>
                  <a href={lead.jobPost} target='_blank'>{lead.company}  |  {lead.position}  |  {lead.location}</a>
                  <button id={lead._id} onClick={this.expand}>Edit</button>
                  <i id={lead._id} className="far fa-trash-alt" onClick={this.props.moveToReject}></i><br />
                  {lead.offerDate &&
                  <div>
                    <a href={gLink} target='_blank'><i id={lead._id} className="far fa-calendar-alt"></i></a>
                    <span className='offerInfo'> Offer deadline is {lead.offerDate.slice(0, 10)}. Annual Salary is ${lead.offerSalary}. Notes: {lead.offerSpecifics}</span>
                  </div>}
                  {this.state.isExpanded[lead._id] &&
                  <form className='offer-info-form' id={lead._id} onSubmit={this.handleSubmit}>
                    <div>
                      <label forid='offerDate'>Deadline&nbsp;&nbsp;</label>
                      <input type='date' name='offerDate' id='offerDate' required/>
                    </div>
                    <div>
                      <label forid='offerSalary'>Salary&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                      <input type='text' name='offerSalary' id='offerSalary' />
                    </div>
                    <div>
                      <label forid='offerSpecifics'>Other&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                      <input type='text' name='offerSpecifics' id='offerSpecifics' />
                    </div>
                    <button type='submit'>save</button>
                  </form>
                  }
                </li>
              );
            }
          })}
        </ol>
      </div>
    )
  }
};

export default OffersList;
