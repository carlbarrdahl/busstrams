var React = require('react/addons');
var ReactPropTypes = React.PropTypes;
var PureRenderMixin = React.addons.PureRenderMixin;
var CSSTransitionGroup = React.addons.CSSTransitionGroup;

var StationItem = require('./StationItem.jsx');

var Stations = module.exports = React.createClass({

	mixins: [PureRenderMixin],

	propTypes: {
		stations: ReactPropTypes.array.isRequired
	},

	render: function() {
		console.log('render station', this.props)
		var current = this.props.selected.id;

		return (
			<CSSTransitionGroup transitionName="animation-fall" className="Stations">
				{
					this.props.stations.map(function(station) {
						return <StationItem key={station.id} station={station} selected={current} />;
					})
				}
			</CSSTransitionGroup>
		)
	}
});
