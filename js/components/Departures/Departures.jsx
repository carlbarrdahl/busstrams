var React = require('react/addons');
var PureRenderMixin = React.addons.PureRenderMixin;
var CSSTransitionGroup = React.addons.CSSTransitionGroup;

var Reflux = require('reflux');

var DepartureStore = require('../../stores/DepartureStore');
var DepartureItem = require('./DepartureItem.jsx');


var Departures = module.exports = React.createClass({

	mixins: [Reflux.ListenerMixin, PureRenderMixin],

	getInitialState: function() {
		return {
			departures: []
		};
	},

	componentDidMount: function() {
		this.listenTo(DepartureStore, this.setState);

		DepartureStore.getDepartures(this.props.query);
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
	}
});
