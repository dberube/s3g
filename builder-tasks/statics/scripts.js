module.exports = function( gulp, cb ) {
	var src  = gulp.config.statics.scripts.paths.src;
	var dest = gulp.config.statics.scripts.paths[ gulp.buildType ];

	gulp.print.task( 'SCRIPTS', 'Copying script files' );
	return gulp
		.src(src)
		.pipe(gulp.p.plumber())
		.pipe(gulp.dest( dest ))
		.pipe(gulp.bs.reload({ stream: true }));
}
