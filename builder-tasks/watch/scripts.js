module.exports = function( gulp, cb ) {
	var src = gulp.cfg.build.components.scripts.paths.watch;

	// return gulp.p.watch( src, [ 'scripts:watch' ] );

	gulp.watch( src, [ 'static:scripts' ] );
	cb();
}
