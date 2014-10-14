var merge = require('react/lib/merge');
var config = require('./config');

var Parser = require('./parser');
var Request = require('../../helpers/request');

var Vasttrafik = module.exports = {

	stations: function(position) {
		return Request.get(buildUrl('stations', Parser.coords(position))).then(Parser.stations);
	},

	departures: function(station) {
		return Request.get(buildUrl('departures', station)).then(Parser.departures);
	}

};

function buildUrl(type, data) {
	var defaults = merge(config.api.defaults, config[type].defaults);
	return config.api.baseUrl + config[type].service + '?' + Request.serialize(merge(defaults, data));
}
