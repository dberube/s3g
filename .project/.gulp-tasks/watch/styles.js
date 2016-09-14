module.exports = function( gulp, cb ) {
	gulp.watch( gulp.cfg.styles.watch, [ 'styles:watch' ] );
	cb();
}
