'use strict';

var logSymbols = require('log-symbols');
var chalk      = require('chalk');
var config     = require( __dirname + '/../config' );
var Builder    = require( __dirname + '/../lib/builder' );

module.exports = function(program) {

	program
		.command( 'serve' )
		.alias('dev')
		.description( 'Starts a Development Server' )
		.action( handler );

};

function handler() {
	var serve = Builder.serve();
}
