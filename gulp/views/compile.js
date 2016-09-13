module.exports = function( gulp, cb ) {
	return gulp
		.src( gulp.cfg.views.src )
		.pipe(gulp.p.plumber())
		.pipe(gulp.p.pug({
			pretty: true
		}))
		.pipe(gulp.p.rename( gulp.cfg.views.filename ))
		.pipe(gulp.dest( gulp.cfg.views.dest ))
		.pipe(gulp.bs.reload({ stream: true }));
}
