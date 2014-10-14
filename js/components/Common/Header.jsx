var React = require('react');

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
				<Loader />
				{this.state.header}
			</header>
		);
	}

});
