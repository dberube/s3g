'use strict';

var logSymbols = require('log-symbols');
var chalk      = require('chalk');
var jetpack    = require('fs-jetpack');

var config  = require( __dirname + '/../config' );
var Partial = require( __dirname + '/../lib/partial' );

module.exports = function(program) {

	program
		.command( 'create <name>' )
		.description( 'Creates a new Pug & SCSS partial and automatically includes it' )
		.action( handler );

};

function handler( name ) {
	var partial = new Partial( name );

	partial
		.then(function(res) {
			process.exit(console.log( 'res:', res ));
		})
		.catch(function(err) {
			process.exit(console.log( 'err:', err ));
		})
}
