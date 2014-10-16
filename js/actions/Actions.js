var Reflux = require('reflux');

var StationActions = module.exports = Reflux.createActions([
	'setLoading',
	'setState',

	'getNearbyStations',
	'getDepartures',
	'clearDepartures',

	'refreshDepartures'
]);
