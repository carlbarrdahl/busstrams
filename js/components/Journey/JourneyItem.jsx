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
				<div>
					<h3>{stop.name}</h3>
					<ol>
						<li>{stop.type}</li>
						<li>Läge <strong>{stop.track}</strong></li>
						<li>{stop.rtArrTime}</li>
					</ol>
				</div>
			</a>
			);

		// {stop.name} {stop.depTime} {time.difference(stop.depTime, stop.rtDepTime)}
	}

});

module.exports = StopItem;


/*


<div class="list-group">
	<div class="list-group-item">
		<div class="row-action-primary">
			<i class="icon-material-folder"></i>
		</div>
		<div class="row-content">
			<div class="least-content">15m</div>
			<h4 class="list-group-item-heading">Tile with a label</h4>
			<p class="list-group-item-text">Donec id elit non mi porta gravida at eget metus.</p>
		</div>
	</div>
	<div class="list-group-separator"></div>
</div>
 */
