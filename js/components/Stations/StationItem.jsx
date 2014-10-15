var React = require('react/addons');
var ReactPropTypes = React.PropTypes;

var Actions = require('../../actions/Actions');

var Station = React.createClass({

	propTypes: {
		station: ReactPropTypes.object.isRequired
	},

	render: function() {
		var station = this.props.station;

		return (
			<a onClick={this._handleClick}>
				<h4>{station.name}</h4>
				<span>{station.distance} m</span>
			</a>
		);
	},

	_handleClick: function(e) {

		// TODO: Create a custom Router to handle this stuff

		if (document.body.className === 'departures') {
			Actions.clearDepartures();
			return document.body.className = 'stations';
		}

		Actions.getDepartures(this.props.station);
		document.body.className = 'departures'
		document.body.scrollTop = 0;
	}

});

module.exports = Station;
