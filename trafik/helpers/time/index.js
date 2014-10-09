module.exports = {
	difference: function(start, stop) {
		if (!start || !stop) return '';
		var data = {
			start: start,
			stop: stop,
			difference: toMinutes(start) - toMinutes(stop)
		};

		var diff = toMinutes(stop) - toMinutes(start);
		return diff > 0 ? '+' + diff : diff === 0 ? '' : diff;
	}
};


function toMinutes(time) {
	var parts = time.split(':');
	var hours = +parts[0];
	var minutes = +parts[1];

	return 60 * hours + minutes;
}
