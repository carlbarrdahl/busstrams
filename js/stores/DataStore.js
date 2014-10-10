var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;

var moment = require('moment');

var merge = require('react/lib/merge');
var geo = require('../helpers/geo');
var parse = require('../helpers/parse');
var req = require('../helpers/request');
var time = require('../helpers/time');

var CHANGE_EVENT = 'change';

var _header;

var _stations = [];
var _departures = [];
var _journey = [];

var _serverTime;

function setServerTime(time) {
	return (_serverTime = time);
}

function parseStations(data) {
	console.log('parseStations', data);

	setServerTime(data.LocationList.servertime);

	_stations = parse.stations(data);

	return {
		stations: _stations
	};
}

function parseDepartures(data) {
	console.log('parseDepartures', data);

	setServerTime(data.DepartureBoard.servertime);

	_departures = parse.departures(data);

	return {
		departures: _departures
	};
}

function parseJourney(data) {
	console.log('parseJourney', data);

	setServerTime(data.JourneyDetail.servertime);

	_journey = parse.journey(data);

	return {
		journey: _journey
	};
}

function setHeader(value) {
	_header = value;
	DataStore.emitChange();
}

var DataStore = merge(EventEmitter.prototype, {
	location: function() {
		return geo.getLocation();
	},

	stations: function() {
		setHeader('Avgång');
		return this.location().then(req.stations).then(parseStations);
	},

	departures: function(stationName, stationId) {
		setHeader(stationName);
		return req.departures(stationId).then(parseDepartures);
	},

	journey: function(url) {
		url.replace('http:', '');
		return req.journey(url).then(parseJourney);
	},

	getDepartureIn: function(departure) {
		return time.difference(departure, _serverTime);
	},

	emitChange: function() {
		this.emit(CHANGE_EVENT);
	},

	addChangeListener: function(callback) {
		this.on(CHANGE_EVENT, callback);
	},

	removeChangeListener: function(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	},

	getHeader: function() {
		return _header;
	}
});

AppDispatcher.register(function(payload) {
	var action = payload.action;

	DataStore.emitChange();

	return true;
});

module.exports = DataStore;
