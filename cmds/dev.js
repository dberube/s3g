'use strict';

var logSymbols = require('log-symbols');
var chalk      = require('chalk');
var builder    = require( __dirname + '/../lib/builder' );

module.exports = function(program) {

	program
		.command( 'dev' )
		.option( '-b, --handlebars', 'Compile views to Handlebar templates instead of HTML' )
		.description( 'Create an auto-updated server for development' )
		.action( handler );

};

function handler( program ) {
	builder.env('dev');
	builder.development( program.handlebars, function() {
	});
}
