var React = require('react/addons');
var ReactPropTypes = React.PropTypes;
var CSSTransitionGroup = React.addons.CSSTransitionGroup;

var StationItem = require('./StationItem.jsx');

var Stations = module.exports = React.createClass({

	propTypes: {
		stations: ReactPropTypes.array.isRequired
	},

	render: function() {

		return (
			<CSSTransitionGroup transitionName="animation-fall" className="Stations">
				{
					this.props.stations.map(function(station) {
						return <StationItem key={station.id} station={station} />;
					})
				}
			</CSSTransitionGroup>
		)
	}
});
