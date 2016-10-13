module.exports = function( gulp, cb ) {
	var src  = gulp.config.statics.images.paths.src;
	var dest = gulp.config.statics.images.paths[ gulp.buildType ];

	gulp.print.task( 'IMAGES', 'Copying image files' );
	return gulp
		.src(src)
		.pipe(gulp.p.plumber())
		.pipe(gulp.dest( dest ))
		.pipe(gulp.bs.reload({ stream: true }));
}
