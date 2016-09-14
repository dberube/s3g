/**
 * COMMAND: build
 * For making a production build found in dist/
 */
module.exports = function( gulp, cb ) {
	gulp.p.sequence( 'clean', [ 'bower', 'static' ], [ 'styles', 'views' ], 'clean:cache' )(cb);
}
