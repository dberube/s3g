var jetpack = require('fs-jetpack');

module.exports = function( gulp, cb ) {
	var src  = jetpack.path( gulp.cfg.build.vendors.src, '**/*' );
	var dest = gulp.cfg.build.vendors[ gulp.ENV ];

	process.stdout.write('\r\n');
	
	gulp.p.util.log(
		gulp.p.util.colors.green('BOWER:\t'),
		'Copying installed Bower packages to the ' + gulp.ENV + ' environment'
	);

	return gulp
		.src(src)
		.pipe(gulp.p.plumber())
		.pipe(gulp.dest( dest ));
}
