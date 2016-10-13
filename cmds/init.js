'use strict';

var logSymbols = require('log-symbols');
var chalk      = require('chalk');
var print      = require( __dirname + '/../lib/print' );
var config     = require( __dirname + '/../config' );
var Init       = require( __dirname + '/../lib/init' );

module.exports = function(program) {

	program
		.command( 'init' )
		.alias('new')
		.description( 'Initiates a new static site project in the current directory' )
		.action( handler );

};

function handler() {
	var init = new Init();

	init.make().then(

		function( site ) {
			outputSuccess();
			process.exit(0);
		},

		function( error ) {
			outputError( error );
			process.exit(1);
		}
	);
}

function outputSuccess() {
	print.logo();

	print.banner({
		label:        '\t\t    ' + logSymbols.success + '  Completed New Site Initialization',
		color:  	  'green'
	});

	print.banner({
		label:        '\t\t        Run s3g --help to get started!',
		color:  	  'cyan'
	});
}

function outputError( error ) {
	print.logo();

	print.banner({
		label: '   ' + logSymbols.error + '  ' + error.message,
		color: 'red',
		style: 'bold'
	});
}
