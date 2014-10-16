var Reflux = require('reflux');

var Actions = require('../actions/Actions');
var Api = require('../api/vasttrafik');

var _departures = {};
var _currentStation;

var DataStore = module.exports = Reflux.createStore({
	init: function() {
		this.listenTo(Actions.getDepartures, getDepartures);
		this.listenTo(Actions.clearDepartures, clearDepartures);
	},

	getDepartures: getDepartures
});


function getDepartures(station) {
	Actions.loading(true);

	_currentStation = station;

	return Api.departures(station)
		.then(emit)
		.catch(function(err) {
			console.error(err);
		});
}


function emit(departures) {
	Actions.loading(false);

	_departures.current = _currentStation;
	_departures.list = departures;

	DataStore.trigger({
		departures: _departures
	});
}

function clearDepartures() {
	_currentStation = {};
	emit([]);
}

