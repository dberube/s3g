module.exports = function( gulp, cb ) {
	var src    = gulp.config.styles.paths.src;
	var ignore = gulp.config.styles.paths.ignore;
	var dest   = gulp.config.styles.paths[ gulp.buildType ];
	var file   = gulp.config.styles.file;

	gulp.print.task( 'STYLES', 'Compiling SASS/SCSS files into CSS' );
	return gulp
		.src( src )
		.pipe(gulp.p.plumber())
		.pipe(gulp.p.ignore( ignore ))
		.pipe(gulp.p.changed(dest))
		.pipe(gulp.p.sass())
		.pipe(gulp.p.rename({ extname: file.parts.ext }))
		.pipe(gulp.dest( dest ))
		.pipe(gulp.bs.reload({stream: true}));
}
