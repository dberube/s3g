module.exports = function( gulp, cb ) {
	var src  = gulp.config.statics.fonts.paths.src;
	var dest = gulp.config.statics.fonts.paths[ gulp.buildType ];

	gulp.print.task( 'FONTS', 'Copying font files' );
	return gulp
		.src(src)
		.pipe(gulp.p.plumber())
		.pipe(gulp.dest( dest ))
		.pipe(gulp.bs.reload({ stream: true }));
}
