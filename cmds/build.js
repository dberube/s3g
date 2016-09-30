'use strict';

var logSymbols = require('log-symbols');
var chalk      = require('chalk');
var builder    = require( __dirname + '/../lib/builder' );

module.exports = function(program) {

	program
		.command( 'build' )
		.option( '-b, --handlebars', 'Compile views to Handlebar templates instead of HTML' )
		.description( 'Compile and build the source for deployment' )
		.action( handler );

};

function handler( program ) {

	builder.env('build');
	builder.build( program.handlebars, function() {
		process.stdout.write('\nBuild complete...\r\n');
	});
	
}
