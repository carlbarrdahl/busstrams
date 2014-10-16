var React = require('react/addons');
var Reflux = require('reflux');

var Header = require('./Common/Header.jsx');
var Omnibutton = require('./Common/Omnibutton.jsx');

var Stations = require('./Stations/Stations.jsx');
var Departures = require('./Departures/Departures.jsx');

var Actions = require('../actions/Actions');
var LoadingStore = require('../stores/LoadingStore');
var StationStore = require('../stores/StationStore');
var DepartureStore = require('../stores/DepartureStore');

var MainApp = module.exports = React.createClass({

	mixins: [Reflux.ListenerMixin],

	getInitialState: function() {
		return {
			loading: false,
			stations: [],
			departures: {
				current: '',
				list: []
			}
		};
	},

	componentDidMount: function() {
		this.listenTo(LoadingStore, this.setState);
		this.listenTo(StationStore, this.setState);
		this.listenTo(DepartureStore, this.setState);
		Actions.getNearbyStations();
	},

	render: function() {
		return (
			<main>
				<Header current={this.state.departures.current} />
				<Omnibutton loading={this.state.loading} />
				<Stations stations={this.state.stations} />
				<Departures departures={this.state.departures} />
			</main>
		);
	}

});
