var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var merge = require('react/lib/merge');
var request = require('../trafik/helpers/request');
var moment = require('moment');

function parseJourney(data) {
	var serverTime = moment(data.serverTime);
	var journey = data.JourneyDetail.Stop.filter(function(stop) {
		console.log(serverTime.isBefore(moment(stop.rtArrTime)))
		if (stop.rtArrTime) {
			return stop;
		}
	});

	return {
		journey: journey
	};
}

var JourneyStore = merge(EventEmitter.prototype, {

	get: function(url) {

		return request(url).then(parseJourney);

	}
});

AppDispatcher.register(function(payload) {
	var action = payload.action;

	JourneyStore.emitChange();

	return true;
});

module.exports = JourneyStore;
