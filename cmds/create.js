'use strict';

var logSymbols  = require('log-symbols');
var chalk       = require('chalk');
var _           = require('lodash');
var Create      = require( __dirname + '/../lib/create' );

var excludeList = [ 'pug', 'jade', 'scss', 'sass' ];

module.exports  = function(program) {

	program
		.command( 'create <name>' )
		.option('-e --exclude [exclude]', 'Exclude either Pug or SCSS file from the partial creation', false )
		.description( 'Creates a new site in the current directory' )
		.action( handler );

};

function handler( name, program ) {
	var exclude = (program.exclude === false) ? false : _.toLower(program.exclude);

	if (exclude !== false && !_.includes(excludeList, exclude)) {
		throw new Error( 'Sorry, ' + exclude + ' is not a valud exclusion. Try pug or scss' );
	}

	var partials = new Create.partials( name, exclude );


	partials.make()

		.then(function( message ) {
			console.log( ' ' );
			console.log( logSymbols.success, message );
			console.log( ' ' );

			process.exit(0);
		})

		.catch(function( error ) {
			console.log( ' ' );
			console.log(chalk.red.bold( logSymbols.error, error.message ));
			console.log( ' ' );

			process.exit(1);
		});
}
