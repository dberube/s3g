module.exports = function( gulp, cb ) {
	return gulp
		.src(gulp.cfg.fonts.src)
		.pipe(gulp.p.plumber())
		.pipe(gulp.p.rename( gulp.cfg.fonts.filename ))
		.pipe(gulp.dest( gulp.cfg.fonts.dest ))
		.pipe(gulp.bs.reload({ stream: true }));
}
