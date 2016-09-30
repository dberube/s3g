'use strict';

var logSymbols = require('log-symbols');
var chalk      = require('chalk');
var _          = require('lodash');
var builder    = require( __dirname + '/../lib/builder' );

module.exports = function(program) {

	program
		.command( 'task <task-name> [environment]' )
		.description( 'Run a single, specific development task -- experienced users only' )
		.action( handler );

};

function handler( _taskName, _env ) {
	var taskName = _.trim(_.camelCase( _taskName ));
	var env      = _env || 'dev';

	if (!_.isFunction( builder.tasks[ taskName ])) {
		return console.log( 'Sorry, ' + _taskName + ' is not a valid task...' );
	}

	builder.env( env );

	builder.tasks[ taskName ](function() {
		console.log( '...done' );
	});
}
