module.exports = function( gulp, cb ) {
	var src = gulp.config.styles.paths.watch;
	gulp.watch( src, [ 'styles:watch' ] );
	cb();
}

// return gulp.p.watch( src, [ 'styles:watch' ] );
