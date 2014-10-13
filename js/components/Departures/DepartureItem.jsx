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

		var direction = departure.direction.split('via');

		return (
			<Link to="journey" params={departure} query={departure.JourneyDetailRef}>
				<figure style={style}><span>{departure.sname}</span></figure>
				<div className="col">
					<div className="row">
						<h4 className="col"><Icon type={departure.type} /> {direction[0]}</h4>
						<div className="-time">
							<span>{departureTimes.next}</span>
							<span>{departureTimes.after}</span>
						</div>
					</div>
					<div className="-meta row">
						<div className="col">
							<Icon type={departure.accessibility || ''} />
							{direction[1] ? 'Via' + direction[1] : ''}
						</div>
						<div className="-track">Läge {departure.track}</div>
					</div>
				</div>
			</Link>
		);
	}

});

module.exports = DepartureItem;

/*
			<Link to="journey" params={departure} query={departure.JourneyDetailRef}>
				<figure style={style}><span>{departure.sname}</span></figure>
				<section>
					<header>
						<h3><Icon type={departure.type} /> {direction[0]} </h3>
						<div>
							<span>{departureTimes.next}</span>
							<span>{departureTimes.after}</span>
						</div>
					</header>
					<ol>{listItems}</ol>
				</section>
			</Link>
 */
