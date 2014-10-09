var q = require('query-string');
var moment = require('moment');
var merge = require('merge');

var BASE_URL = 'http://api.vasttrafik.se/bin/rest.exe/';

var defaults = {
	authKey: '766216d3-f113-40f3-9242-5396fc7e71d9',
	format: 'json'
};

module.exports = {
	build: function(svc, query) {
		var queryString = svc + '?' + q.stringify(merge(query, defaults));
		return BASE_URL + queryString + '&jsonpCallback=?';
	}
};


function test(res) {
	console.log(res)
}
