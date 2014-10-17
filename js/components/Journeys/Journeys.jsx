var React = require('react/addons');
var ReactPropTypes = React.PropTypes;
var PureRenderMixin = React.addons.PureRenderMixin;
var CSSTransitionGroup = React.addons.CSSTransitionGroup;

var Actions = require('../../actions/Actions');

var intervalId;
var Departures = module.exports = React.createClass({

	// mixins: [PureRenderMixin],

	propTypes: {
		journeys: ReactPropTypes.object.isRequired
	},

	render: function() {
		console.log('Journeys', this.props);

		return (
			<div className="Journeys"></div>
		)
	}
});
