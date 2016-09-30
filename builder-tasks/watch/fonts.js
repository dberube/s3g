module.exports = function( gulp, cb ) {
	var src = gulp.cfg.build.components.fonts.paths.watch;

	// return gulp.p.watch( src, [ 'fonts:watch' ] );

	gulp.watch( src, [ 'static:fonts' ] );
	cb();
}
