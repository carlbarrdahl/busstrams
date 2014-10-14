var Reflux = require('reflux');

var StationActions = module.exports = Reflux.createActions([
	'loading',
	'getNearbyStations',
	'getDepartures'
]);
