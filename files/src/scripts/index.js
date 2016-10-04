var SampleModule = require('./sample-module');

$(document).ready(function() {
	var sampleModule = new SampleModule( jQuery );
	sampleModule.ready();
});
