module.exports = function( gulp, cb ) {
	var src       = gulp.cfg.build.components.images.paths.src;
	var dest      = gulp.cfg.build.components.images.paths[ gulp.ENV ];
	var filenames = gulp.cfg.build.components.images.filenames;

	gulp.p.util.log('Images', 'Copying...', gulp.p.util.colors.magenta('123'));

	return gulp
		.src(src)
		.pipe(gulp.p.plumber())
		.pipe(gulp.p.rename( filenames ))
		.pipe(gulp.dest( dest ))
		.pipe(gulp.bs.reload({ stream: true }));
}
