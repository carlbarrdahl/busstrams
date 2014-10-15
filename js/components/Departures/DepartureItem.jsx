var React = require('react/addons');
var ReactPropTypes = React.PropTypes;

var Icon = require('../Common/Icon.jsx');

var DepartureItem = module.exports = React.createClass({

	propTypes: {
		departure: ReactPropTypes.object.isRequired
	},

	render: function() {
		var departure = this.props.departure;

		// console.log(departure)

		if (departure.timestamps.next === 0) {

			var style = {
				opacity: .5
			};
		}

		return (
			<a className={departure.timestamps.next === 0 ? 'animation-blink' : ''}>
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
