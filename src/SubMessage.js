 /** @jsx React.DOM */
var React = require('React');


var SubMessage = React.createClass({
  
  delMessage: function(e) {
      this.props.callDelete(this.props.message);
  },

  render :  function() {
    return (
      <p>{this.props.message} <button onClick={this.delMessage}>X</button> </p>
    )
  }

});

module.exports = SubMessage;