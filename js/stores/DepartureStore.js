var Reflux = require('reflux');

var Actions = require('../actions/Actions');
var Api = require('../api/vasttrafik');

var _departures = {};

var DepartureStore = module.exports = Reflux.createStore({
	init: function() {
		this.listenTo(Actions.getDepartures, getDepartures);
		this.listenTo(Actions.clearDepartures, clearDepartures);
	},

	getDepartures: getDepartures
});

function clearDepartures(departures) {
	// _currentStation = {};
	emit(departures || []);
}

function getDepartures(station) {
	Actions.setCurrentStation(station);

	Actions.loading(true);
	return Api.departures(station)
		.then(emit)
		.catch(function(err) {
			console.error(err);
		});
}


function emit(departures) {
	Actions.loading(false);
	// console.log('Actions.getCurrentStation()', Actions.getCurrentStation())
	// _departures.current = Actions.getCurrentStation();
	_departures.list = departures;

	DepartureStore.trigger({
		departures: _departures
	});
}

DepartureStore.listen(function(departures) {
	// console.log('Storing departures...', departures);
});
