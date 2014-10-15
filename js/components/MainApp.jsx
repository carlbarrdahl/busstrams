var React = require('react');
var Header = require('./Common/Header.jsx');

var Omnibutton = require('./Common/Omnibutton.jsx');

var MainApp = React.createClass({
	getInitialState: function() {
		return {
			loading: false
		};
	},

	render: function() {
		return (
			<main>
				<Header />
				<Omnibutton />
				<section className="content"><this.props.activeRouteHandler /></section>
			</main>
		);
	}

});

module.exports = MainApp;

