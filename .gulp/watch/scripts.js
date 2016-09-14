module.exports = function( gulp, cb ) {
	gulp.watch( gulp.cfg.scripts.watch, [ 'static:scripts' ] );
	cb();
}
