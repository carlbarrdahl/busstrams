var Reflux = require('reflux');

var StationActions = module.exports = Reflux.createActions([
	'setLoading',

	'getNearbyStations',
	'getDepartures',
	'clearDepartures',

	'refreshDepartures'
]);
