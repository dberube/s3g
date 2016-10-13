'use strict';

var logSymbols = require('log-symbols');
var chalk      = require('chalk');
var jetpack    = require('fs-jetpack');

var config  = require( __dirname + '/../config' );
var Builder = require( __dirname + '/../lib/builder' );

module.exports = function(program) {

	program
		.command( 'build' )
		.option( '-z, --zip', 'Compress build files into a single zip file' )
		.description( 'Make a build for distribution or deployment' )
		.action( handler );

};

function handler( program ) {
	var build = Builder.build( program.zip );
}
