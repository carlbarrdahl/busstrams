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
	stations: [],
	departures: [],
	journeys: {}
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
		this.listenTo(Actions.setJourney, setJourney);

		getNearbyStations();
		setInterval(getNearbyStations, 20000);
	},

	getInitialState: function() {
		return _data;
	}

});

function emit() {
	Store.trigger(_data);
}

function setLoading(loading) {
	_data.loading = loading;
	emit();
}

function setPosition(position) {
	_data.position.init ? (_data.position.current = position) : (_data.position.init = _data.position.current = position);
	return position;
}

function setState(state) {
	_data.state = state;
	emit();
}

function setCurrentStation(station) {
	_data.currentStation = station || {};
}

function setStations(stations) {
	setLoading(false);

	_data.stations = stations || [];
	emit();
}

function setDepartures(departures) {
	console.trace()
	setLoading(false);

	if (departures && departures.error) {
		console.error(departures);
	}
	_data.departures = departures || [];
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
		_refreshDeparturesInterval = setInterval(Actions.getDepartures.bind(null, _data.currentStation), 10000);
	}
}

function clearDepartures() {
	setDepartures();
}


function setJourney(journey) {
	console.log('setJourney', journey);
	_data.journeys[journey.sname + '_' + journey.direction] = journey;
	emit();
}
