module.exports = function( gulp, cb ) {
	gulp.print.task( 'CLEANING', 'Compressed distribution file' );
	return gulp.del( gulp.config.clean.zip );
}
