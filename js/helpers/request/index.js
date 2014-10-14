require('es6-promise').polyfill();

var Request = module.exports = {
	get: function(url) {
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
	},

	serialize: function(obj) {
		var str = [];
		for (var p in obj)
			if (obj.hasOwnProperty(p)) {
				str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
		}
		return str.join("&");
	}
};

function createScript(url, callbackName) {
	var script = document.createElement('script');
	script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'jsonpCallback=' + callbackName;

	return script;
}
