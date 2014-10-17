var React = require('react/addons');
var ReactPropTypes = React.PropTypes;
var CSSTransitionGroup = React.addons.CSSTransitionGroup;

var StationItem = require('./StationItem.jsx');

var Stations = module.exports = React.createClass({

	propTypes: {
		stations: ReactPropTypes.object.isRequired
	},

	render: function() {
		var current = this.props.selected.id;


		return (
			<CSSTransitionGroup transitionName="animation-fall" className="Stations">
				{
					this.props.stations.list.map(function(station) {
						return <StationItem key={station.id} station={station} selected={current} />;
					})
				}
			</CSSTransitionGroup>
		)
	}
});
