var Reflux = require('reflux');
var Actions = require('../actions/Actions');
var Geo = require('../helpers/geo');
var Api = require('../api/vasttrafik');

var _state = {
	lastOnline: Date.now(),
	loading: true,
	position: {
		init: null,
		current: null
	},
	currentStation: {},
	stations: {
		list: []
	},
	departures: {
		list: []
	},
	journeyHistory: {
		list: []
	}
};

var Store = module.exports = Reflux.createStore({

	init: function() {
		console.log('Init store', _state);

		this.listenTo(Actions.setLoading, setLoading);
		this.listenTo(Actions.getNearbyStations, getNearbyStations);
		this.listenTo(Actions.getDepartures, getDepartures);
		this.listenTo(Actions.clearDepartures, clearDepartures);
		this.listenTo(Actions.refreshDepartures, refreshDepartures);

		getNearbyStations();
	},

	getInitialState: function() {
		return _state;
	}

});

function emit() {
	Actions.setLoading(false);
	Store.trigger(_state);
}

function setLoading(loading) {
	_state.loading = loading;
	Store.trigger(_state);
}

function setPosition(position) {
	_state.position.init ? (_state.position.current = position) : (_state.position.init = _state.position.current = position);
	return position;
}

function setCurrentStation(station) {
	_state.currentStation = station || {};
}

function setStations(stations) {
	_state.stations.list = stations || [];
	emit();
}

function setDepartures(departures) {
	_state.departures.list = departures || [];
	emit();
}

function getNearbyStations() {
	Actions.setLoading(true);

	Geo.getLocation().then(setPosition).then(Api.stations).then(setStations).catch(function(err) {
		console.error(err);
	});
}

function getDepartures(station) {
	Actions.setLoading(true);

	setCurrentStation(station);

	return Api.departures(station).then(setDepartures).catch(function(err) {
		console.error(err);
	});
}

var _refreshDeparturesInterval;
function refreshDepartures(state) {
	clearInterval(_refreshDeparturesInterval);

	if (state) {
		_refreshDeparturesInterval = setInterval(Actions.getDepartures.bind(null, _state.currentStation), 20000);
	}
}

function clearDepartures() {
	setCurrentStation();
	setDepartures();
}
