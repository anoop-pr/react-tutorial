 /** @jsx React.DOM */
var React = require('react'),
	SubMessage = require('./SubMessage');

 var MessageBox = React.createClass({

  propTypes : {
    proTitle: React.PropTypes.string.isRequired
  },

  loadData: function(url) {
    return $.get('https://gsr-demo.firebaseio-demo.com/' + url + '.json');
  },

  componentWillMount: function() {
    // debugger;
  },

  componentDidMount: function() {
    this.loadData(this.props.url).then(function(data) {
      this.setState({metric : data});
      $('#tooptip').tooltip();
    }.bind(this));
  },

  componentWillReceiveProps: function(next) {

    var previous = this.props.url;
    this.loadData(next.url).then(function(data) {
      this.setState({metric: data});
    }.bind(this)); 

  },

  componentWillUnmount: function() {
    $('#tooptip').tooltip('destroy');
  },


  shouldComponentUpdate: function (nextProps, nextState) {
    // return nextState.metric > 1000;
    return true;
  },

  getInitialState: function() {
    return {
      messages: [
        'message 1',
        'message 2',
        'message 3',
        'message 4',
        'message 5',
        'message 6',
      ],
      metric: 12,
      button : "Buy Now"
    }
  },

  clickHandled: function(e) {
    this.setState ({button: "Please Wait"});
    var newMessage = this.refs.messageText.getDOMNode().value;

    this.setState({
        messages: this.state.messages.concat(newMessage)
      });

  },
  deleteMessage : function(msg) {
    var index = this.state.messages.indexOf(msg);
    this.state.messages.splice(index, 1);
    this.setState ({messages: this.state.messages});
  },
  render: function() {
    var messageComp = this.state.messages.map(function(msg) {
      return <SubMessage message={msg} callDelete={this.deleteMessage}/>
    }.bind(this));

    console.log(messageComp);
    return (
      <div className="sample">
        
        <input type="text" ref="messageText" />
        <button onClick={this.clickHandled}>{this.state.button}</button>
        <h1>{this.state.metric}</h1>
        <h1>{this.props.proTitle}</h1>      
        <a href="#" id="tooptip" data-toggle="tooltip" title="tooptip">Tooltip</a>      
        { messageComp }
      </div>
    );
  }
});

module.exports = MessageBox;