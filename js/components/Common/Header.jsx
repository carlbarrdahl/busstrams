var React = require('react/addons');
var component = require('omniscient');

var Header = module.exports = React.createClass({

	render: function() {
		var title = this.props.current.name || 'Avgång';
		return (
			<header className="Header">
				{title}
			</header>
		);
	}

});
