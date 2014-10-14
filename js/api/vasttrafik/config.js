module.exports = {
	api: {
		baseUrl: '//api.vasttrafik.se/bin/rest.exe/',
		defaults: {
			authKey: '766216d3-f113-40f3-9242-5396fc7e71d9',
			format: 'json'
		}
	},

	stations: {
		service: 'location.nearbystops',
		defaults: {
			maxNo: 50
		}
	},

	departures: {
		service: 'departureBoard',
		defaults: {
			maxDeparturesPerLine: 2,
			timeSpan: 60,
			useLDTrain: 0,
			useVas: 0,
			useRegTrain: 0,
			exludeDR: 0
		}
	}
};
