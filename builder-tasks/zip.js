module.exports = function( gulp, cb ) {
	var src      = gulp.config.zip.paths.src;
	var dest     = gulp.config.zip.paths.dest;
	var filename = gulp.config.zip.filename;

	gulp.print.task( 'PACKAGING', 'Compressing files for distribution' );

	return gulp
		.src( src )
		.pipe(gulp.p.plumber())
		.pipe(gulp.p.zip( filename ))
		.pipe(gulp.dest( dest ));
}
