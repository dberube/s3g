module.exports = function( gulp, cb ) {
	gulp.p.sequence( 'styles:compile' )(cb);
}
