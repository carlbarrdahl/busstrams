var React = require('react/addons');
var PureRenderMixin = React.addons.PureRenderMixin;

var Reflux = require('reflux');

var LoadingStore = require('../../stores/LoadingStore');

var isvg = require('react-inlinesvg');

var Icon = module.exports = React.createClass({

	mixins: [Reflux.ListenerMixin, PureRenderMixin],

	getInitialState: function() {
		return {
			loading: false
		};
	},

	componentDidMount: function() {
		this.listenTo(LoadingStore, this.setState);
	},

	render: function() {

		var icon = 'icon icon-spinner' + (this.state.loading ? ' loading' : '');
		var src = '../../assets/icons/spinner.svg';

		return (<isvg className={icon} src={src}></isvg>);
	}

});
