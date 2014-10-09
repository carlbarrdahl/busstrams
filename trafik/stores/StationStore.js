var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var ApiConstants = require('../constants/ApiConstants');
var StationConstants = require('../constants/StationConstants');
var merge = require('react/lib/merge');
var request = require('../trafik/helpers/request');
var geo = require('../trafik/helpers/geo');

var _stations = [];
var _lastPosition;

var CHANGE_EVENT = 'change';

function parseStations(data) {
	_stations = data.LocationList.StopLocation.filter(function(station) {
		if (!station.track) {
			var position = {
				lat: station.lat,
				lon: station.lon
			};
			return (station.distance = geo.distance(position, _lastPosition));
		}
	});

	return {
		stations: _stations
	};
}


var StationStore = merge(EventEmitter.prototype, {

	get: function(position) {

		var data = {
			maxNo: 50,
		};

		console.log('getting location...');
		return geo.getLocation().then(function(position) {
			console.log('location found. getting nearby stations');
			data = merge(data, _lastPosition = position);
			return request(ApiConstants.baseUrl + StationConstants.service, data).then(parseStations);
		});
	},

	emitChange: function() {
		this.emit(CHANGE_EVENT);
	},

	addChangeListener: function(callback) {
		this.on(CHANGE_EVENT, callback);
	},

	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	}
});

AppDispatcher.register(function(payload) {
	var action = payload.action;

	StationStore.emitChange();

	return true;
});

module.exports = StationStore;
