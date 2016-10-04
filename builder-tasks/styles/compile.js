module.exports = function( gulp, cb ) {
	var src       = gulp.cfg.build.components.styles.paths.src;
	var dest      = gulp.cfg.build.components.styles.paths[ gulp.ENV ];
	var filenames = gulp.cfg.build.components.styles.filenames;

	gulp.p.util.log(
		gulp.p.util.colors.green('STYLES:\t'),
		'Compiling SASS/SCSS files into CSS'
	);

	return gulp
		.src( src )
		.pipe(gulp.p.plumber())
		.pipe(gulp.p.changed(dest))
		.pipe(gulp.p.sass())
		.pipe(gulp.p.rename( filenames ))
		.pipe(gulp.dest( dest ))
		.pipe(gulp.bs.reload({stream: true}));
}
