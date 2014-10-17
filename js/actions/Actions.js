var Reflux = require('reflux');

var StationActions = module.exports = Reflux.createActions([
	'setLoading',
	'setState',
	'setCurrentStation',
	'getCurrentStation',

	'getNearbyStations',
	'getDepartures',
	'clearDepartures',
	'refreshDepartures',

	'setJourney'
]);
