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
		var departures = data.DepartureBoard.Departure.sort(function(a, b) {
			if (!a.rtTime || !b.rtTime) {
				console.error('No rtTime in ', a, b);
			}
			return new Date('1970/01/01 ' + a.rtTime) - new Date('1970/01/01 ' + b.rtTime);
		});

		return groupDepartures(departures);
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
	var tmp = {};

	for (var i = 0; i < departures.length; i++) {
		var d = departures[i];

		if (tmp[d.sname + '_' + d.direction]) {
			tmp[d.sname + '_' + d.direction].rtNext = d.rtTime;
		} else {
			tmp[d.sname + '_' + d.direction] = d;
		}
	}

	return Object.keys(tmp).map(function(key) {
		return tmp[key];
	});
}

module.exports = Parser;
