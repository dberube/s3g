module.exports = function( gulp, cb ) {
	var src = gulp.config.views.paths.watch;
	gulp.watch( src, [ 'views:watch' ] );
	cb();
}

// return gulp.p.watch( src, [ 'views:watch' ] );
