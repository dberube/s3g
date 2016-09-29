var gulp = require('gulp');
var _    = require('lodash');

gulp.bs  = require('browser-sync').create();
gulp.p   = require('gulp-load-plugins')();
gulp.ENV = 'development';
gulp.cfg = require( __dirname + '/../config' );

require('gulp-require-tasks')({ path: __dirname + '/../gulp-tasks', separator: ':', gulp: gulp });

var Gulp = {
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

	development: function(cb) {
		var _this = this;
		var task  = _this.tasks;

		// task.clean( task.styles( task.views( task.bower( task.static( task.watch( cb ) ) ) )) );

		try {
			gulp.start( 'development' );
		} catch(err) {
			console.log( 'sfsdfdsf' );
			process.exit(console.log( 'Err:', err.stack ));
		}
	},

	tasks: {
		styles: function(cb) {
			console.log( 'Task: styles' );
			gulp.p.sequence( 'styles' )(cb);
		},

		views: function(cb) {
			console.log( 'Task: views' );
			gulp.p.sequence( 'views' )(cb);
		},

		clean: function(cb) {
			console.log( 'Task: clean' );
			gulp.p.sequence( 'clean' )(cb);
		},

		static: function(cb) {
			console.log( 'Task: static' );
			gulp.p.sequence( 'static' )(cb);
		},

		watch: function(cb) {
			console.log( 'Task: watch' );
			gulp.p.sequence( 'watch' )(cb);
		},

		bower: function(cb) {
			console.log( 'Task: bower' );
			gulp.p.sequence( 'bower' )(cb);
		},

		images: function(cb) {
			console.log( 'Task: images' );
			gulp.p.sequence( 'static:images' )(cb);
		},

		scripts: function(cb) {
			console.log( 'Task: scripts' );
			gulp.p.sequence( 'static:scripts' )(cb);
		},

		fonts: function(cb) {
			console.log( 'Task: fonts' );
			gulp.p.sequence( 'static:fonts' )(cb);
		},

		server: function(cb) {
			console.log( 'Task: server' );
			gulp.p.sequence( 'server' )(cb);
		}
	}
}

module.exports = Gulp;
