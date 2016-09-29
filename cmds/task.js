'use strict';

var logSymbols = require('log-symbols');
var chalk      = require('chalk');
var _ 		   = require('lodash');
var gulp       = require( __dirname + '/../lib/gulp' );

module.exports = function(program) {

	program
		.command( 'task [task-name]' )
		.description( 'Run a single, specific development task -- experienced users only' )
		.action( handler );

};

function handler( _taskName ) {
	var taskName = _.trim(_.camelCase( _taskName ));

	if (!_.isFunction( gulp.tasks[ taskName ])) return console.log( 'Sorry, ' + _taskName + ' is not a valid task...' );

	gulp.env('dev');

	gulp.tasks[ taskName ](function() {
		console.log( '...done' );
	});
}
