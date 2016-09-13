/**
 * COMMAND: dev
 * For development
 */
module.exports = function( gulp, cb ) {
	gulp.p.sequence( 'clean', 'static', 'bower', [ 'styles', 'views' ], [ 'server', 'watch' ] )(cb);
}
