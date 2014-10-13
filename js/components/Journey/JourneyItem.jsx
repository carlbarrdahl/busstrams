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
		var style = {
			background: stop.current ? 'red' : 'black'
		};


		return (
			<a>
				<figure style={style}><span></span></figure>
				<div className="col">
					<div className="row">
						<h4 className="col">{stop.name.split(',')[0]}</h4>
						<div className="-time">
							<span>{stop.rtArrTime}</span>
						</div>
					</div>
				</div>
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
