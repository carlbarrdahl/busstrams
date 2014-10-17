var React = require('react/addons');

var Bubble = module.exports = React.createClass({
	render: function() {
		return (<figure className="Bubble" style={this.props.style}><span>{this.props.text}</span></figure>);
	}
});
