var options = {
	enableHighAccuracy: true,
	maximumAge: 30000,
	timeout: 27000
};

var _position = {};

var Geo = module.exports = {
	position: function(newPos) {
		return newPos ? (_position = newPos) : _position;
	},

	getLocation: function() {
		return new Promise(function(resolve, reject) {
				navigator.geolocation.getCurrentPosition(function(position) {
					resolve(this.position(position));
				}.bind(this), reject, options);
			}.bind(this));
	},

	distance: function(start, end) {

		var latDelta = (end.latitude - start.latitude) * Math.PI / 180;
		var lonDelta = (end.longitude - start.longitude) * Math.PI / 180;
		var lat1Rad = start.latitude * Math.PI / 180;
		var lat2Rad = end.latitude * Math.PI / 180;
		var a = Math.sin(latDelta / 2) * Math.sin(latDelta / 2) + Math.sin(lonDelta / 2) * Math.sin(lonDelta / 2) * Math.cos(lat1Rad) * Math.cos(lat2Rad);
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		var distance = 6371000 * c;

		return Math.round(distance);
	}
};
