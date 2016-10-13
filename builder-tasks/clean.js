module.exports = function( gulp, cb ) {
	gulp.print.task( 'CLEANING', 'Removing development files and cleaning the workspace up' );
	gulp.p.sequence([ 'clean:serve', 'clean:dist', 'clean:zip', 'clean:temp', 'clean:vendors' ])(cb);
}
