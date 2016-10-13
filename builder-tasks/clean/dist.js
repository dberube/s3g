module.exports = function( gulp, cb ) {
	gulp.print.task( 'CLEANING', 'Files used by the dist command' );
	return gulp.del( gulp.config.clean.dist );
}
