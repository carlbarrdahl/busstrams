var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var Header = module.exports = React.createClass({

	getInitialState: function() {
		return {
			header: 'Avgång'
		};
	},

	render: function() {
		// var title = 'Avgång';
		var title = this.props.current.name || 'Avgång';
		return (
			<header className="Header">
				{title}
			</header>
		);
	}

});
