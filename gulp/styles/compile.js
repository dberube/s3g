module.exports = function( gulp, cb ) {
	return gulp
		.src( gulp.cfg.styles.src )
		.pipe(gulp.p.plumber())
		.pipe(gulp.p.scss({
			noCache: true,
			tmpPath: gulp.cfg.basePaths.cache
		}))
		.pipe(gulp.p.rename( gulp.cfg.styles.filename ))
		.pipe(gulp.dest( gulp.cfg.styles.dest ))
		.pipe(gulp.bs.reload({stream: true}));
}
