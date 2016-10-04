module.exports = function( gulp, cb ) {
	var src  = gulp.cfg.build.vendors.src;

	gulp.p.util.log(
		gulp.p.util.colors.green('BOWER:\t'),
		'Installing Bower packages'
	);

	process.stdout.write('\r\n');

	return gulp.p.bower( src );
}
