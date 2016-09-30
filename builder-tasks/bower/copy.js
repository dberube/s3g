var jetpack = require('fs-jetpack');

module.exports = function( gulp, cb ) {
	var src  = jetpack.path( gulp.cfg.build.vendors.src, '**/*' );
	var dest = gulp.cfg.build.vendors[ gulp.ENV ];

	gulp.p.util.log('Bower', 'Copying Installed Bower Packages To ' + gulp.ENV + ' environment', gulp.p.util.colors.yellow( 'START' ));

	return gulp
		.src(src)
		.pipe(gulp.p.plumber())
		.pipe(gulp.dest( dest ));
}
