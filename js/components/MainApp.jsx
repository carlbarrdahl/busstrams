var React = require('react/addons');
var Reflux = require('reflux');
var PureRenderMixin = React.addons.PureRenderMixin;
var Header = require('./Common/Header.jsx');
var Omnibutton = require('./Common/Omnibutton.jsx');

var Stations = require('./Stations/Stations.jsx');
var Departures = require('./Departures/Departures.jsx');

var Actions = require('../actions/Actions');
var Store = require('../stores/Store');


var className;
var MainApp = module.exports = React.createClass({

	mixins: [PureRenderMixin, Reflux.ListenerMixin],

	getInitialState: Store.getInitialState,

	componentDidMount: function() {
		console.log('App mounted', this.state);
		this.listenTo(Store, this.setState);
	},

	render: function() {
		return (
			<main onClick={this._handleClick} className={this.state.state}>
				<Header current={this.state.currentStation} />
				<Omnibutton loading={this.state.loading} />
				<Stations stations={this.state.stations} selected={this.state.currentStation} />
				<Departures departures={this.state.departures} />
			</main>
		);
	},

	_handleClick: function(e) {
		console.log('state', this.state.state)
		if (this.state.state === 'departures' && this.state.departures.length) {
			Actions.setState('stations');
			Actions.clearDepartures();
		}

		document.body.scrollTop = 0;
	}

});
