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
		return data.DepartureBoard.Departure.sort(function(a, b) {
			return new Date('1970/01/01 ' + a.rtTime) - new Date('1970/01/01 ' + b.rtTime);
		});
	},

	journey: function(data) {
		return data.JourneyDetail.Stop.filter(function(stop) {
			if (stop.rtArrTime) {
				return stop;
			}
		});



		// var serverTime = moment(data.serverTime);
		// var journey = data.JourneyDetail.Stop.filter(function(stop) {
		// 	console.log(serverTime.isBefore(moment(stop.rtArrTime)))
		// 	if (stop.rtArrTime) {
		// 		return stop;
		// 	}
		// });

		// return {
		// 	journey: journey
		// };
	}
};

module.exports = Parser;
