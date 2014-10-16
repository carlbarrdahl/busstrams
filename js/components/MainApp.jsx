var React = require('react/addons');
var Reflux = require('reflux');

var Header = require('./Common/Header.jsx');
var Omnibutton = require('./Common/Omnibutton.jsx');

var Stations = require('./Stations/Stations.jsx');
var Departures = require('./Departures/Departures.jsx');

var Actions = require('../actions/Actions');
var Store = require('../stores/Store');

var MainApp = module.exports = React.createClass({

	mixins: [Reflux.ListenerMixin],

	getInitialState: Store.getInitialState,

	componentDidMount: function() {
		console.log('App mounted', this.state);
		this.listenTo(Store, this.setState);
	},

	render: function() {
		var className = this.state.departures.list.length ? 'departures' : 'stations';

		return (
			<main onClick={this._handleClick} className={className}>
				<Header current={this.state.currentStation} />
				<Omnibutton loading={this.state.loading} />
				<Stations stations={this.state.stations} />
				<Departures departures={this.state.departures} />
			</main>
		);
	},

	_handleClick: function(e) {
		console.log('click', e);

		if (this.state.departures.list.length) {
			Actions.clearDepartures();
		}
	}

});
