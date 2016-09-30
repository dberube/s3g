var gulp = require('gulp');
var _    = require('lodash');

gulp.bs  = require('browser-sync').create();
gulp.p   = require('gulp-load-plugins')();

gulp.ENV = 'development';
gulp.cfg = require( __dirname + '/../config' );

require('gulp-require-tasks')({ path: __dirname + '/../builder-tasks', separator: ':', gulp: gulp });

var Builder = {
	env: function(value) {
		if (_.isUndefined(value)) return gulp.ENV;

		value = _.toLower(value);
		if (value == 'dev') value = 'development';

		gulp.ENV = value;
		return gulp.ENV;

	},

	_development: function(cb) {
		gulp.p.sequence( 'clean', 'static', 'bower', [ 'styles', 'views' ], [ 'server', 'watch' ] )(cb);
	},

	development: function( handlebars, cb) {
		var _this  = this;
		handlebars = handlebars || false;

		if (handlebars)	gulp.cfg.build.components.views.filenames.extname = '.hbs';

		gulp.start( 'development' );
	},

	build: function( handlebars, cb) {
		var _this  = this;
		handlebars = handlebars || false;

		if (handlebars)	gulp.cfg.build.components.views.filenames.extname = '.hbs';

		gulp.start( 'build' );
	},

	tasks: require( __dirname + '/builder/tasks' )( gulp )
}

module.exports = Builder;
