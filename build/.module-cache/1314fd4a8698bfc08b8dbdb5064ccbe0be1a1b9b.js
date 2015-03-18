 /** @jsx React.DOM */

var MessageBox = React.createClass({displayName: 'MessageBox',

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
    return nextState.metric > 1000;
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
      metric: 0,
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
      return SubMessage({message: msg, callDelete: this.deleteMessage})
    }.bind(this));

    console.log(messageComp);
    return (
      React.DOM.div({className: "sample"}, 
        
        React.DOM.input({type: "text", ref: "messageText"}), 
        React.DOM.button({onClick: this.clickHandled}, this.state.button), 
        React.DOM.h1(null, this.state.metric), 
        React.DOM.h1(null, this.props.proTitle), 
        React.DOM.a({href: "#", id: "tooptip", 'data-toggle': "tooltip", title: "tooptip"}, "Tooltip"), 
        messageComp 
      )
    );
  }
});

var SubMessage = React.createClass({displayName: 'SubMessage',
  
  delMessage: function(e) {
      this.props.callDelete(this.props.message);
  },

  render :  function() {
    return (
      React.DOM.p(null, this.props.message, " ", React.DOM.button({onClick: this.delMessage}, "X"), " ")
    )
  }

});

var message = "String";
var rend = React.renderComponent(
  MessageBox({proTitle: message, url: "metric"}),
  document.getElementById('app'),
  function () {
    console.log('after render');
  }
)


var dataComponent = React.createClass({displayName: 'dataComponent',
  mixins: [React.addons.LinkedStateMixin],
  getInitialState: function() {
    return {
      payment1 : 0,
      payment2 : 0
    }
  },

  render: function() {
    var total = parseInt(this.state.payment1) + parseInt(this.state.payment2);

    return (
        React.DOM.div(null, 
        paymentComponent({valueLink: this.linkState('payment1')}), 
        paymentComponent({valueLink: this.linkState('payment2')}), 
        total
        )
      )

  }

});


var paymentComponent = React.createClass({displayName: 'paymentComponent',

  render : function() {
    return this.transferPropsTo(
        React.DOM.input({type: "text"})
      );
  }

});

React.renderComponent(
    dataComponent(null),
    document.getElementById('three')
  )
