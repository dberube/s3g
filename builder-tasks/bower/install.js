module.exports = function( gulp, cb ) {
	var src  = gulp.cfg.build.vendors.src;

	gulp.p.util.log('Bower', 'Installing Bower Packages', gulp.p.util.colors.yellow( 'START' ));

	return gulp.p.bower( src );
}
