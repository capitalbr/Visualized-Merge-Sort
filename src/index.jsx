import React from 'react';
import ReactDOM from 'react-dom';
import "./stylesheets/output.css"
import Main from './components/main';

window.addEventListener("keydown", function (e) {
  if ([32, 33, 34, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
    e.preventDefault();
  }
}, false);

ReactDOM.render(<Main />, document.getElementById('root'));
