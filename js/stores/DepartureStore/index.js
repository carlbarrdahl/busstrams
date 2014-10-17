var Actions = require('../../actions/Actions');
var Api = require('../../api/vasttrafik');

var _refreshDeparturesInterval;
var DepartureStore = module.exports = {

	get: function(station) {
		Actions.setLoading(true);
		Actions.setCurrentStation(station);

		return Api.departures(station).catch(function(err) {
			console.error(err);
		});
	},

	clear: function() {
		Actions.setCurrentStation();
		setDepartures();
	},

	refresh: function(state) {
		clearInterval(_refreshDeparturesInterval);

		if (state) {
			_refreshDeparturesInterval = setInterval(Actions.getDepartures.bind(null, Actions.getCurrentStation()), 20000);
		}
	}
};
