module.exports = function( gulp, cb ) {
	gulp.watch( gulp.cfg.fonts.watch, [ 'static:fonts' ] );
	cb();
}
