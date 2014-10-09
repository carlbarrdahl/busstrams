var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var ApiConstants = require('../constants/ApiConstants');
var DepartureConstants = require('../constants/DepartureConstants');
var merge = require('react/lib/merge');
var request = require('../trafik/helpers/request');

function parseDepartures(data) {

	return {
		departures: data.DepartureBoard.Departure
	};
}

var DepartureStore = merge(EventEmitter.prototype, {

	get: function(station) {
		console.log('getting nearby departures', ApiConstants.baseUrl + DepartureConstants.service);
		var data = {
			id: station,
			maxDeparturesPerLine: 4,
			timeSpan: 60,
			useLDTrain: 0,
			useVas: 0,
			useRegTrain: 0,
			exludeDR: 0
		};

		return request(ApiConstants.baseUrl + DepartureConstants.service, data).then(parseDepartures);

	}
});

AppDispatcher.register(function(payload) {
	var action = payload.action;

	DepartureStore.emitChange();

	return true;
});

module.exports = DepartureStore;
