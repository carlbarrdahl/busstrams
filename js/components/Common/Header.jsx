var React = require('react');

var DataStore = require('../../stores/DataStore');

function getHeader() {
	return {
		header: DataStore.getHeader()
	};
}

var Header = React.createClass({

	getInitialState: function() {
		return {
			header: 'Header'
		};
	},

	componentDidMount: function() {
		DataStore.addChangeListener(this._onChange);
	},

	componentWillUnmount: function() {
		DataStore.removeChangeListener(this._onChange);
	},

	render: function() {
		var header = this.state.header;
		return (
			<header>{header}</header>
		);
	},

	_onChange: function() {
		this.setState(getHeader());
	}

});

module.exports = Header;
