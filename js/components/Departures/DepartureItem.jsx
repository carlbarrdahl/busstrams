var React = require('react/addons');
var ReactPropTypes = React.PropTypes;
var Router = require('react-router');
var Link = Router.Link;

var PureRenderMixin = React.addons.PureRenderMixin;

var Icon = require('../Common/Icon.jsx');

var DataStore = require('../../stores/DataStore');

var DepartureItem = React.createClass({

	mixins: [PureRenderMixin],

	propTypes: {
		departure: ReactPropTypes.object.isRequired
	},

	render: function() {
		console.log('DepartureItem', this.props.departure);
		var departure = this.props.departure;

		var style = {
			backgroundColor: departure.fgColor,
			color: departure.bgColor
		};

		var departureTimes = {
			next: DataStore.getDepartureIn(departure.rtTime),
			after: DataStore.getDepartureIn(departure.rtNext)
		};

		return (
			<Link to="journey" params={departure} query={departure.JourneyDetailRef}>
				<figure style={style}><span>{departure.sname}</span></figure>
				<section>
					<header>
						<h3><Icon type={departure.type} /> {departure.direction}</h3>
						<div>
							<span>{departureTimes.next}</span>
							<span>{departureTimes.after}</span>
						</div>
					</header>
					<ol>
						<li><Icon type={departure.accessibility || ''} /></li>
						<li>Läge <strong>{departure.track}</strong></li>
					</ol>
				</section>
			</Link>
		);
	}

});

module.exports = DepartureItem;

/*
			<Link to="journey" params={departure} query={departure.JourneyDetailRef}>
				<figure style={style}><span>{departure.sname}</span></figure>
				<div>
					<header>
						<h3><Icon type={departure.type} /> {departure.direction}</h3>
						<time>{departureTime.next} <span>{departureTime.after}</span></time>
					</header>
					<ol>
						<li>Läge <strong>{departure.track}</strong></li>
					</ol>
				</div>
			</Link>
 */
