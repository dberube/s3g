module.exports = function( gulp, cb ) {
	var src = gulp.config.statics.fonts.paths.watch;
	gulp.watch( src, [ 'static:fonts' ] );
	cb();
}
