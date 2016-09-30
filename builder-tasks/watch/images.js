module.exports = function( gulp, cb ) {
	var src = gulp.cfg.build.components.images.paths.watch;

	// return gulp.p.watch( src, [ 'images:watch' ] );

	gulp.watch( src, [ 'static:images' ] );
	cb();
}
