module.exports = function( gulp, cb ) {
	var src       = gulp.cfg.build.components.views.paths.src;
	var dest      = gulp.cfg.build.components.views.paths[ gulp.ENV ];
	var filenames = gulp.cfg.build.components.views.filenames;

	gulp.p.util.log(
		gulp.p.util.colors.green('VIEWS:\t'),
		'Compiling Jade/Pug files into HTML'
	);

	return gulp
		.src( src )
		.pipe(gulp.p.plumber())
		.pipe(gulp.p.changed(dest))
		.pipe(gulp.p.pug({
			pretty: true
		}))
		.pipe(gulp.p.rename( filenames ))
		.pipe(gulp.dest( dest ))
		.pipe(gulp.bs.reload({stream: true}));
}
