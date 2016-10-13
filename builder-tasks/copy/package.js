module.exports = function( gulp, cb ) {
	var src  = gulp.config.copy.package.src;
	var dest = gulp.config.copy.package.dest

	gulp.print.task( 'SITE', 'Copying important files to distribution directory' );

	return gulp
		.src( src )
		.pipe(gulp.p.plumber())
		.pipe(gulp.dest( dest ));
}
