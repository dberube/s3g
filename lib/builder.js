var jetpack       = require('fs-jetpack');
var gulp          = require('gulp');
var _             = require('lodash');
var helpers       = require( __dirname + '/helpers' );
var print         = require( __dirname + '/print' );
var config        = require( __dirname + '/../config' );

gulp.bs           = require('browser-sync').create();
gulp.p            = require('gulp-load-plugins')();
gulp.colors       = require('chalk');
gulp.del   		  = require('del');
gulp.printNew     = print;
gulp.buildType    = 'serve';
gulp.config       = config.tasks;
gulp._config      = config;
gulp.print        = helpers.builder.print;
gulp.temp         = {};

require('gulp-require-tasks')({ path: __dirname + '/../builder-tasks', separator: ':', gulp: gulp });

var Builder = {

	serve: function(cb) {
		print.logo();
		print.banner({
			label:        'STARTING',
			msg:          'Development Server',
			color:  	  'green',
			style:        'bold',
		});

		gulp.buildType = 'serve';
		gulp.start( 'serve' );
	},

	build: function( zip ) {

		print.logo();
		print.banner({
			label:        'STARTING',
			msg:          'Making a Fresh Build',
			color:  	  'green',
			style:        'bold',
		});


		gulp.runZip    = zip;
		gulp.buildType = 'dist';
		gulp.start( 'dist' );
	},

	deploy: function(host, cb) {
		host = _.toLower( host );
		gulp.start( 'deploy:' + host );
	},

	clean: function(cb) {
		gulp.start( 'clean' );
	},

	custom: function( task, cb ) {
		print.logo();

		print.banner({
			label:        'Starting Task:',
			msg:          _.toUpper(task),
			color:  	  'cyan',
			style:        'bold',
		});

		gulp.start( task );

		print.banner({
			label:        'Completed Task:',
			msg:          _.toUpper(task),
			color:  	  'green',
			style:        'bold',
		});
	},


	/**
	 *    Private Methods
	 *    For future development
	 */


	_tasks:    helpers.builder.tasks( gulp ),
	_commands: {
		server: function(cb) {
			gulp.p.sequence( 'clean', 'static', 'bower', [ 'styles', 'views' ], [ 'server', 'watch' ] )(cb);
		},
		dist: function(cb) {
			gulp.p.sequence( 'clean', 'static', 'bower', [ 'styles', 'views' ] )(cb);
		}
	}
};

module.exports = Builder;
