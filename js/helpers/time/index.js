var moment = require('moment');
var Time = {
	difference: function(start, end) {
		if (!start || !end) {
			return '-';
		}
		var diff = toMinutes(start) - toMinutes(end);
		return diff < 0 ? 0 : diff;
	}
};

module.exports = Time;

function toMinutes(time) {
	var parts = time.split(':');
	var hours = +parts[0];
	var minutes = +parts[1];

	return 60 * hours + minutes;
}
