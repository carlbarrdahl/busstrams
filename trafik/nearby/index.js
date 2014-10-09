var request = require('superagent-promise');
var url = require('../helpers/url');
var geo = require('../helpers/geo');
var merge = require('merge');

/*

http://<baseurl>/location.nearbystops?originCoordLong=11.981211&originCoordLat=57.
709792&maxNo=5
4.1.4L
 */
var service = 'location.nearbystops';
var defaults = {
	maxNo: 50
};

var currentPosition;

module.exports = {
	get: function() {
		currentPosition = geo.getLocation();

		return request.get(url.build(service, merge(defaults, currentPosition))).end().then(function(res) {
			return (this.stations = group(res.body.LocationList.StopLocation));
		}.bind(this));
	}
};


function group(stations) {
	stations = stations.filter(function(station) {
		if (!station.track) {
			var position = {
				lat: station.lat,
				lon: station.lon
			};
			return (station.distance = geo.distance(position, currentPosition));
		}
	});

	return stations;
}
