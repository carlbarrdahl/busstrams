var React = require('react');

var Header = require('./Common/Header.jsx');

var MainApp = React.createClass({

	render: function() {
		return (
			<main>
				<Header />
				<section className="content"><this.props.activeRouteHandler /></section>
				<div className="spinner"></div>
			</main>
		);
	}

});

module.exports = MainApp;

