var React = require('react/addons');
var PureRenderMixin = React.addons.PureRenderMixin;
var CSSTransitionGroup = React.addons.CSSTransitionGroup;

var DataStore = require('../../stores/DataStore');
var JourneyItem = require('./JourneyItem.jsx');


var Journey = React.createClass({

	mixins: [PureRenderMixin],

	getInitialState: function() {
		return {
			journey: []
		};
	},

	componentDidMount: function() {
		this._getJourney();
	},

	render: function() {
		var stopId = this.props.params.stopid;
		var journey = this.state.journey;
		console.log(journey);

		var stops = journey.map(function(stop) {
			return <JourneyItem key={stop.id} stop={stop} />
		});

		return (
			<CSSTransitionGroup transitionName="slideUp" className="Journey">
				{stops}
			</CSSTransitionGroup>
		)
	},

	_getJourney: function() {
		DataStore.journey(this.props.query.ref).then(this.setState.bind(this));
	}

});

module.exports = Journey;

