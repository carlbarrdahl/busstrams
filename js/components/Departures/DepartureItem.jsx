var React = require('react/addons');
var ReactPropTypes = React.PropTypes;
var Router = require('react-router');
var Link = Router.Link;

var PureRenderMixin = React.addons.PureRenderMixin;

var DepartureItem = React.createClass({

	mixins: [PureRenderMixin],

	propTypes: {
		departure: ReactPropTypes.object.isRequired
	},

	render: function() {
		var departure = this.props.departure;
		console.log('DepartureItem', departure);

		var style = {
			backgroundColor: departure.fgColor,
			color: departure.bgColor
		};

		return (
			<Link to="journey" params={departure} query={departure.JourneyDetailRef}>
				<figure style={style}><span>{departure.sname}</span></figure>
				<div>
					<h3>{departure.direction}</h3>
					<ol>
						<li>{departure.rtTime}</li>
						<li>{departure.rtNext}</li>
						<li>Läge <strong>{departure.track}</strong></li>
						<li>{departure.type}</li>
					</ol>
				</div>
			</Link>
		);
	}

});

module.exports = DepartureItem;

/*
<span>{departure.time} {time.difference(departure.time, departure.rtTime)}</span>

var start = moment([2007, 0, 5]);
var end   = moment([2007, 0, 10]);
end.from(start);       // "in 5 days"
end.from(start, true); // "5 days"
{departure.name} {departure.direction} {departure.time} {time.difference(departure.time, departure.rtTime)}
 */
