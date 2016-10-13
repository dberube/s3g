module.exports = function( gulp, cb ) {
	var src = gulp.config.statics.images.paths.watch;
	gulp.watch( src, [ 'static:images' ] );
	cb();
}
