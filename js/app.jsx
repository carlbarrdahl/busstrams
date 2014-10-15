/** @jsx React.DOM */

var React = require('react');
React.initializeTouchEvents(true);

var MainApp = require('./components/MainApp.jsx');

React.renderComponent(<MainApp />, document.body);
