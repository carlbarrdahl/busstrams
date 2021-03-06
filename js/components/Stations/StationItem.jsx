var React = require('react/addons');
var ReactPropTypes = React.PropTypes;
var PureRenderMixin = React.addons.PureRenderMixin;

var Actions = require('../../actions/Actions');

var Station = React.createClass({

	mixins: [PureRenderMixin],

	propTypes: {
		station: ReactPropTypes.object.isRequired
	},

	render: function() {
		var station = this.props.station;

		return (
			<div className="Stations__item" onClick={this._handleClick}>
				<h4>{station.name}</h4>
				<div>{station.distance} m</div>
			</div>
		);
	},

	_handleClick: function(e) {
		Actions.clearDepartures();
		Actions.getDepartures(this.props.station);
		Actions.setState('departures');
	}

});

module.exports = Station;
