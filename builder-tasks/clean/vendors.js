module.exports = function( gulp, cb ) {
	gulp.print.task( 'CLEANING', 'Vendor files' );
	return gulp.del( gulp.config.clean.vendors );
}
