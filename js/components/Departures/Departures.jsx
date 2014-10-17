var React = require('react/addons');
var ReactPropTypes = React.PropTypes;
var PureRenderMixin = React.addons.PureRenderMixin;
var CSSTransitionGroup = React.addons.CSSTransitionGroup;

var Actions = require('../../actions/Actions');
var DepartureItem = require('./DepartureItem.jsx');

var intervalId;
var Departures = module.exports = React.createClass({

	mixins: [PureRenderMixin],

	propTypes: {
		departures: ReactPropTypes.array.isRequired
	},

	componentWillReceiveProps: function(props) {
		Actions.refreshDepartures(props.departures.length ? true : false);
	},

	render: function() {

		return (
			<CSSTransitionGroup transitionName="animation-fall" className="Departures">
				{
					this.props.departures.map(function(departure, id) {
						return <DepartureItem key={id} departure={departure} />;
					})
				}
			</CSSTransitionGroup>
		)
	}
});
