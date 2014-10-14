var Reflux = require('reflux');

var Actions = require('../actions/Actions');
var Geo = require('../helpers/geo');
var Api = require('../api/vasttrafik');

var _stations = {};

var StationStore = module.exports = Reflux.createStore({
	init: function() {
		this.listenTo(Actions.getNearbyStations, this.getNearbyStations);
	},

	getNearbyStations: function() {
		Geo.getLocation()
			.then(Api.stations)
			.then(emit)
			.catch(function(err) {
				console.error(err);
			});
	}
});


function emit(stations) {
	_stations.stations = stations;
	StationStore.trigger(_stations);
}

StationStore.listen(function(stations) {
	console.log('Storing stations...', stations);
});
