var Reflux = require('reflux');

var Actions = require('../actions/Actions');
var Geo = require('../helpers/geo');
var Api = require('../api/vasttrafik');

var _stations = {};

var DataStore = module.exports = Reflux.createStore({

	init: function() {
		this.listenTo(Actions.getNearbyStations, this.getNearbyStations);
	},

	getNearbyStations: function() {
		Actions.loading(true);

		Geo.getLocation()
			.then(Api.stations)
			.then(emit)
			.catch(function(err) {
				console.error(err);
			});
	}
});

function emit(stations) {
	Actions.loading(false);

	_stations = stations;

	DataStore.trigger({
		stations: _stations
	});
}
