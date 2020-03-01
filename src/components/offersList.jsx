import React from 'react';
import $ from 'jquery';
import axios from 'axios';

class OffersList extends React.Component{
  constructor(props){
    super(props);
    this.state = { isExpanded: {} };
    this.expand = this.expand.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.dragStartHandler = this.dragStartHandler.bind(this);
    this.dropHandler = this.dropHandler.bind(this);
    this.dragOverHandler = this.dragOverHandler.bind(this);
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

  dragStartHandler(ev) {
    this.props.dragStart(ev);
  }

  dropHandler(ev, el) {
    this.props.drop(ev, el);
  }

  dragOverHandler(ev) {
    this.props.dragOver(ev);
  }

  render(){
    return(
      <div className='board'>
        <h2>Offers</h2>
        <div
          className='offer'
          data-status='offer'
          onDragOver={ev => this.dragOverHandler(ev)}
          onDrop={ev => this.dropHandler(ev, 'offer')}>
          {this.props.leads.map((lead) => {
              let gLink;
              if(lead.offerDate) {
                gLink = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${lead.company}+offer+deadline&dates=${lead.offerDate.slice(0, 10).replace(/\-/gi, '')}/${lead.offerDate.slice(0, 10).replace(/\-/gi, '')}&details=${lead.offerSpecifics}`;
              } else {
                gLink ='#'
              }
              return (
                <div className='item' key={lead._id} id={lead._id} draggable={true} onDragStart={ev => this.dragStartHandler(ev)}>
                  <span>{lead.company}  |  {lead.position}  |  {lead.location}</span>
                  <a href={lead.jobPost} target='_blank'><i class="fas fa-link xs"></i></a>
                  {/* {lead.offerDate &&
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
                  } */}
                </div>
              );
            }
          )}
        </div>
      </div>
    )
  }
};

export default OffersList;
