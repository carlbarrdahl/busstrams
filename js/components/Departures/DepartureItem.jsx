var React = require('react/addons');
var ReactPropTypes = React.PropTypes;

var Icon = require('../Common/Icon.jsx');

var DepartureItem = module.exports = React.createClass({

	propTypes: {
		departure: ReactPropTypes.object.isRequired
	},

	render: function() {
		var departure = this.props.departure;

		return (
			<a className={departure.timestamps.next === 0 ? 'blink' : ''} onClick={this._handleClick}>
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
	},

	_handleClick: function() {
		console.log('click departure')
	}

});
