import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.jsx';

const board = [
  {
    title: 'Leads',
    status: 'leads'
  },
  {
    title: 'Applied',
    status: 'applied'
  },
  {
    title: 'Phone Interviews',
    status: 'phoneInterview'
  },
  {
    title: 'Onsite Interviews',
    status: 'onsiteInterview'
  },
  {
    title: 'Offers',
    status: 'offer'
  },
  {
    title: 'Their Loss',
    status: 'rejected'
  }
]

ReactDOM.render(
  <App
    board={board}
  />,
  document.getElementById('root'),
);
