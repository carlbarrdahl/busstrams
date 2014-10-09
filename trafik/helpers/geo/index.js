// https://github.com/nwhite89/GeoDistance

var earthRadius = 6371000;
var options = {
	enableHighAccuracy: true,
	maximumAge: 30000,
	timeout: 27000
};
var Geo = {
	getLocation: function() {
		return new Promise(function(resolve, reject) {
				navigator.geolocation.watchPosition(function(position) {
					resolve({
						originCoordLat: position.coords.latitude,
						originCoordLong: position.coords.longitude
					});
				}, reject, options);
			});
	},

	distance: function(start, end) {
		start = parseCoords(start);
		end = parseCoords(end);

		var latDelta = (end[0] - start[0]) * Math.PI / 180;
		var lonDelta = (end[1] - start[1]) * Math.PI / 180;
		var lat1Rad = start[0] * Math.PI / 180;
		var lat2Rad = end[0] * Math.PI / 180;
		var a = Math.sin(latDelta / 2) * Math.sin(latDelta / 2) + Math.sin(lonDelta / 2) * Math.sin(lonDelta / 2) * Math.cos(lat1Rad) * Math.cos(lat2Rad);
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		var distance = earthRadius * c;

		return Math.round(distance);
	}
};

function parseCoords(point) {
	var coords = [];
	for (var p in point) {
		coords.push(+point[p]);
	}
	return coords;
}

module.exports = Geo;
