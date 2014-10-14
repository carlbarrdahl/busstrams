var _namespace = 'avgang_';

var Storage = module.exports = {
	set: function(key, data) {
		localStorage.setItem(_namespace + key, JSON.stringify(data));
	},

	get: function(key) {
		var data = localStorage.getItem(_namespace + key);
		return JSON.parse(data) || [];
	}
};
