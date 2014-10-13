var React = require('react/addons');
var ReactPropTypes = React.PropTypes;

var PureRenderMixin = React.addons.PureRenderMixin;

var StopItem = React.createClass({

	mixins: [PureRenderMixin],

	propTypes: {
		stop: ReactPropTypes.object.isRequired
	},

	render: function() {
		var stop = this.props.stop;
		console.log(stop)

		return (
			<a>
				<h4>{stop.name.split(',')[0]}</h4>
				<span>{stop.rtArrTime}</span>
			</a>

			);
	}

});

module.exports = StopItem;


/*
			<a>
				<figure style={style}><span></span></figure>
				<div>
					<h3>{stop.name}</h3>
					<ol>
						<li>{stop.type}</li>
						<li>Läge <strong>{stop.track}</strong></li>
						<li>{stop.rtArrTime}</li>
					</ol>
				</div>
			</a>
 */
