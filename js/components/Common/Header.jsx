var React = require('react');

var Header = module.exports = React.createClass({

	getInitialState: function() {
		return {
			header: 'Avgång'
		};
	},

	render: function() {
		return (
			<header className="Header">{this.state.header}</header>
		);
	}

});
