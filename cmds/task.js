'use strict';

var logSymbols = require('log-symbols');
var chalk      = require('chalk');
var jetpack    = require('fs-jetpack');

var config     = require( __dirname + '/../config' );
var Builder    = require( __dirname + '/../lib/builder' );

module.exports = function(program) {

	program
		.command( 'task <task>' )
		.description( 'Run a specific task, such as clean' )
		.action( handler );

};

function handler( task ) {
	var build = Builder.custom( task );
}

function outputSuccess() {
	console.log( ' ' );
	console.log( ' ' );
	console.log( '\t\t' + logSymbols.success + ' ', chalk.green('NEW SITE SUCCESSFULLY INITIALIZED') );
	console.log( chalk.dim('\t――――――――――――――――――――――――――――――――――――――――――――――――――――――――') );
	console.log( ' ' );
	console.log( chalk.gray.bold('\t   ‧ ') + chalk.cyan.bold('Start a Development Server') + chalk.gray.bold('  ⤏  ') + chalk.bold( config.s3g.command + ' server' ) );
	console.log( chalk.gray.bold('\t   ‧ ') + chalk.cyan.bold('Make a New Build') + chalk.gray.bold('  ⤏  ') + chalk.bold( config.s3g.command + ' build' ) );
	console.log( chalk.gray.bold('\t   ‧ ') + chalk.cyan.bold('Create a Partial') + chalk.gray.bold('  ⤏  ') + chalk.bold( config.s3g.command + ' create <partial-name>' ) );
	console.log( ' ' );
	console.log( chalk.dim('\t――――――――――――――――――――――――――――――――――――――――――――――――――――――――') );
	console.log( ' ' );
	console.log( ' ' );
}

function outputError( error ) {
	console.log( ' ' );
	console.log(chalk.red.bold( logSymbols.error, error.message ));
	console.log( ' ' );
}
