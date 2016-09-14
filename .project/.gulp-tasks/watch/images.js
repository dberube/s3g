module.exports = function( gulp, cb ) {
	gulp.watch( gulp.cfg.images.watch, [ 'static:images' ] );
	cb();
}
