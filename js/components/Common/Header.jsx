var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

var Loader = require('./Loader.jsx');

var Header = module.exports = React.createClass({

	getInitialState: function() {
		return {
			header: 'Avgång'
		};
	},

	render: function() {
		return (
			<header className="Header">
				<Link to="stations"><Loader /></Link>
				{this.state.header}
			</header>
		);
	}

});
