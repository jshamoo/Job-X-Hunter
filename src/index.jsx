import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.jsx';
import board from './boardDesign.js';


ReactDOM.render(
  <App
    board={board}
  />,
  document.getElementById('root'),
);
