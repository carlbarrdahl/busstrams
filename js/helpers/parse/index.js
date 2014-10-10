/*

TODO
Clean this up you filthy peon!
 */

var moment = require('moment');
var geo = require('../geo');

var Parser = {
	stations: function(data) {
		return data.LocationList.StopLocation.filter(function(station) {
			if (!station.track) {
				var position = {
					latitude: station.lat,
					longitude: station.lon
				};
				station.distance = geo.distance(position, geo.position().coords);
				return station.distance;
			}
		});
	},

	departures: function(data) {
		// var departures = data.DepartureBoard.Departure.sort(function(a, b) {
		// 	console.log(a.rtTime, b.rtTime)
		// 	return a.sname > b.sname ? 1 : -1;
		// 	// return new Date('1970/01/01 ' + a.rtTime) - new Date('1970/01/01 ' + b.rtTime);
		// });
		// console.log(data, departures)
		// return groupDepartures(departures);

		departures = groupDepartures(data.DepartureBoard.Departure);

		return departures.sort(function(a, b) {
			return new Date('1970/01/01 ' + a.rtTime || '00:00') - new Date('1970/01/01 ' + b.rtTime || '00:00');
		});
	},

	journey: function(data) {
		return data.JourneyDetail.Stop.filter(function(stop) {
			if (stop.rtArrTime) {
				return stop;
			}
		});
	}
};

function groupDepartures(departures) {
	console.log(departures)
	for (var i = 0; i < departures.length; i++) {
		// var departure = departures[i];
		// var nextDeparture = departures[i + 1];

		// console.log(departure, nextDeparture)
		// if (nextDeparture) {
		// 	if (departure.sname === nextDeparture.sname) {
		// 		departure.rtNext = nextDeparture.rtTime;
		// 		// departures.splice(j, 1);
		// 	}
		// }
		for (var j = 0; j < departures.length; j++) {
			console.log('groupDepartures', departures[i], departures[j])
			if (departures[i].sname === departures[j].sname) {
				departures[i].rtNext = departures[j].rtTime;
				departures.splice(j, 1);
			}
		}
	}

	return departures;
}

function compare(x, y) {
	return x > y ? 1 : x < y ? -1 : 0;
}

module.exports = Parser;
