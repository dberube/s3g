module.exports = function( gulp, cb ) {
	var print = require( __dirname + '/../../lib/print' );
	print.banner({
		label:        'FINISHED',
		msg:          'Build can be found in: ./dist',
		color:  	  'green',
		style:        'bold',
	});
}
