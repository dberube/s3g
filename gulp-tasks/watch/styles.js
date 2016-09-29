module.exports = function( gulp, cb ) {
	var src = gulp.cfg.build.components.styles.paths.watch;

	// return gulp.p.watch( src, [ 'styles:watch' ] );

	gulp.watch( src, [ 'styles:watch' ] );
	cb();
}
