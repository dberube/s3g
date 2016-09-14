module.exports = function( gulp, cb ) {
	return gulp
		.src(gulp.cfg.scripts.src)
		.pipe(gulp.p.plumber())
		.pipe(gulp.p.rename( gulp.cfg.scripts.filename ))
		.pipe(gulp.dest( gulp.cfg.scripts.dest ))
		.pipe(gulp.bs.reload({ stream: true }));
}
