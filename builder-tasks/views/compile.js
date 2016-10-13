module.exports = function( gulp, cb ) {
	var src    = gulp.config.views.paths.src;
	var ignore = gulp.config.views.paths.ignore;
	var dest   = gulp.config.views.paths[ gulp.buildType ];
	var file   = gulp.config.views.file;

	gulp.print.task( 'VIEWS', 'Compiling Jade/Pug files' );
	return gulp
		.src( src )
		.pipe(gulp.p.plumber())
		.pipe(gulp.p.ignore( ignore ))
		.pipe(gulp.p.changed(dest))
		.pipe(gulp.p.pug({
			pretty: true
		}))
		.pipe(gulp.p.rename({ extname: file.parts.ext }))
		.pipe(gulp.dest( dest ))
		.pipe(gulp.bs.reload({stream: true}));
}
