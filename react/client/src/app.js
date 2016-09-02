var React = require('react');
var ReactDOM = require('react-dom');
var TextEditor= require('./components/TextEditor.jsx');

window.onload = function(){
  ReactDOM.render(
    <TextEditor textURL="http://localhost:3000/text"
    />,
    document.getElementById('app')
  );
}
