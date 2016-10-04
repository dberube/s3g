module.exports = function( gulp, cb ) {

	var src       = gulp.cfg.build.components.scripts.paths.src;
	var dest      = gulp.cfg.build.components.scripts.paths[ gulp.ENV ];
	var filenames = gulp.cfg.build.components.scripts.filenames;

	gulp.p.util.log(
		gulp.p.util.colors.green('SCRIPTS:\t'),
		'Copying script files'
	);

	return gulp
		.src(src)
		.pipe(gulp.p.plumber())
		.pipe(gulp.p.rename( filenames ))
		.pipe(gulp.dest( dest ))
		.pipe(gulp.bs.reload({ stream: true }));
}
