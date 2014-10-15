var Reflux = require('reflux');

var Actions = require('../actions/Actions');
var Geo = require('../helpers/geo');
var Api = require('../api/vasttrafik');

var _stations = {};
var _departures = {};
var _currentStation;

var DataStore = module.exports = Reflux.createStore({
	init: function() {
		this.listenTo(Actions.getNearbyStations, getNearbyStations);
		this.listenTo(Actions.getDepartures, getDepartures);
		this.listenTo(Actions.clearDepartures, clearDepartures);
	},

	getDepartures: getDepartures,

	getNearbyStations: getNearbyStations
});

function getNearbyStations() {
	Actions.loading(true);

	Geo.getLocation()
		.then(Api.stations)
		.then(emitStations)
		.catch(function(err) {
			console.error(err);
		});
}

function getDepartures(station) {
	Actions.loading(true);

	_currentStation = station;

	return Api.departures(station)
		.then(emitDepartures)
		.catch(function(err) {
			console.error(err);
		});
}


function emitStations(stations) {
	Actions.loading(false);
	_stations.stations = stations;
	DataStore.trigger(_stations);
}

DataStore.listen(function(stations) {
	// console.log('Storing stations...', stations);
});



function emitDepartures(departures) {
	Actions.loading(false);

	_departures.current = _currentStation;
	_departures.list = departures;

	DataStore.trigger({
		departures: _departures
	});
}

function clearDepartures() {
	_currentStation = {};
	emitDepartures([]);
}

