module.exports = function( gulp, cb ) {
	var src = gulp.config.statics.scripts.paths.watch;
	gulp.watch( src, [ 'static:scripts' ] );
	cb();
}
