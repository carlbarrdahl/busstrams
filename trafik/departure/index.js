var request = require('superagent-promise');
var moment = require('moment');
var url = require('../helpers/url');
var merge = require('merge');

var now = moment();
var service = 'departureBoard';
var defaults = {
	maxDeparturesPerLine: 2,
	timeSpan: 60
};

module.exports = {
	get: function(station) {
		var now = moment();
		defaults.date = now.format('YYYY-MM-DD');
		defaults.time = now.format('HH:mm');
		return request.get(url.build(service, merge(defaults, station))).end();
	}
};
