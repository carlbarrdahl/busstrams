var React = require('react/addons');
var PureRenderMixin = React.addons.PureRenderMixin;
var CSSTransitionGroup = React.addons.CSSTransitionGroup;

var DataStore = require('../../stores/DataStore');
var DepartureItem = require('./DepartureItem.jsx');


var Departures = React.createClass({

	mixins: [PureRenderMixin],

	getInitialState: function() {
		return {
			departures: []
		};
	},

	componentDidMount: function() {
		this._getDepartures();
	},

	render: function() {
		var departures = this.state.departures.map(function(departure, id) {
			return <DepartureItem key={id} departure={departure} />;
		});

		return (
			<CSSTransitionGroup transitionName="slideUp" className="Departures">
				{departures}
			</CSSTransitionGroup>
		)
	},

	_getDepartures: function() {
		DataStore.departures(this.props.query).then(this.setState.bind(this));
	}
});

module.exports = Departures;
