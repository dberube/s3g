module.exports = function( gulp, cb ) {
	gulp.p.sequence( 'views:compile' )(cb);
}
