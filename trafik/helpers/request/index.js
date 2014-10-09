var merge = require('react/lib/merge');
var ApiConstants = require('../../../constants/ApiConstants');
var q = require('query-string');

module.exports = Request;

if (!window.Promise) {
    throw 'Promise not available. Use a polyfill! http://promisesaplus.com/implementations';
}

function Request(url, data) {

    if (data) {
        data = merge(ApiConstants.defaults, data);
        url = url + '?' + q.stringify(data);
    }


    return new Promise(function(resolve, reject) {
            var callbackName = 'jsonpCallback' + Math.round(100000 * Math.random()),
                script = createScript(url, callbackName);

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
