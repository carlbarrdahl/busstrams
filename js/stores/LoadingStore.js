var Reflux = require('reflux');

var Actions = require('../actions/Actions');

var LoadingStore = module.exports = Reflux.createStore({

	init: function() {
		this.listenTo(Actions.loading, this.output);
	},

	output: function(loading) {
		this.trigger({
			loading: loading
		});
	}

});
