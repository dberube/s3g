module.exports = function( gulp, cb ) {
	var dest = gulp.cfg.build.vendors[ gulp.ENV ];

	gulp.p.util.log('Bower', 'Installing Bower Packages', gulp.p.util.colors.magenta('123'));
	
	return gulp.p.bower( dest );
}
