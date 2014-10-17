var React = require('react/addons');
var ReactPropTypes = React.PropTypes;

var Icon = require('../Common/Icon.jsx');
var Bubble = require('../Common/Bubble.jsx');

var _departure = {
	"sname": "1",
	"direction": "a",
	"type": "",
	"timestamps": {
		"next": 1
	},
	"style": {
		"backgroundColor": "#eee",
		"color": "#333"
	},
	className: 'BLOKK'
};

var DepartureItem = module.exports = React.createClass({

	propTypes: {
		departure: ReactPropTypes.object.isRequired
	},

	render: function() {
		var departure = this.props.departure || _departure;
		console.log('DepartureItem', departure)

		var className = (departure.className || '') + ' Departures__item' + (departure.timestamps.next === 0 ? ' blink' : '');

		return (
			<div className={className} onClick={this._handleClick}>
				<Bubble style={departure.style} text={departure.sname} />

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
						<div className="-track">{departure.track ? 'Läge: ' + departure.track : ''}</div>
					</div>
				</div>

			</div>
		);
	},

	_handleClick: function() {
		console.log('click departure')
	}

});
