module.exports = function( gulp, cb ) {
	var src  = gulp.config.bower.paths.src;
	var dest = gulp.config.bower.paths[ gulp.buildType ];

	gulp.print.task( 'BOWER', 'Copying installed Bower packages' );

	return gulp
		.src( src )
		.pipe(gulp.p.plumber())
		.pipe(gulp.dest( dest ));
}
