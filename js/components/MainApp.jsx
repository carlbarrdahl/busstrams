var React = require('react');

var Header = require('./Common/Header.jsx');
var Icon = require('./Common/Icon.jsx');


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
				<section className="content"><this.props.activeRouteHandler /></section>
				<Icon loading={this.state.loading} type="spinner" />
			</main>
		);
	}

});

module.exports = MainApp;

