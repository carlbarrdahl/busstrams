var Reflux = require('reflux');

var Actions = require('../actions/Actions');

var LoadingStore = module.exports = Reflux.createStore({

    // Initial setup
    init: function() {

        // Register statusUpdate action
        this.listenTo(Actions.loading, this.output);
    },

    // Callback
    output: function(loading) {
        console.log('Loading...', loading);

        // Pass on to listeners
        this.trigger({
            loading: loading
        });
    }

});
