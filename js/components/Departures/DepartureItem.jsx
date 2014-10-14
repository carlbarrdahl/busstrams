/*

DepartureItem

{
	sname: vehicalNumber,
	direction: endStation,
	via: via,
	type: vehicleType,
	track: track,
	timestamps: {
		next: nextArrivesIn,
		after: afterArrivesIn
	},
	style: {
		color: '#000',
		backgroundColor: '#fff'
	}
}

 */

var React = require('react/addons');
var ReactPropTypes = React.PropTypes;
var Router = require('react-router');
var Link = Router.Link;

var PureRenderMixin = React.addons.PureRenderMixin;

var Icon = require('../Common/Icon.jsx');
var DepartureStore = require('../../stores/DepartureStore');

var DepartureItem = module.exports = React.createClass({

	mixins: [PureRenderMixin],

	propTypes: {
		departure: ReactPropTypes.object.isRequired
	},

	render: function() {
		var departure = this.props.departure;

		return (
			<a>
				<figure style={departure.style}><span>{departure.sname}</span></figure>
				<div className="col">
					<div className="row">
						<h4 className="col"><Icon type={departure.type} /> {departure.direction}</h4>
						<div className="-time">
							<span>{departure.timestamps.next}</span>
							<span>{departure.timestamps.after}</span>
						</div>
					</div>
					<div className="-meta row">
						<div className="col">
							{departure.via ? 'Via: ' + departure.via : ''}
						</div>
						<div className="-track">Läge {departure.track}</div>
					</div>
				</div>
			</a>
		);
	}

});
