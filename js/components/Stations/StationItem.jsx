var React = require('react/addons');
var ReactPropTypes = React.PropTypes;
var Router = require('react-router');
var Link = Router.Link;

var PureRenderMixin = React.addons.PureRenderMixin;

var Station = React.createClass({

	mixins: [PureRenderMixin],

	propTypes: {
		station: ReactPropTypes.object.isRequired
	},

	render: function() {
		var station = this.props.station;

		return (
			<Link to="departure" params={station} query={station}>
				<h4>{station.name}</h4>
				<span>{station.distance} m</span>
			</Link>
		);
	}

});

module.exports = Station;
