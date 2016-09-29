'use strict';

var logSymbols = require('log-symbols');
var chalk      = require('chalk');
var gulp       = require( __dirname + '/../lib/gulp' );

module.exports = function(program) {

	program
		.command( 'dev' )
		.description( 'Create an auto-updated server for development' )
		.action( handler );

};

function handler() {
	gulp.env('dev');
	gulp.development(function() {
	});
}
