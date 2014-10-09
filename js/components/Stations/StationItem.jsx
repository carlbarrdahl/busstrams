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
		console.log(station)

		return (
			<Link to="departure" params={station} query={station}>
				<h3>{station.name.split(',')[0]}</h3>
				<span>{station.distance} m</span>
			</Link>
		);
	}

});

module.exports = Station;
