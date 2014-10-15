var Geo = require('../../helpers/geo');
var Time = require('../../helpers/time');

var Parser = module.exports = {

	coords: function(position) {
		return {
			originCoordLat: position.coords.latitude,
			originCoordLong: position.coords.longitude
		};
	},
	stations: function(data) {
		// FIXME: find a better way to handle servertime
		_serverTime = data.LocationList.servertime;

		return parseStations(data.LocationList.StopLocation);
	},

	departures: function(data) {
		// FIXME: find a better way to handle servertime
		_serverTime = data.DepartureBoard.servertime;

		return parseDepartures(sortDepartures(data.DepartureBoard.Departure));
	}

};


/**
 * Parse stations and return the expected data structure
 * @param  {Array} stations Array of stations
 * @return {Array} stations Parsed stations
 */
function parseStations(stations) {
	return stations.filter(function(station) {
		if (!station.track) {
			var position = {
				latitude: station.lat,
				longitude: station.lon
			};
			station.name = station.name.split(',')[0];
			station.distance = Geo.distance(position, Geo.position().coords);
			return station.distance;
		}
	});
}


/**
 * Sort departures by realtime arrival
 * @param  {Array} departures Array of departures
 * @return {Array} departures Sorted departures
 */
function sortDepartures(departures) {
	return departures.sort(function(a, b) {
		return new Date('1970/01/01 ' + (a.rtTime || a.time)) - new Date('1970/01/01 ' + (b.rtTime || b.time));
	});
}

/**
 * Parse departures and return the expected data structure
 * @param  {Array} departures Array of departures
 * @return {Array} departures Parsed departures
 */
function parseDepartures(departures) {
	var tmp = {};

	departures.forEach(function(d) {
		var direction = d.direction.split('via ');
		var ns = d.sname + '_' + direction[0];

		if (!tmp[ns]) {
			tmp[ns] = {
				sname: d.sname,
				direction: direction[0],
				via: direction[1],
				type: d.type,
				track: d.track,
				timestamps: {
					next: Time.difference(d.rtTime || d.time, _serverTime),
					after: null
				},
				style: {
					backgroundColor: d.fgColor,
					color: d.bgColor
				}
			};
		} else {
			tmp[ns].timestamps.after = Time.difference(d.rtTime, _serverTime);
		}


	});

	return Object.keys(tmp).map(function(key) {
		return tmp[key];
	});
}
