var React = require('react/addons');
var PureRenderMixin = React.addons.PureRenderMixin;

var isvg = require('react-inlinesvg');

var Actions = require('../../actions/Actions');

var Omnibutton = module.exports = React.createClass({

	mixins: [PureRenderMixin],

	render: function() {

		var icon = 'icon icon-spinner' + (this.props.loading ? ' loading' : '');
		var src = 'assets/icons/spinner.svg';

		return (
			<div className="Omnibutton" onClick={this._handleOnTouchStart}>
				<isvg className={icon} src={src}></isvg>
			</div>
		);
	},

	_handleOnTouchStart: function(e) {
		// Actions.clearDepartures();
	}

});
