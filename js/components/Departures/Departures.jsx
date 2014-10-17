var React = require('react/addons');
var ReactPropTypes = React.PropTypes;
var CSSTransitionGroup = React.addons.CSSTransitionGroup;

var Actions = require('../../actions/Actions');
var DepartureItem = require('./DepartureItem.jsx');

var intervalId;
var Departures = module.exports = React.createClass({

	propTypes: {
		departures: ReactPropTypes.object.isRequired
	},

	componentWillReceiveProps: function(props) {
		Actions.refreshDepartures(props.departures.list.length ? true : false);
	},

	render: function() {
		// console.log('Render departures', this.props);
		return (
			<CSSTransitionGroup transitionName="animation-fall" className="Departures">
				{
					this.props.departures.list.map(function(departure, id) {
						return <DepartureItem key={id} departure={departure} />;
					})
				}
			</CSSTransitionGroup>
		)
	}
});
