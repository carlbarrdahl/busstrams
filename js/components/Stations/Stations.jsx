var React = require('react/addons');
var CSSTransitionGroup = React.addons.CSSTransitionGroup;

var DataStore = require('../../stores/DataStore');
var StationItem = require('./StationItem.jsx');

var PureRenderMixin = React.addons.PureRenderMixin;

var intervalId;
var Stations = React.createClass({

	mixins: [PureRenderMixin],

	getInitialState: function() {
		return {
			stations: []
		};
	},

	componentDidMount: function() {
		this._getStations();
	},

	render: function() {
		var stations = [];

		var stations = this.state.stations.map(function(station) {
			return <StationItem key={station.id} station={station} />;
		});

		return (
			<CSSTransitionGroup transitionName="slideUp" className="Stations">
				{stations}
			</CSSTransitionGroup>
		)
	},

	_getStations: function() {
		DataStore.stations().then(this.setState.bind(this));
	}
});

module.exports = Stations
