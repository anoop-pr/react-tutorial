 /** @jsx React.DOM */

var React = require('react'),
    MessageBox = require('./MessageBox');

var message = "String";
var rend = React.renderComponent(
  <MessageBox proTitle={message} url="metric"/>,
  document.getElementById('app'),
  function () {
    console.log('after render');
  }
)
