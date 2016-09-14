module.exports = function( gulp, cb ) {
	return gulp
		.src(gulp.cfg.images.src)
		.pipe(gulp.p.plumber())
		.pipe(gulp.p.rename( gulp.cfg.images.filename ))
		.pipe(gulp.dest( gulp.cfg.images.dest ))
		.pipe(gulp.bs.reload({ stream: true }));
}
