'use strict';

var logSymbols = require('log-symbols');
var chalk      = require('chalk');
var Site       = require( __dirname + '/../lib/site' );

module.exports = function(program) {

	program
		.command( 'build' )
		.description( 'Build and compile the source' )
		.action( handler );

};

function handler() {
	var site = new Site();

	site.make()

		.then(function( message ) {
			console.log( ' ' );
			console.log(chalk.green.bold( logSymbols.success, message ));
			console.log( ' ' );

			process.exit(0);
		})

		.catch(function( error ) {
			console.log( ' ' );
			console.log(chalk.red.bold( logSymbols.error, error.message ));
			console.log( ' ' );

			process.exit(1);
		})
}
