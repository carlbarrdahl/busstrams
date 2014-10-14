var React = require('react/addons');
var PureRenderMixin = React.addons.PureRenderMixin;
var CSSTransitionGroup = React.addons.CSSTransitionGroup;

var Reflux = require('reflux');

var Actions = require('../../actions/Actions');
var StationStore = require('../../stores/StationStore');
var StationItem = require('./StationItem.jsx');

var intervalId;
var Stations = module.exports = React.createClass({

	mixins: [Reflux.ListenerMixin, PureRenderMixin],

	getInitialState: function() {
		return {
			stations: []
		};
	},

	componentDidMount: function() {
		this.listenTo(StationStore, this.setState);
		intervalId = setInterval(Actions.getNearbyStations, 10000);
		Actions.getNearbyStations();
	},

	componentWillUnmount: function() {
		clearInterval(intervalId);
	},

	render: function() {
		var stations = this.state.stations.map(function(station) {
			return <StationItem key={station.id} station={station} />;
		});

		return (
			<CSSTransitionGroup transitionName="slideUp" className="Stations">
				{stations}
			</CSSTransitionGroup>
		)
	}
});
