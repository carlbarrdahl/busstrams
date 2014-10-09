require('es6-promise').polyfill();

var merge = require('react/lib/merge');
var config = require('../../config.js');

var Request = {
	stations: function(data) {
		var coords = {
			originCoordLat: data.coords.latitude,
			originCoordLong: data.coords.longitude
		};
		return req(url('stations', coords));
	},

	departures: function(stationId) {
		return req(url('departures', {
			id: stationId
		}));
	},

	journey: function(url) {
		return req(url);
	}
};

function url(type, data) {
	var defaults = merge(config.api.defaults, config[type].defaults);
	return config.api.baseUrl + config[type].service + '?' + serialize(merge(defaults, data));
}

function serialize(obj) {
	var str = [];
	for (var p in obj)
		if (obj.hasOwnProperty(p)) {
			str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
	}
	return str.join("&");
}

function req(url) {
	return new Promise(function(resolve, reject) {
			var callbackName = 'jsonpCallback' + Math.round(100000 * Math.random());
			var script = createScript(url, callbackName);

			// If we fail to get the script, reject the promise.
			script.onerror = reject;

			document.body.appendChild(script);
			// If the url contains a 'something_callback=?' then
			// replace the '?' with our random generated callbackName.
			if (/Callback=?/.test(url)) {
				url = url.replace('=?', '=' + callbackName);
			}

			window[callbackName] = function(data) {
				// Script inserted, resolve promise.
				resolve(data);

				// Clean up.
				window[callbackName] = null;
				delete window[callbackName];
				document.body.removeChild(script);
			};
		});
}

function createScript(url, callbackName) {
	var script = document.createElement('script');
	script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'jsonpCallback=' + callbackName;

	return script;
}


module.exports = Request;
