var Reflux = require('reflux');
var Actions = require('../actions/Actions');
var Geo = require('../helpers/geo');
var Api = require('../api/vasttrafik');

var _data = {
	state: 'stations',
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
		console.log('Init store', _data);

		this.listenTo(Actions.setLoading, setLoading);
		this.listenTo(Actions.setState, setState);
		this.listenTo(Actions.getNearbyStations, getNearbyStations);
		this.listenTo(Actions.getDepartures, getDepartures);
		this.listenTo(Actions.clearDepartures, clearDepartures);
		this.listenTo(Actions.refreshDepartures, refreshDepartures);

		getNearbyStations();
	},

	getInitialState: function() {
		return _data;
	}

});

function emit() {
	Actions.setLoading(false);
	Store.trigger(_data);
}

function setLoading(loading) {
	_data.loading = loading;
	Store.trigger(_data);
}

function setPosition(position) {
	_data.position.init ? (_data.position.current = position) : (_data.position.init = _data.position.current = position);
	return position;
}

function setState(state) {
	_data.state = state;
	Store.trigger(_data);
}

function setCurrentStation(station) {
	_data.currentStation = station || {};
}

function setStations(stations) {
	_data.stations.list = stations || [];
	emit();
}

function setDepartures(departures) {
	_data.departures.list = departures || [];
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
		_refreshDeparturesInterval = setInterval(Actions.getDepartures.bind(null, _data.currentStation), 20000);
	}
}

function clearDepartures() {
	setCurrentStation();
	setDepartures();
}
