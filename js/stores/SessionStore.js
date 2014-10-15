var Reflux = require('reflux');

var Actions = require('../actions/Actions');


var _currentStation = {};

var SessionStore = module.exports = Reflux.createStore({

	init: function() {
		this.listenTo(Actions.getCurrentStation, getCurrentStation);
		this.listenTo(Actions.setCurrentStation, setCurrentStation);
	},

	output: function(loading) {
		this.trigger({
			loading: loading
		});
	}

});


function getCurrentStation() {
	return _currentStation;
}

function setCurrentStation(station) {
	console.log('setCurrentStation', station)
	_currentStation = station;
}
