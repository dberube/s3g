module.exports = function( gulp, cb ) {
	gulp.print.task( 'BOWER', 'Installing bower packages' );

	var opts = {
		directory: gulp.config.bower.paths.temp,
		verbosity: 0
	};

	return gulp.p.bower( opts );
}
