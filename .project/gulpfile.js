var gulp       = require('gulp');
gulp.p         = require('gulp-load-plugins')();
gulp.bs        = require('browser-sync');
gulp.bs.reload = gulp.bs.reload;
gulp.cfg       = require( __dirname + '/config' ).gulp;
require('gulp-require-tasks')({ path: process.cwd() + '/.gulp-tasks', separator: ':', gulp: gulp });


/*

	AVAILABLE COMMANDS:

		default 	Creates development server with live reloading

		dev 		Creates development server with live reloading
		build 		Creates a production build in ./dist


*/
