var Reflux = require('reflux');

var Actions = require('../actions/Actions');
var Api = require('../api/vasttrafik');

var _departures = {};

var DepartureStore = module.exports = Reflux.createStore({
	init: function() {
		this.listenTo(Actions.getDepartures, getDepartures);
	},

	getDepartures: getDepartures
});

function getDepartures(station) {
	Actions.loading(true);
	return Api.departures(station)
		.then(emit)
		.catch(function(err) {
			console.error(err);
		});
}


function emit(departures) {
	Actions.loading(false);
	_departures.departures = departures;
	DepartureStore.trigger(_departures);
}

DepartureStore.listen(function(departures) {
	console.log('Storing departures...', departures);
});
