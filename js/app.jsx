/** @jsx React.DOM */

var React = require('react');
var Router = require('react-router');
var Routes = Router.Routes;
var Route = Router.Route;
var Link = Router.Link;

var Stations = require('./components/Stations/Stations.jsx');
var Departures = require('./components/Departures/Departures.jsx');
var Journey = require('./components/Journey/Journey.jsx');
var MainApp = require('./components/MainApp.jsx');

React.initializeTouchEvents(true);

var routes = (
  <Routes>
	<Route handler={MainApp}>
		<Route name="stations" path="/" handler={Stations} />
		<Route name="departure" path="departure/:id" handler={Departures} />
		<Route name="journey" path="journey/:stopid" handler={Journey} />
	</Route>
  </Routes>
);

React.renderComponent(routes, document.body);
