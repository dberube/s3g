/**
 * COMMAND: default
 * For development
 */
module.exports = function( gulp, cb ) {
	gulp.p.sequence( 'dev' )(cb);
}
