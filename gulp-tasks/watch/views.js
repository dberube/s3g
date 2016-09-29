module.exports = function( gulp, cb ) {
	var src = gulp.cfg.build.components.views.paths.watch;

	// return gulp.p.watch( src, [ 'views:watch' ] );

	gulp.watch( src, [ 'views:watch' ] );
	cb();
}
