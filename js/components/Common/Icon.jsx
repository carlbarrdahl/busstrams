var React = require('react/addons');
var PureRenderMixin = React.addons.PureRenderMixin;

var isvg = require('react-inlinesvg');

var Tram = React.createClass({

	mixins: [PureRenderMixin],

	render: function() {
		if (!(type = this.props.type.toLowerCase())) {
			return null;
		}

		var icon = 'icon icon-' + type;
		var src = '../../assets/icons/' + type + '.svg';
		return (<isvg className={icon} src={src}></isvg>);
	}

});

module.exports = Tram;
