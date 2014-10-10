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
		var departures = groupDepartures(data.DepartureBoard.Departure);

		return departures.sort(function(a, b) {
			return new Date('1970/01/01 ' + a.rtTime) - new Date('1970/01/01 ' + b.rtTime);
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
	for (var i = 0; i < departures.length; i++) {
		for (var j = 0; j < departures.length; j++) {
			if (departures[i].sname === departures[j].sname) {
				departures[i].rtNext = departures[j].rtTime;
				departures.splice(j, 1);
			}
		}
	}

	return departures;
}

module.exports = Parser;
