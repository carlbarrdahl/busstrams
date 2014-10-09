var AppDispatcher = require('../dispatcher/AppDispatcher');
var StationConstants = require('../constants/StationConstants');

var StationActions = {

	get: function(query) {
		AppDispatcher.handleViewAction({
			actionType: StationConstants.GET,
			query: query
		});
	}
};

module.exports = StationActions;
