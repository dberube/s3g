module.exports = function( gulp, cb ) {
	gulp.print.task( 'CLEANING', 'Files used by the serve command' );
	return gulp.del( gulp.config.clean.serve );
}
