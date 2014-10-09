var nearby = require('./nearby');
var departure = require('./departure');

module.exports = Trafik;

function Trafik() {

}

Trafik.prototype = {
	getNearby: function() {
		return nearby.get();
	},

	getDepartures: function(station) {
		return departure.get(station);
	}
};


var trafik = new Trafik();
trafik.getNearby().then(function(res) {
	// console.log(res)

	trafik.getDepartures(nearby.stations[0]).then(function(res) {
		console.log(res.body)
	});
});
/*nearby.get().then(function(res) {
	console.log('stations', nearby.stations);

	departure.get(nearby.stations[0]).then(function(res) {
		console.log(res.body.DepartureBoard);
	});
});*/
