var React = require('react/addons');
var PureRenderMixin = React.addons.PureRenderMixin;

var isvg = require('react-inlinesvg');

var Icon = module.exports = React.createClass({

	mixins: [PureRenderMixin],

	render: function() {
		var type = this.props.type.toLowerCase();

		if (!type) {
			return null;
		}

		var icon = 'icon icon-' + type;
		var src = '../../assets/icons/' + type + '.svg';

		return (<isvg className={icon} src={src}></isvg>);
	}

});
