module.exports = function( gulp, cb ) {
	gulp.print.task( 'CLEANING', 'Temporary files' );
	return gulp.del( gulp.config.clean.temp );
}
