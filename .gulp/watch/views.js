module.exports = function( gulp, cb ) {
	gulp.watch( gulp.cfg.views.watch, [ 'views:watch' ] );
	cb();
}
